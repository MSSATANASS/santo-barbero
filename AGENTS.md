# Repository Guidelines

## Project Structure & Module Organization
- Vite + React 19 + TypeScript app at the repo root.
- Entry points: `index.html`, `index.tsx`, `App.tsx`.
- Components live in `components/` (PascalCase, `.tsx`).
- Static assets and PWA files in `public/` (`manifest.json`, `sw.js`).
- Build output in `dist/` (generated; never edit or commit).
- Vendor override patches in `patches/` (e.g., `node-domexception`).

## Build, Test, and Development Commands
- `npm install` — install dependencies (respects `overrides`).
- `npm run dev` — start Vite dev server on `http://localhost:3000`.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.
- Env: set `GEMINI_API_KEY` in `.env.local` (Vite loads via `vite.config.ts`). Never commit `.env*` files.

## Coding Style & Naming Conventions
- TypeScript, 2-space indent, semicolons, single quotes.
- Components: PascalCase filenames and default exports (e.g., `components/Header.tsx`).
- Functions/variables camelCase; React components as `const Name: React.FC = () => { ... }`.
- Imports: relative paths or alias `@` to project root (e.g., `import Hero from '@/components/Hero'`).
- Keep UI logic in `components/`; prefer small, focused components.
- Styling is Tailwind-first (see `tailwind.config.cjs`); co-locate any custom CSS utilities in `styles/` and import them once in `index.tsx`.

## Mobile & Responsive App Requirements
- Treat every feature as mobile-first; start layouts for narrow viewports (<375px) and progressively enhance for tablets/desktop.
- Leverage Tailwind responsive utilities and design tokens from `tailwind.config.cjs` to keep spacing, colors, and typography consistent.
- Ensure interactive elements meet mobile accessibility targets (44px touch area, proper focus states) and avoid hover-only cues.
- Keep assets and copy lightweight; defer non-critical scripts and prefer lazy-loaded components for heavy sections (e.g., galleries).
- Test on physical devices or emulators by running `npm run dev -- --host` and loading the LAN URL on the phone; capture screenshots/GIFs for PRs.
- Keep the PWA metadata (`public/manifest.json`, icons, splash screens) aligned with the latest branding so the installable app feels native.

## Testing Guidelines
- No test runner is configured. Recommended: Vitest + Testing Library.
- Suggested naming: `components/Thing.test.tsx`.
- Run tests with `npx vitest` once added; target meaningful coverage of UI behavior.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `build:`, `chore:`. Example: `feat(services): add pricing grid`.
- PRs must include: concise description, linked issues, screenshots/GIFs for UI changes, and test notes.
- Keep diffs focused; do not include `dist/` or `node_modules/`.

## Security & Configuration Tips
- Do not hardcode secrets; read `process.env.GEMINI_API_KEY` (injected at build time).
- Update `public/manifest.json` icons and metadata as branding changes.
- Adjust `public/sw.js` only when cache strategy or routes change.

## Agent-Specific Instructions
- Follow these conventions for any edits; avoid modifying `dist/`.
- Touch `patches/` only to update the pinned override with clear rationale.
- Validate locally with `npm run build`/`preview` before proposing large changes.
