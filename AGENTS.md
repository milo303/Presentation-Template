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
- **Entry**: `app/page.tsx` renders `PresentationController` with **15 slides**.
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
2. `SlideLocation` - "Der Ort" (Paper)
3. `SlideIdea` - "Die Serie" (Paper)
4. `SlideCharacter` - "Charaktere" (Paper)
5. `SlideIncitingIncident` - "Der Aufhänger" (Paper)
6. `SlideCommunity` - "Zielgruppe" (Paper)
7. `SlideFeeling` - "Das Gefühl" (Cinematic)
8. `SlideStructure` - "Struktur" (Paper)
9. `SlideDifferentiation` - "Alleinstellungsmerkmal" (Paper)
10. `SlideAudience` - "Audienz" (Paper)
11. `SlideTransmedia` - "Transmedia" (Paper)
12. `SlideAtmosphere` - Interactive "Hut" (Cinematic) - handles interactive hut states
13. `SlideMarketing` - "Marketing" (Paper)
14. `SlideProduction` - "Produktion" (Paper) - Uses `wildholz-production-v2.jpg`
15. `SlideClosing` - Outro (Cinematic)

## Core Props for Slides
- `isActive`: Boolean to trigger entrance animations.
- `skipAnimations`: Boolean (true in Book mode). If true, the `SlideTemplate` skips entrance fades/scales to prevent visual clashing with the page-flip animation.

## Commands (pnpm)

Install:
```bash
pnpm install
```

Dev:
```bash
pnpm dev
```

Build / start:
```bash
pnpm build
pnpm start
```

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

## Images / Assets
- Put slide images in `public/images/` and reference via `/images/...`.
- Use `next/image` with meaningful `alt`; be conservative with `priority`.
- `next.config.mjs`: `images.unoptimized: true` (do not assume optimization).

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
