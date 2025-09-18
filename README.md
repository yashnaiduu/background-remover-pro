<div align="center">

# Background Remover – World‑Class Light/Dark SaaS UI

Remove image backgrounds with pixel‑perfect quality. Premium, responsive SaaS UI (light/dark), drag‑drop uploads, before/after preview, and one‑click download.

[☕ Buy me a coffee](https://www.buymeacoffee.com/your_handle)

</div>

## ✨ Features

- Dual theme with animated toggle (sun/moon) and glassmorphism surfaces
- Drag & drop upload with glowing border and micro‑interactions
- Before/After preview, one‑click download (PNG/JPG/WebP)
- API proxy: Single origin at `http://localhost:3000` → Flask backend
- AI engine with configurable options and fallback

## 🧱 Tech Stack

- Next.js App Router, TailwindCSS v4, Framer Motion, Lucide Icons
- Flask API (`/api/remove_background`), Pillow

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

## 🧠 Notes

- First run downloads the model to the user cache; subsequent runs are fast.

## 📣 Credits & License

MIT © 2025. See LICENSE.

If this helped you, consider supporting: [Buy me a coffee](https://www.buymeacoffee.com/your_handle)

