# Product Requirements Document (PRD): Award-Level Scroll-Driven 3D Portfolio

## Role & Objective
You are a senior creative developer. Build an award-level, scroll-driven personal portfolio for **Muhammad Abrar** from his video (`video.mp4`) and résumé (`Abrar Resume.pdf`). Follow this specification exactly; do not simplify, skip, or substitute anything. Work phase by phase as instructed.

---

## 0. Tech Stack & File Architecture
- **Framework**: Vite + React + TypeScript
- **Libraries**: `gsap` (ticker & animations), `lenis` (smooth scroll), `@fontsource/anton`, `@fontsource-variable/inter-tight`, `@fontsource/jetbrains-mono`.
- **3D Rendering**: No `three.js`; all 3D effects must use pure CSS 3D and HTML5 Canvas 2D frame rendering.
- **Vite Config**: Set Vite `base: './'` and do NOT use React `StrictMode`.
- **Required File Structure**:
  - `src/data.ts` (ALL portfolio content — easy to maintain and update later)
  - `src/engine/director.ts` (Lenis + GSAP scroll engine & scene math)
  - `src/engine/frames.ts` (Canvas frame loader & stride streaming)
  - `src/engine/hooks.ts` (Custom hooks for scene subscriptions & refs)
  - `src/components/Stage.tsx` (Fixed full-viewport Canvas & blade transitions)
  - `src/components/Chrome.tsx` (Preloader, HUD, Navigation, Custom Cursor)
  - `src/components/Odometer.tsx` (Mechanical rolling digit counter)
  - `src/components/TiltCard.tsx` (3D cursor-tilting glass card with radial glare)
  - `src/scenes/Hero.tsx`
  - `src/scenes/About.tsx`
  - `src/scenes/Work.tsx`
  - `src/scenes/Journey.tsx`
  - `src/scenes/Skills.tsx`
  - `src/scenes/Awards.tsx`
  - `src/scenes/Contact.tsx`
  - `src/styles.css`
  - `public/frames/{lg,sm}/fNNN.webp`
  - `public/frames/manifest.json`
  - `public/resume.pdf` (Copy of `Abrar Resume.pdf`)

---

## 1. Content Specification (`src/data.ts`)
Populate `src/data.ts` with Muhammad Abrar's exact information so he can easily edit/maintain it later:
- **First Name**: `ABRAR`
- **Full Name**: `Muhammad Abrar`
- **Role**: `OPERATIONS &` / `AUTOMATION DEV.` (Line 1 ink, Line 2 red)
- **Hero Tagline (approx 190 chars)**: `Results-driven Operations & Customer Relations professional blending Software Engineering, Python automation, and ERP analytics to transform complex workflows into high-speed systems.`
- **Manifesto (4-6 lines, highlight keywords in red)**: `I bridge the gap between **enterprise operations** and **software engineering**. From leading customer service logistics at **DWP Group** to building **Python data pipelines**, **Power Query dashboards**, and **AI-assisted web apps**, I turn manual bottlenecks into automated, high-efficiency workflows.`
- **3 Glass Stat Cards (Odometer driven)**:
  1. `79` (`%` suffix) — DAE Software Engineering Score (2095/2650)
  2. `6` (`+` suffix) — Years in Operations, CRM & Team Leadership
  3. `15` (`+` suffix) — Custom Automation Pipelines & Scripts Deployed
- **3 Featured Projects (Work Deck)**:
  1. **01 / PYTHON & STREAMLIT**: `REPAIR COST ESTIMATOR`
     - *Desc*: Historical closed-complaint part compatibility & standardized gas pricing estimator for field technicians.
     - *Chips*: `Python`, `Streamlit`, `SQLite`, `Pandas`
     - *GitHub*: `https://github.com/theeabrarrr/estimator`
     - *Visual Mock*: Animated gauge & live cost breakdown meter.
  2. **02 / DATA PIPELINE**: `ERP COMPLAINTS CLEANER`
     - *Desc*: Automated extraction and cleaning pipeline converting multi-page PDF and legacy ERP exports into structured Excel workbooks.
     - *Chips*: `Python`, `pdfplumber`, `openpyxl`, `Pandas`
     - *GitHub*: `https://github.com/theeabrarrr/erp-complaints-cleaner`
     - *Visual Mock*: Animated data transformation heatmap grid.
  3. **03 / BI & WORKFLOW**: `ERP DISPATCH & PCB SYNC`
     - *Desc*: Self-referencing Power Query M-code feedback loops and Google Apps Script web app for real-time dispatch & PCB tracking.
     - *Chips*: `Power Query M`, `Apps Script`, `Oracle ERP`, `Excel`
     - *GitHub*: `https://github.com/theeabrarrr`
     - *Visual Mock*: Live status sync nodes & chat/log bubbles.
- **3 Journey Items (Newest at top, Start Year `2020` to `2026`)**:
  1. `2025 — PRESENT` | `CUSTOMER RELATIONS OFFICER` | `DWP Group (Digital World Pakistan)`
  2. `2022 — 2024` | `TEAM LEAD (OPERATIONS & SALES)` | `GFX House, Karachi`
  3. `2020 — 2022` | `SOCIAL MEDIA & OPS EXECUTIVE` | `Boutique Brands & DAE Software Engineering (Jinnah Polytechnic)`
- **16 Skills (Fibonacci Sphere Orbit)**:
  `Python`, `Pandas`, `Streamlit`, `Power Query M`, `Advanced Excel`, `Oracle ERP`, `Google Apps Script`, `SQLite`, `Git & GitHub`, `CRM Systems`, `Route Optimization`, `Data Analysis`, `PDF Extraction`, `Linux / WSL`, `Team Leadership`, `Process Automation`
- **Awards / Highlights (4 Flip-in Counter Cards + Certifications Ring)**:
  - *4 Flip Cards*:
    1. `2095+` — DAE Marks Scored (Jinnah Polytechnic)
    2. `100%` — SOP & KPI Compliance Rate
    3. `3+` — Enterprise ERP & Web Tools Built
    4. `24/7` — Operations & Dispatch Reliability
  - *Certifications / Education Ring (Cylinder)*:
    1. `DAE in Software Engineering` — Sindh Board of Technical Education
    2. `BS Computer Science (In Process)` — UBIT, University of Karachi
    3. `Enterprise ERP & CRM Operations` — DWP Group
    4. `Python Data & Automation Engineering` — Self-Directed / GitHub
    5. `Global Team & Client Leadership` — GFX House
    6. `Intermediate & Matriculation` — Karachi Board
- **Contact Info**:
  - *Email*: `croabrarrr` / `@gmail.com`
  - *Links*:
    - GitHub: `https://github.com/theeabrarrr`
    - LinkedIn: `https://linkedin.com/in/theabrar14`
    - Résumé: `./resume.pdf`

---

## 2. Video Transparent Frames (Python Script: `scripts/process_video.py`)
Write a standalone Python script (`scripts/process_video.py`) and a fallback generator (`scripts/generate_dummy_frames.py` if `video.mp4` is not yet placed) following these exact rules:
1. Extract every frame using `ffmpeg -i video.mp4 -start_number 0 full/f%03d.png`.
2. Detect shot cuts using `ffmpeg` `select='gte(scene,0)',metadata=print`; frames with highest scene scores (~0.3) are cuts. Expect 4 shots (or split evenly into 4 logical segments if continuous).
3. For each frame, combine two masks:
   - `personMask`: uses `rembg` with model `u2net_human_seg` and `only_mask=True`.
   - `propsMask`: pixels whose maximum channel distance from background colour (sample corners, ~247) exceeds 14, ramped to 1 by 40. Apply `binary_opening(3)`, retain connected blobs > 4000 px, then dilate by 4 to preserve chair, table, and laptop.
4. Set `alpha = max(personMask, propsMask)`, then apply Gaussian blur of `0.8`.
5. Remove white fringe by un-premultiplying against white: `rgb = (rgb - (1 - a) * 247) / a` where `a > 0.05`.
6. Erode alpha: `alpha = 0.35 * alpha + 0.65 * MinFilter(3)(alpha)`.
7. Remap alpha: `alpha = clip((alpha - 0.14) / 0.86) ** 1.4`. For edge pixels (`alpha < 0.95`), multiply alpha by `1 - 0.8 * clip((Lum - 150) / 70)`.
8. Resize to `1600x900` virtual space. For each shot, compute union bounding box of `alpha > 6`, crop every frame of that shot to it, and save as WebP (`q=80`, `alpha_quality=90`) to `public/frames/lg/`, plus half-size copy (`q=78`) to `public/frames/sm/`.
9. In `public/frames/manifest.json`, write `{ w: 1600, h: 900, count, shots: [{ from, to, box: [x, y, w, h], cx }] }`. `cx` is the person's horizontal centre (`0..1`), measured as alpha-weighted mean `x` of top 45% of rows (in laptop shot, measure person only).

---

## 3. Scroll Engine (`src/engine/director.ts`)
- Configure Lenis: `{ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 }`.
- Drive from `gsap.ticker` with `lagSmoothing(0)`, keep stopped until preloader finishes, set `history.scrollRestoration = 'manual'`.
- Define `SCENES = [{ id, from, to, x, k, label }]` where `to < from` plays in reverse:
  - `hero` / `Hello` / S1 start → end / `x: 0.70` / `k: 1.0`
  - `about` / `About` / S2 / `x: 0.27` / `k: 1.0`
  - `work` / `Work` / S3 / `x: 0.77` / `k: 0.86`
  - `journey` / `Journey` / S4 first 60% / `x: 0.26` / `k: 1.0`
  - `skills` / `Toolkit` / S4 next 25% / `x: 0.50` / `k: 0.98`
  - `awards` / `Awards` / S4 last 15% / `x: 0.75` / `k: 1.0`
  - `contact` / `Contact` / S1 reversed (end → start) / `x: 0.50` / `k: 1.0`
- **Section heights**: `hero: 230vh`, `about: 280vh`, `work: 460vh`, `journey: 240vh`, `skills: 280vh`, `awards: 320vh`, `contact: 240vh`.
- Each section has `position: sticky; top: 0; height: 100vh;` and an inner element with `overflow: hidden`.
- Cache each section's `top` and `height` with `ResizeObserver`.
- Compute per scene:
  - `enter = clamp((y - (top - vh)) / vh)`
  - `p = clamp((y - top) / (h - vh))`
  - `exit = clamp((y - (top + h - vh)) / vh)`
  - `vis = clamp(min(enter * 1.6, 1 - exit * 2.2))`
- Notify subscribers. Components must mutate DOM through `refs` ONLY (zero React re-renders while scrolling).
- **Frame selection**: `lead = 0.78 * vh`, `span = 0.62 * vh`. Active scene is last one where `y >= top - lead`. Fractional frame: `from + (to - from) * p`. Transition `t = easeInOutSine(clamp((y - (top - lead)) / span))`.

---

## 4. Stage Canvas & Blade Transition (`src/components/Stage.tsx` & `src/engine/frames.ts`)
- Fixed full-viewport canvas with DPR capped at 2.
- Draw frame with `scale = vh * k / 900`, bottom-anchored using `offY = vh - 900 * scale`, `offX = x * vw - cx * 1600 * scale`, plus mouse parallax `±14px` (lerp `0.06`).
- For fractional frames, draw `floor(f)`, then `floor(f)+1` on top at `globalAlpha = frac` within same shot.
- **Blade Transition**:
  - `skew = 0.2 * vh`, `e = -skew + (vw + 2 * skew) * t`.
  - Clip outgoing shot to polygon right of line `(e + skew, 0)` to `(e - skew, H)`. Draw at `alpha = 1 - 0.35 * t`, shifted `+60 * t` px.
  - Clip incoming shot to left of that line, shifted `-60 * (1 - t)` px.
  - Draw blade as `3px` red line (white when entering Contact) with `24px` glow and `90px` gradient trail.
- **Mobile (`< 820px`)**: `x = 0.5`, `scale = min(vh * 0.74 / 900, vw * 1.05 / boxWidth)`.
- **Loader**: Fetch `manifest.json`. Use `sm/` under `820px`, else `lg/`. Load in stride order `8 -> 4 -> 2 -> 1`, shot boundaries first, `img.decode()` on each. Preloader waits for first 25% of frames; rest stream in background. Missing frame falls back to nearest loaded frame in same shot.

---

## 5. Layers, Design System & Global UI
- **Z-Index Layers**:
  - `z0`: `.layer-back` (`position: fixed; pointer-events: none;`) holding behind-the-person elements (`HERO` giant name, `ABOUT` red wash, `WORK` perspective grid floor, `JOURNEY` giant outlined year, `SKILLS` back half of orbit, `CONTACT` blade-clipped red background & giant `LET'S TALK`).
  - `z1`: Stage `<canvas>`
  - `z2`: `.layer-front` (`position: fixed; pointer-events: none;`) holding front half of skills orbit.
  - `z3`: `<main>` containing sticky sections.
  - `z50`: HUD (Logo `ABRAR®`, pill nav, bottom-right progress % & 2px red rail).
  - `z90+`: Custom desktop cursor & Preloader.
- **Design System**:
  - Colors: `--red: #ff1f1f`, `--ink: #0d0d0d`, `--paper: #ffffff`, `--mute: #5e5e5e`, `--line: rgba(13, 13, 13, .09)`.
  - Fonts: `Anton` (uppercase display & numbers), `Inter Tight` (body, weight 600 for manifesto), `JetBrains Mono` (11-12px uppercase labels `(0N) NAME` with number in red).
- **Preloader, HUD, Magnetic Buttons & Cursor**: Implement exact specifications from Section 6 of the master specification.

---

## 6. Sections (Exact Implementation)
Implement all 7 scenes (`Hero`, `About`, `Work`, `Journey`, `Skills`, `Awards`, `Contact`), motion rules (`opacity * max(0, 1 - exit * 2.4)`), and mobile responsive adaptations (`< 820px`) exactly as specified in Sections 7, 8, and 9 of the master specification.