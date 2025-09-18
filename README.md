<div align="center">

# Background Remover – World‑Class Light/Dark SaaS UI

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org) [![Tailwind](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com) [![Flask](https://img.shields.io/badge/Flask-2.x-000?logo=flask)](https://flask.palletsprojects.com/) [![backgroundremover](https://img.shields.io/badge/Engine-backgroundremover-blueviolet)](https://github.com/nadermx/backgroundremover) [![MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Remove image backgrounds with pixel‑perfect quality. Premium, responsive SaaS UI (light/dark) built with Next.js + Tailwind. AI powered by `backgroundremover` with `rembg` fallback.

[☕ Buy me a coffee](https://www.buymeacoffee.com/your_handle)

</div>

## ✨ Features

- Dual theme with animated toggle (sun/moon) and glassmorphism surfaces
- Drag & drop upload with glowing border and micro‑interactions
- Before/After preview, one‑click download (PNG/JPG/WebP)
- API proxy: Single origin at `http://localhost:3000` → Flask backend
- AI engine: [`backgroundremover`](https://github.com/nadermx/backgroundremover) with configurable options and `rembg` fallback

## 🧱 Tech Stack

- Next.js 15 (App Router), TailwindCSS v4, Framer Motion, Lucide Icons
- Flask API (`/api/remove_background`), Pillow
- `backgroundremover` (U2Net family) and `rembg`

## 🚀 Quickstart

Prereqs: Node 18+, Python 3.10+, Git

```bash
# 1) Install Python deps
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
pip install backgroundremover

# 2) Install frontend deps
cd next-frontend && npm i

# 3) Run both servers
# Terminal A (backend)
cd .. && ./venv/bin/python app.py
# Terminal B (frontend)
cd next-frontend && npm run dev

# Open frontend (single link; API rewrites to Flask)
open http://localhost:3000
```

First run downloads the U2Net model to `~/.u2net/`. Subsequent runs are fast.

## 🔌 API

POST `/api/remove_background`

Body:

```json
{
  "image": "data:image/png;base64,....",
  "format": "PNG",
  "model": "u2net",
  "alpha_matting": true,
  "alpha_matting_foreground_threshold": 240,
  "alpha_matting_background_threshold": 10,
  "alpha_matting_erode_structure_size": 10,
  "alpha_matting_base_size": 1000
}
```

Response:

```json
{
  "success": true,
  "image": "data:image/png;base64,....",
  "format": "PNG",
  "engine": "backgroundremover"
}
```

## 🖼️ UI Structure

- `next-frontend/src/app/page.tsx`: hero, tool, sections
- `next-frontend/src/components/upload-tool.tsx`: drag & drop, preview, download
- `next-frontend/src/components/theme-toggle.tsx`, `next-frontend/src/providers/theme-provider.tsx`
- `next-frontend/src/components/navbar.tsx`, `next-frontend/src/components/footer.tsx`

## 🧠 Engine Reference

- BackgroundRemover project: [`nadermx/backgroundremover`](https://github.com/nadermx/backgroundremover)

## 📣 Credits & License

MIT © 2025. Engine credits to the respective authors. See LICENSE.

If this helped you, consider supporting: [Buy me a coffee](https://www.buymeacoffee.com/your_handle)

