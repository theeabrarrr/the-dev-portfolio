import os
import json
import shutil
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import binary_opening, binary_dilation, label
from rembg import remove, new_session

PROJECT_ROOT = Path(__file__).resolve().parent.parent
FFMPEG = shutil.which("ffmpeg") or str(
    Path.home()
    / "AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg.Shared_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build-shared/bin/ffmpeg.exe"
)

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def extract_frames(video_path, out_dir):
    print("1. Extracting frames using ffmpeg...")
    ensure_dir(out_dir)
    # Extract every source frame first; processing resizes to the virtual canvas.
    cmd = [
        FFMPEG, "-y", "-i", video_path,
        "-start_number", "0",
        os.path.join(out_dir, "f%03d.png")
    ]
    subprocess.run(cmd, check=True)
    frames = sorted([f for f in os.listdir(out_dir) if f.endswith(".png")])
    print(f"   Extracted {len(frames)} frames.")
    return frames

def compute_masks_and_alpha(img_pil, session):
    # Convert to float numpy array
    rgb = np.array(img_pil.convert("RGB"), dtype=np.float32)
    h, w, _ = rgb.shape

    # Sample corners for background color (~247)
    corners = np.concatenate([
        rgb[:10, :10].reshape(-1, 3),
        rgb[:10, -10:].reshape(-1, 3),
        rgb[-10:, :10].reshape(-1, 3),
        rgb[-10:, -10:].reshape(-1, 3)
    ], axis=0)
    bg_color = np.median(corners, axis=0)

    # 1. Person Mask via rembg (u2net_human_seg)
    person_mask_pil = remove(img_pil, session=session, only_mask=True)
    person_mask = np.array(person_mask_pil, dtype=np.float32) / 255.0

    # 2. Props Mask (chair, desk, laptop) via color distance from background
    max_dist = np.max(np.abs(rgb - bg_color), axis=2)
    props_raw = np.clip((max_dist - 14.0) / (40.0 - 14.0), 0.0, 1.0)
    props_bin = props_raw > 0.15

    # Binary opening(3)
    props_bin = binary_opening(props_bin, structure=np.ones((3, 3)))

    # Retain connected blobs larger than 4000 px
    labeled, num_features = label(props_bin)
    if num_features > 0:
        sizes = np.bincount(labeled.ravel())
        mask_sizes = sizes > 4000
        mask_sizes[0] = 0
        props_clean = mask_sizes[labeled]
    else:
        props_clean = props_bin

    # Dilate by 4
    props_dilated = binary_dilation(props_clean, structure=np.ones((4, 4)))
    props_mask = props_raw * props_dilated.astype(np.float32)

    # Combine masks: alpha = max(personMask, propsMask)
    alpha = np.maximum(person_mask, props_mask)

    # Gaussian blur 0.8
    alpha_pil = Image.fromarray((np.clip(alpha, 0, 1) * 255).astype(np.uint8))
    alpha_pil = alpha_pil.filter(ImageFilter.GaussianBlur(radius=0.8))

    # Erode alpha: 0.35 * alpha + 0.65 * MinFilter(3)(alpha)
    min_alpha_pil = alpha_pil.filter(ImageFilter.MinFilter(size=3))
    a_blur = np.array(alpha_pil, dtype=np.float32) / 255.0
    a_min = np.array(min_alpha_pil, dtype=np.float32) / 255.0
    alpha = 0.35 * a_blur + 0.65 * a_min

    # Remap alpha: clip((alpha - 0.14) / 0.86) ** 1.4
    alpha = np.power(np.clip((alpha - 0.14) / 0.86, 0.0, 1.0), 1.4)

    # Edge luminance suppression for alpha < 0.95
    lum = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
    edge_factor = 1.0 - 0.8 * np.clip((lum - 150.0) / 70.0, 0.0, 1.0)
    alpha = np.where(alpha < 0.95, alpha * edge_factor, alpha)
    alpha = np.clip(alpha, 0.0, 1.0)

    # Remove white fringe by un-premultiplying against white (247)
    a_expanded = alpha[:, :, None]
    bg_val = np.mean(bg_color)
    valid = a_expanded > 0.05
    rgb_clean = np.where(valid, (rgb - (1.0 - a_expanded) * bg_val) / np.maximum(a_expanded, 0.05), 0.0)
    rgb_clean = np.clip(rgb_clean, 0.0, 255.0).astype(np.uint8)

    alpha_u8 = (alpha * 255.0).astype(np.uint8)
    rgba = np.dstack([rgb_clean, alpha_u8])
    return rgba, person_mask

def main():
    os.chdir(PROJECT_ROOT)
    video_path = str(PROJECT_ROOT / "video.mp4")
    if not os.path.exists(video_path):
        raise FileNotFoundError("video.mp4 nahi mili! Make sure video.mp4 is in the same folder.")

    full_dir = str(PROJECT_ROOT / "full")
    lg_dir = str(PROJECT_ROOT / "public" / "frames" / "lg")
    sm_dir = str(PROJECT_ROOT / "public" / "frames" / "sm")
    ensure_dir(lg_dir)
    ensure_dir(sm_dir)

    # Copy resume.pdf to public/resume.pdf if exists
    if os.path.exists("resume.pdf"):
        shutil.copy("resume.pdf", str(PROJECT_ROOT / "public" / "resume.pdf"))
    elif os.path.exists("Abrar Resume.pdf"):
        shutil.copy("Abrar Resume.pdf", str(PROJECT_ROOT / "public" / "resume.pdf"))

    frame_files = extract_frames(video_path, full_dir)
    total_frames = len(frame_files)

    # Divide continuous 10s video into 4 logical shots (0-2.5s, 2.5-5s, 5-7.5s, 7.5-10s)
    q1 = total_frames // 4
    q2 = (total_frames * 2) // 4
    q3 = (total_frames * 3) // 4
    shot_ranges = [
        (0, q1 - 1),
        (q1, q2 - 1),
        (q2, q3 - 1),
        (q3, total_frames - 1)
    ]

    print("2. Loading rembg model (u2net_human_seg)...")
    session = new_session("u2net_human_seg")

    rgba_cache = []
    person_cx_list = []

    print("3. Removing background & cleaning edges for each frame...")
    for idx, fname in enumerate(frame_files):
        img_path = os.path.join(full_dir, fname)
        img_pil = Image.open(img_path).convert("RGB").resize((1600, 900), Image.Resampling.LANCZOS)
        rgba, p_mask = compute_masks_and_alpha(img_pil, session)
        rgba_cache.append(rgba)

        # Compute horizontal center cx of top 45% rows using person_mask
        top_h = int(900 * 0.45)
        top_weights = p_mask[:top_h, :]
        total_w = np.sum(top_weights)
        if total_w > 10:
            x_indices = np.arange(1600)[None, :]
            cx = float(np.sum(top_weights * x_indices) / (total_w * 1600.0))
        else:
            cx = 0.5
        person_cx_list.append(cx)

        if (idx + 1) % 20 == 0 or idx == total_frames - 1:
            print(f"   Processed {idx + 1}/{total_frames} frames")

    print("4. Cropping per-shot bounding boxes and saving WebP (lg & sm)...")
    shots_manifest = []
    for s_idx, (f_start, f_end) in enumerate(shot_ranges):
        min_x, min_y, max_x, max_y = 1600, 900, 0, 0
        for i in range(f_start, f_end + 1):
            alpha_channel = rgba_cache[i][:, :, 3]
            ys, xs = np.where(alpha_channel > 6)
            if len(xs) > 0:
                min_x = min(min_x, int(np.min(xs)))
                max_x = max(max_x, int(np.max(xs)))
                min_y = min(min_y, int(np.min(ys)))
                max_y = max(max_y, int(np.max(ys)))

        if max_x <= min_x or max_y <= min_y:
            min_x, min_y, max_x, max_y = 0, 0, 1600, 900
        else:
            # Add small safety padding and ensure even dimensions
            min_x = max(0, min_x - 8)
            min_y = max(0, min_y - 8)
            max_x = min(1600, max_x + 8)
            max_y = min(900, max_y + 8)

        box_w = max_x - min_x
        box_h = max_y - min_y
        shot_cx = float(np.mean(person_cx_list[f_start:f_end + 1]))

        shots_manifest.append({
            "from": f_start,
            "to": f_end,
            "box": [min_x, min_y, box_w, box_h],
            "cx": round(shot_cx, 4)
        })

        for i in range(f_start, f_end + 1):
            cropped = rgba_cache[i][min_y:max_y, min_x:max_x]
            pil_crop = Image.fromarray(cropped, mode="RGBA")

            # Save lg WebP
            lg_path = os.path.join(lg_dir, f"f{i:03d}.webp")
            pil_crop.save(lg_path, "WEBP", quality=80, alpha_quality=90)

            # Save sm WebP (half-size)
            sm_w = max(1, box_w // 2)
            sm_h = max(1, box_h // 2)
            pil_sm = pil_crop.resize((sm_w, sm_h), Image.Resampling.LANCZOS)
            sm_path = os.path.join(sm_dir, f"f{i:03d}.webp")
            pil_sm.save(sm_path, "WEBP", quality=78, alpha_quality=90)

    manifest = {
        "w": 1600,
        "h": 900,
        "count": total_frames,
        "shots": shots_manifest
    }
    manifest_path = str(PROJECT_ROOT / "public" / "frames" / "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)

    print("5. Done! All WebP frames and public/frames/manifest.json generated successfully!")

if __name__ == "__main__":
    main()