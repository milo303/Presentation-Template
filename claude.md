# Presentation Template (Core Engine)

Next.js App Router project providing a high-end, slide-based presentation engine. This project has been stripped of specific content to serve as a clean starting point for new presentations.

## Project Snapshot
- **Stack**: Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4
- **UI**: shadcn/ui + Radix primitives + `framer-motion`
- **Transitions**: 2D Parallax (Slide) and 3D Page Flip (Book)
- **Modes**: Cinematic (Full-bleed) and Paper (Texture-based)

## Repo Layout
- `app/` - Application entry and global styles.
- `components/presentation/` - Core engine and template components.
    - `presentation-controller.tsx`: The main engine handling state, navigation, and transitions.
    - `slide-template.tsx`: The primary wrapper for content slides.
- `public/` - Static assets (images, videos, textures).
- `lib/utils.ts` - Contains `getAssetPath()` for flexible environment handling.

## How to Add New Slides

1. **Modify `app/page.tsx`**:
   - Update `TOTAL_SLIDES`.
   - Add a new `<SlideTemplate>` (or a custom component) within `<PresentationController>`.

```tsx
<SlideTemplate isActive={activeSlide === index} mode="cinematic">
  <SlideLabel isActive={activeSlide === index}>My Label</SlideLabel>
  <SlideHeading isActive={activeSlide === index}>My Title</SlideHeading>
  <SlideBody isActive={activeSlide === index}>My content here...</SlideBody>
</SlideTemplate>
```

2. **Slide Modes**:
   - `mode="cinematic"`: Best for immersive images/videos.
   - `mode="paper"`: Best for text-heavy content or a "journal" aesthetic.

3. **Backgrounds**:
   - Supports `backgroundImage`, `backgroundVideo`, and `backgroundSecondary` (for cross-fades).

## Working with Assets

**CRITICAL**: Always use the `getAssetPath()` utility for all images and videos in the `public` folder.

```tsx
import { getAssetPath } from "@/lib/utils"

<Image src={getAssetPath("/images/my-asset.png")} ... />
```

- **Images**: Place in `public/images/`.
- **Videos**: Place in `public/images/` or a sub-folder.
- **Textures**: Core textures like `paper-texture-torn.png` are in `public/images/`.

## Core Features Reference

### PresentationController
- Handles **Keyboard (Arrows, Space, Enter)** and **Click** navigation.
- Provides **Slide vs. Book** transition toggle in the UI.
- Manages **Fullscreen** mode (press 'F').

### SlideTemplate
- Handles all entry animations (`isActive` prop).
- Automatically skips animations during Book flips (`skipAnimations` prop) for performance.
- Provides semantic sub-components: `SlideLabel`, `SlideHeading`, `SlideBody`.

### Existing Template Components
- `SlideVideoClip`: Fullscreen video player with optimized state.
- `SlideLedBackgrounds`: Grid of images/videos often used for mood boards.
- `SlideLedVideo`: Large-scale background video template.

## Terminal Commands

### Development
```bash
npm run dev
# Running on port 4000
```

### Build & Export
```bash
npm run build
# Generates a static export in the /out directory
```

### Electron (Desktop App)
```bash
npm run app:dev   # Preview desktop app
npm run app:build # Build .dmg / .exe installers
```

## AI Instructions
When working with this project, prioritize maintaining the "premium" feel of the transitions. Ensure all new components use the `SlideTemplate` if possible to maintain visual consistency. Never hardcode asset paths; always wrap them in `getAssetPath()`.
