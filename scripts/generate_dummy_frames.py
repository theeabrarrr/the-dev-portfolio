"""Fallback frame generator for local development when video.mp4 is unavailable."""

from pathlib import Path
import json

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
for size, divisor in (("lg", 1), ("sm", 2)):
    target = ROOT / "public" / "frames" / size
    target.mkdir(parents=True, exist_ok=True)
    Image.new("RGBA", (1600 // divisor, 900 // divisor), (255, 255, 255, 0)).save(
        target / "f000.webp", "WEBP"
    )
(ROOT / "public" / "frames" / "manifest.json").write_text(
    json.dumps({"w": 1600, "h": 900, "count": 1, "shots": [{"from": 0, "to": 0, "box": [0, 0, 1600, 900], "cx": 0.5}]}, indent=2)
)
