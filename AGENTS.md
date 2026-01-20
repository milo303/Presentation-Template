# Agent Notes (Wildholz Pitch Deck)

Next.js (App Router) + TypeScript + Tailwind CSS v4. UI is mostly shadcn/ui
(New York style) + Radix.

No Cursor rules were found (`.cursorrules` / `.cursor/rules/`).
No Copilot rules were found (`.github/copilot-instructions.md`).

## Repo Layout
- `app/` - App Router routes, `app/globals.css`
- `components/ui/` - shadcn/ui building blocks (Radix)
- `components/presentation/` - slide components + `PresentationController`
- `hooks/` - client hooks
- `lib/` - utilities (notably `lib/utils.ts` -> `cn()`)
- `public/` - static assets

## Commands (pnpm)

Install + dev:
```bash
pnpm install
pnpm dev
```

Build + run:
```bash
pnpm build
pnpm start
```

### Lint
```bash
pnpm lint
```

Notes:
- `lint` runs `eslint .` but `eslint` / `eslint-config-next` are not currently in
  `devDependencies`. If lint fails, add them locally rather than relying on global.

Single file / autofix (once ESLint exists):
```bash
pnpm exec eslint "app/page.tsx"
pnpm exec eslint . --fix
```

### Typecheck
`next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `pnpm build` can
succeed even with TS errors. Use `tsc` for real checking:
```bash
pnpm exec tsc -p tsconfig.json --noEmit
pnpm exec tsc --noEmit --pretty false "app/page.tsx"
```

### Tests
No test runner is configured yet (no `test` script; no Vitest/Jest/Playwright deps).
If tests are added, prefer single-test-friendly commands:
```bash
# vitest
pnpm vitest run path/to/foo.test.ts
# jest
pnpm jest path/to/foo.test.ts -t "name"
# playwright
pnpm playwright test path/to/spec.spec.ts
```

## Code Style (match existing shadcn/ui patterns)

### TypeScript
- Keep `strict` typing; avoid `any` (use `unknown` + narrowing).
- Use `import type { ... }` for type-only imports.
- Prefer `type` for simple props/shapes; use `interface` when extension/merging helps.

### React / Next.js
- Default to Server Components; add `'use client'` only when needed.
- Keep client boundaries small (wrap interactive islands, not whole pages).
- Prefer functional components + hooks; avoid class components.

### Imports
Group imports with blank lines:
1. React / Next
2. Third-party
3. Internal `@/` (preferred; `@/*` is configured in `tsconfig.json`)
4. Relative `./` as last resort

### Formatting
- 2-space indentation.
- Prefer single quotes in TS/TSX.
- Most shadcn/ui files omit trailing semicolons; follow local file style.
- Avoid broad reformatting (no Prettier/Biome config is committed).

### Naming
- Components: `PascalCase`.
- Hooks: `useXxx`.
- Files: `kebab-case.ts(x)`.
- Constants: `SCREAMING_SNAKE_CASE`.
- Handlers: `handleXxx` or `onXxx`.

### Tailwind / Styling
- Tailwind v4 is driven by `app/globals.css` `@import` + CSS variables.
- Prefer token utilities (`bg-background`, `text-foreground`, `bg-gold`, etc.).
- Use `cn()` for class composition (`lib/utils.ts`).
- For variants, use `cva` (see `components/ui/button.tsx`).
- Avoid inline styles unless the value is truly dynamic.

### shadcn/ui Components
- Keep `components/ui/` generic; put product-specific UI in feature folders.
- Preserve `data-slot` attributes (used for styling and consistency).
- Prefer Radix primitives for accessibility.

### Error Handling
- Throw early for programmer misuse (example: `components/ui/form.tsx`).
- In client UI, prefer non-blocking feedback (toast) over `alert()`.
- Don’t swallow errors; log in dev and surface a useful UI state.
- For `catch (err)`, treat `err` as `unknown` and narrow before using.

### Performance / UX
- Keep state minimal; use `useCallback`/`useMemo` when passing handlers deep.
- Favor CSS transitions/animations; keep durations consistent.
- Validate mobile layouts (responsive Tailwind utilities).

### Design / Theme
- The primary theme lives in `app/globals.css` via CSS variables (OKLCH palette).
- Prefer existing tokens/semantic utilities over new one-off colors.
- Fonts are loaded in `app/layout.tsx` via `next/font` (use `font-sans` / `font-serif`).
- Keep slide layouts intentional (this is a pitch deck): use clear hierarchy,
  generous spacing, and readable type sizes.

### Accessibility
- Use semantic elements first (`button`, `a`, headings) before adding ARIA.
- Keep focus states intact (shadcn/ui uses `focus-visible:*` patterns).
- Add `aria-label` for icon-only buttons and controls.

### Assets / Next.js Images
- Static assets live in `public/` (notably `public/images/`).
- `next.config.mjs` sets `images.unoptimized: true`; don’t assume image
  optimization is available in all deployments.
- Prefer stable asset paths and avoid renaming public files unless necessary.

## Safe Change Practices
- Avoid large renames/reformats of shadcn/ui unless explicitly requested.
- If you add deps, update both `package.json` and `pnpm-lock.yaml`.
