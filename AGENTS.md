# Agent Instructions

## Cursor Cloud specific instructions

- This repo is a static Astro/Vue site; no backend, database, Docker service, or external local service is required for the core app.
- Standard commands live in `package.json`: use `pnpm dev --host 0.0.0.0` for browser testing, `pnpm run build` for the production build, and `pnpm run preview` after building.
- The useful smoke test is `/label`: enter newline-separated URLs, click `印刷ページに行く`, and verify QR label cards render. Do not click `印刷` during automated/manual smoke tests unless intentionally testing the system print dialog.
- Astro currently reports unsupported file type warnings for `.bml`, `style.css`, and `Boothlet.vue` files under `src/pages`; these warnings are present in both dev and build output and were non-blocking during setup.
- There are no `lint` or `test` scripts in `package.json` at the time of setup. `pnpm exec astro check` prompts interactively to add `@astrojs/check` and `typescript`, so avoid using it as a non-interactive Cloud check unless those dependencies are intentionally added later.
