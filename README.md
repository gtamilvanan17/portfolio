# Tamilvanan Gowran — Portfolio

A cinematic, single-page portfolio for a DevOps/SRE Engineer. React + Vite, react-three-fiber (Three.js) for the animated 3D hero, Framer Motion for scroll animations, and Tailwind CSS v4 for styling.

## Stack

- React 19 + TypeScript + Vite
- `three`, `@react-three/fiber`, `@react-three/drei` — the rotating service-mesh hero scene
- `framer-motion` — scroll reveals, count-ups, tilt cards, page transitions
- Tailwind CSS v4 (`@tailwindcss/vite`)

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

> `--legacy-peer-deps` is needed once because `@react-three/fiber` pins an exact React range; the project's `package.json` already locks `react`/`react-dom` to a compatible version (19.2.0).

## Build

```bash
npm run build
npm run preview
```

## Add your resume

Drop a `resume.pdf` file into `public/` — the "Download Resume" button links to `/resume.pdf`.

## Deploying to GitHub Pages

Two options are set up:

### Option A — GitHub Actions (recommended)

`.github/workflows/deploy.yml` builds and deploys automatically on every push to `main` using GitHub's official Pages actions. To enable it:

1. Push this repo to GitHub.
2. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab) — the site publishes to `https://<user>.github.io/<repo>/`.

`vite.config.ts` uses `base: './'` (relative paths), so it works out of the box under any repo subpath — no need to hardcode the repo name.

### Option B — `gh-pages` branch

```bash
npm run deploy
```

This builds the site and pushes `dist/` to a `gh-pages` branch via the `gh-pages` package. Then set **Settings → Pages → Source** to **Deploy from a branch → `gh-pages`**.
