# Fitness Tracker

Body recomposition tracker — КБЖУ, вес, тренировки, аналитика.

## Tech stack

- React 18 + TypeScript
- Vite 5
- vite-plugin-pwa (Workbox)
- localStorage (no backend)

---

## Local development

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Deploy to GitHub Pages

### 1. Create repository

```bash
git init
git add .
git commit -m "initial"
gh repo create fitness-tracker --public
git push -u origin main
```

### 2. Set your repo name in vite.config.ts

```ts
// vite.config.ts
const BASE = process.env.VITE_BASE ?? "/fitness-tracker/";
//                                      ^^^^^^^^^^^^^^^^
//                                      change to your repo name
```

### 3. Add gh-pages GitHub Action (recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build
        env:
          VITE_BASE: /fitness-tracker/   # ← your repo name

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Push to `main` → GitHub Action builds and deploys automatically.

### 4. Manual deploy (alternative)

```bash
npm run deploy
# Uses gh-pages package to push dist/ to gh-pages branch
```

### 5. Enable GitHub Pages

GitHub repo → Settings → Pages → Source: `gh-pages` branch → Save

App will be live at: `https://USERNAME.github.io/fitness-tracker/`

---

## PWA icons

Open `public/generate-icons.html` in a browser, click the button,
save the three PNG files to `public/icons/`:

```
public/icons/
├── icon-180.png   (Apple Touch Icon)
├── icon-192.png   (Android / PWA)
└── icon-512.png   (Splash screen)
```

---

## Project structure

```
fitness-tracker/
├── public/
│   ├── icons/           ← PWA icons (generate via generate-icons.html)
│   └── generate-icons.html
├── src/
│   ├── tracker/
│   │   └── Tracker.tsx  ← main app (3000+ lines, single-file architecture)
│   ├── App.tsx           ← PWA update banner wrapper
│   ├── main.tsx          ← React root + SW registration
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Data storage

All data is stored in `localStorage` — no backend, no account needed.

| Key | Contents |
|---|---|
| `fitness_logs_v35` | DailyLog[] — all entries |
| `fitness_meta` | Migration metadata, backup list |
| `fitness_backup_*` | Pre-migration / pre-import snapshots |

Export your data any time via **Аналитика → Скачать backup**.

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `VITE_BASE` | `/fitness-tracker/` | Base URL path (set to your repo name) |
