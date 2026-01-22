# AGENTS.md (Wildholz Pitch Deck)

Next.js App Router project for a slide-like pitch deck. Keep diffs small and
match existing shadcn/ui + Tailwind patterns.

No Cursor rules found (`.cursorrules` / `.cursor/rules/`).
No Copilot rules found (`.github/copilot-instructions.md`).

## Project Snapshot
- Stack: Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4
- Package manager: pnpm (`pnpm-lock.yaml`)
- UI: shadcn/ui (New York) + Radix primitives + `cva`
- Motion: framer-motion (used in slides)
- Analytics: `@vercel/analytics` in `app/layout.tsx`
- Path alias: `@/*` -> repo root (`tsconfig.json`)
- shadcn config: `components.json` (aliases + `app/globals.css` as Tailwind entry)

## Repo Layout
- `app/` - `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (Tailwind v4 entry)
- `components/presentation/` - deck controller, slides, and the core template
    - `presentation-controller.tsx` - The engine (handles 3D book flip + slide transition)
    - `slide-template.tsx` - The foundation for 90% of slides (handles Paper/Cinematic modes)
- `components/ui/` - shadcn/ui components (Radix-based)
- `hooks/` - client hooks
- `lib/` - utilities (`lib/utils.ts` -> `cn()`)
- `public/` - static assets (slides use `public/images/*`)

Note: `styles/globals.css` exists but the app imports `app/globals.css`.

## How The Deck Works
- **Entry**: `app/page.tsx` renders `PresentationController` with **16 slides**.
- **Slide Modes**:
    - **Cinematic**: Full-bleed background images, dark gradients, white text.
    - **Paper**: Transparent slides sitting on a global or per-slide paper texture with autumn leaves. Content is inset like a printed book page.
- **Transition Styles**:
    - **Slide**: Parallax "Push" motion (Classic presentation feel).
    - **Book**: High-end 3D page flip.
        - **Diagonal Peel**: Pages flip from top-right to bottom-left (RotateY + RotateX + RotateZ + SkewY).
        - **Backface logic**: Turning pages have a "Back Face" with paper texture.
        - **Shadows**: Dynamic "floor" shadow cast on the page below and a spine crease.
        - **Timing**: 1.8s duration for a premium, heavy feel.
        - **Visibility**: Exiting pages fade out proactively (starts at 0.2s) to prevent corner lingering.

## Slide Reference (Order in app/page.tsx)
1. `SlideTitle` - Logo + Intro (Cinematic)
2. `SlideTrailer` - Video Mood Trailer (Cinematic) - Handles custom playback/fullscreen
3. `SlideLocation` - "Der Ort" (Paper)
4. `SlideIdea` - "Die Serie" (Paper)
5. `SlideCharacter` - "Charaktere" (Paper)
6. `SlideIncitingIncident` - "Der Aufhänger" (Paper)
7. `SlideCommunity` - "Zielgruppe" (Paper)
8. `SlideFeeling` - "Das Gefühl" (Cinematic)
9. `SlideStructure` - "Struktur" (Paper)
10. `SlideDifferentiation` - "Alleinstellungsmerkmal" (Paper)
11. `SlideAudience` - "Audienz" (Paper)
12. `SlideTransmedia` - "Transmedia" (Paper)
13. `SlideAtmosphere` - Interactive "Hut" (Cinematic) - handles interactive hut states
14. `SlideMarketing` - "Marketing" (Paper)
15. `SlideProduction` - "Produktion" (Paper) - Uses `wildholz-production-v2.jpg`
16. `SlideClosing` - Outro (Cinematic)

## Core Props for Slides
- `isActive`: Boolean to trigger entrance animations.
- `skipAnimations`: Boolean (true in Book mode). If true, the `SlideTemplate` skips entrance fades/scales to prevent visual clashing with the page-flip animation.

## Commands (pnpm)

Install:
```bash
pnpm install
```

Dev (runs on port 4000):
```bash
pnpm dev
# Opens at http://localhost:4000
```

Build / start (production server on port 4000):
```bash
pnpm build
pnpm start
# Opens at http://localhost:4000
```

### Mac Quick Start
Double-click `start-mac.command` to:
- Install dependencies (if needed)
- Start dev server on port 4000
- Auto-open browser to http://localhost:4000


### Lint
```bash
pnpm lint
pnpm exec eslint "app/page.tsx"      # single file
pnpm exec eslint . --fix             # autofix
```

Gotcha: `lint` runs `eslint .` but ESLint deps/config are not committed (no
`eslint` / `eslint-config-next` in `devDependencies`, no `.eslintrc*`).

### Typecheck
`next.config.mjs` sets `typescript.ignoreBuildErrors: true`; do not trust `pnpm build`
as a typecheck.
```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec tsc --noEmit --pretty false "app/page.tsx"  # quick single-file check
```

### Tests
No test runner configured (no `test` script, no `*.test.*`). If you add tests,
prefer single-test-friendly commands:
```bash
pnpm vitest run path/to/foo.test.ts
pnpm jest path/to/foo.test.ts -t "name"
pnpm playwright test path/to/spec.spec.ts
```

## Code Style (follow existing files)

### TypeScript
- Keep `strict` typing; avoid `any` (use `unknown` + narrowing).
- Use `import type { ... }` for type-only imports.
- Add explicit types at boundaries (component props, hook returns, callbacks).

### React / Next.js
- Default to Server Components; add `'use client'` only when needed.
- Keep client boundaries small (interactive islands).
- Prefer functional components + hooks.

### Imports
Order with blank lines:
1) React/Next, 2) third-party, 3) internal `@/`, 4) relative.

Use aliases from `components.json`:
- `@/components`, `@/components/ui`, `@/lib`, `@/hooks`

### Formatting
- 2-space indentation.
- Quotes/semicolons are mixed across the repo; follow local file style.
- No Prettier/Biome config: avoid broad reformatting-only diffs.

### Naming
- Components: `PascalCase`; hooks: `useXxx`.
- Files: `kebab-case.ts(x)`.
- Booleans: `isXxx`; callbacks: `onXxx`.

## Styling / UI Conventions

### Tailwind v4 + Tokens
- Tailwind is imported via `app/globals.css` (`@import 'tailwindcss';`).
- Theme is CSS variables (OKLCH) + `@theme inline` mappings.
- Prefer semantic tokens/utilities (`bg-background`, `text-foreground`, `bg-gold`).
- Add new colors by extending variables in `app/globals.css` (not inline hex).

### Class Composition + Variants
- Use `cn()` (`lib/utils.ts`) for `className` composition.
- Use `cva` for variants (`components/ui/button.tsx` is the reference pattern).

### shadcn/ui
- Keep `components/ui/` generic and reusable.
- Preserve Radix a11y patterns, `data-slot`, and `forwardRef` + `displayName`.

## Motion Guidelines
- Slides may use framer-motion; keep it client-only.
- Prefer a few deliberate entrance animations over many competing effects.
- Keep timings aligned with `PresentationController` (1.8s for book transitions).
- Use `skipAnimations` in custom slide logic to bypass entrance fades when book mode is active.

## Deployment

### GitHub Pages (Production)
- **Live URL**: `https://milo303.github.io/wildholz-pitch-deck`
- **Deployment**: Automatic via GitHub Actions on push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
  - Builds Next.js static export (`pnpm next build`)
  - Creates `.nojekyll` file to prevent Jekyll processing
  - Deploys to GitHub Pages using `actions/deploy-pages@v4`
- **Configuration**: 
  - `next.config.mjs`: `output: 'export'`, `basePath: '/wildholz-pitch-deck'`
  - Static HTML export to `./out` directory

### Docker Deployment
- **Image**: `ghcr.io/milo303/wildholz-pitch-deck:latest`
- **Registry**: GitHub Container Registry (GHCR)
- **Workflow**: `.github/workflows/docker-publish.yml`
  - Builds multi-stage Docker image on push to `main`
  - Publishes to GHCR automatically
- **Local Docker**:
  ```bash
  docker-compose up
  # or
  docker pull ghcr.io/milo303/wildholz-pitch-deck:latest
  docker run -p 3000:3000 ghcr.io/milo303/wildholz-pitch-deck:latest
  ```
- **Files**: `Dockerfile`, `docker-compose.yml`, `.dockerignore`

### Electron App (Desktop Distribution)
- **Purpose**: Standalone desktop app for offline presentations
- **Architecture**: Electron shell loading the live GitHub Pages URL
- **Auto-updates**: Automatically reflects changes when the web version is updated
- **Build**:
  ```bash
  pnpm run app:build  # Creates .dmg (macOS) and .exe (Windows)
  ```
- **Output**: `dist/` folder with installers
- **Configuration**: `electron/main.js`, `package.json` build section
- **Dev mode**: `pnpm run app:dev`

## Images / Assets

### Asset Path Handling
**CRITICAL**: All image and video paths MUST use the `getAssetPath()` utility to work correctly on GitHub Pages.

```typescript
import { getAssetPath } from "@/lib/utils"

// ✅ Correct - works on both localhost and GitHub Pages
<Image src={getAssetPath("/images/wildholz-logo.png")} alt="Logo" />
<video src={getAssetPath("/images/video.mp4")} />

// ❌ Wrong - will break on GitHub Pages
<Image src="/images/wildholz-logo.png" alt="Logo" />
```

### Why `getAssetPath()` is Required
- **Local dev**: Assets load from `/images/...`
- **GitHub Pages**: Assets must load from `/wildholz-pitch-deck/images/...`
- `getAssetPath()` automatically prepends the correct base path based on environment

### Asset Storage
- Put slide images in `public/images/` and reference via `/images/...` (wrapped in `getAssetPath()`)
- Use `next/image` with meaningful `alt`; be conservative with `priority`
- `next.config.mjs`: `images.unoptimized: true` (static export requirement)

### Components Using Assets
- **Direct usage**: `slide-title.tsx`, `slide-trailer.tsx`, `slide-family-tree.tsx`, etc.
- **Via props**: `slide-template.tsx` handles `backgroundImage`, `backgroundVideo`, `backgroundSecondary`
  - These props are automatically wrapped with `getAssetPath()` in the template
  - Pass paths as strings: `backgroundImage="/images/my-image.png"`
- **Character data**: `slide-character.tsx` wraps image paths in the `SECONDARY_CHARACTERS` array

### Adding New Assets
1. Place file in `public/images/`
2. Reference with `getAssetPath("/images/filename.ext")`
3. For `SlideTemplate` props, just pass the path string (wrapping is automatic)


## Toasts / Notifications
Two options exist:
- shadcn toast: `hooks/use-toast.ts` + `components/ui/toaster.tsx`
- sonner: `components/ui/sonner.tsx` (theme-aware)

Pick one per feature; avoid mixing.

## Error Handling
- Throw early for programmer misuse (example: `components/ui/form.tsx`).
- Prefer non-blocking UI feedback (toast) over `alert()`.
- Treat `catch (err)` as `unknown` and narrow.

## Safe Change Practices
- Avoid refactoring generated shadcn/ui components unless requested.
- Avoid formatting-only churn.
- If you add deps, update `package.json` and `pnpm-lock.yaml`.
- If you change slide count/order, update `TOTAL_SLIDES` in `app/page.tsx`.
