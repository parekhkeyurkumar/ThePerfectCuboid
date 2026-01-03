# The Perfect Cuboid

A mobile-first React + TypeScript single-page app that explores the perfect cuboid problem. Enter integer edge lengths to see face and space diagonals, with inline validation and whole-number detection tolerant to floating-point noise.

## Features

- Real-time diagonal calculations for any positive whole-number edges (1-9999)
- Inline validation with friendly messages
- Preset buttons (includes 44 × 117 × 240) to jump-start exploration
- Whole-number badges using a 1e-9 tolerance to smooth floating rounding
- Educational panel summarizing the perfect cuboid problem and nudging users to experiment

## Getting started (local)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

4. Preview the production build:

   ```bash
   npm run preview
   ```

5. Lint and test:

   ```bash
   npm run lint
   npm test
   ```

## Cloudflare Pages deployment

This is a static Vite build. Configure Cloudflare Pages with:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18+ (Vite targets modern ES modules)

After connecting your repository, Cloudflare will install dependencies and run the build. Ensure the `dist` folder is published.

## StackBlitz notes

- The repo is Vite-based with no backend, so it runs entirely in-browser on StackBlitz.
- Open the project in StackBlitz, allow it to install dependencies, then start the dev server with `npm run dev` (it should auto-start).
- If ports are prompted, expose the dev server port (default 5173).

## Project structure

- `src/App.tsx` — UI and validation logic
- `src/lib/diagonals.ts` — typed math helpers
- `src/lib/diagonals.test.ts` — Vitest unit coverage for diagonal math and near-integer checks
- `src/styles.css` — mobile-first styling
- `vite.config.ts`, `tsconfig*.json` — build and tooling configuration

Enjoy the hunt for a perfect cuboid!
