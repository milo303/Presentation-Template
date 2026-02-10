# Presentation Template (Core Engine)

Next.js App Router project providing a high-end, slide-based presentation engine. This project serves as a generic, customizable foundation for premium digital presentations.

## 🚀 Navigation & Usage
- **Next Slide**: Right Arrow, Space, Enter, or Click (right 70% of screen).
- **Previous Slide**: Left Arrow, Backspace, or Click (left 30% of screen).
- **Jump to Slide**: Click the **"Übersicht"** button or the **Slide Counter** (e.g., "01 / 03") to open the slide navigator sidebar. You can also use the floating navigator button on the left.
- **Fullscreen Mode**: Press **'F'** to toggle fullscreen. Recommended for final presentations.
- **Transition Toggle**: Use the selector at the bottom-left to switch between **Slide** (2D Parallax) and **Book** (3D Page Flip).

---

## 🛠 Adding New Content (For Users & Agents)

### 1. Adding Assets (Images/Videos)
Place all your media files in the `public/images/` directory.
- **Images**: `.jpg`, `.png`, `.svg`
- **Videos**: `.mp4`, `.webm`

### 2. Instructing the AI Agent
If you want the AI to add a slide for you, simply say:
> "Add a new slide about [Topic]. Use my image `my-photo.jpg` which I just put in the public/images folder."

The agent will then:
1. Identify the asset in `public/images/`.
2. Wrap it in `getAssetPath("/images/my-photo.jpg")`.
3. Add the code to `app/page.tsx`.

### 3. Manual Integration (For Agents)

**CRITICAL**: All image and video paths MUST use the `getAssetPath()` utility.

**Example: Adding a slide to `app/page.tsx`**
```tsx
// 1. Update TOTAL_SLIDES
const TOTAL_SLIDES = 4 // (increment existing count)

// 2. Add slide inside <PresentationController>
<SlideTemplate isActive={activeSlide === 3} mode="cinematic" backgroundImage="/images/my-hero.jpg">
  <SlideLabel isActive={activeSlide === 3}>Category</SlideLabel>
  <SlideHeading isActive={activeSlide === 3}>New Slide Title</SlideHeading>
  <SlideBody isActive={activeSlide === 3}>
    This slide uses an image from public/images/my-hero.jpg
  </SlideBody>
</SlideTemplate>
```

---

## 📁 Project Structure Reference
- `app/page.tsx`: The main deck file. Manage slide order and content here.
- `components/presentation/`: Core logic and template components.
- `public/images/`: Store all your custom media and core textures here.
- `lib/utils.ts`: Contains the essential `getAssetPath()` utility.

## 🤖 AI Instructions
When working with this project:
- **Premium Aesthetics**: Keep the cinematic and paper modes polished.
- **No Hardcoding**: Never use a path like `/images/foo.jpg` directly. Always use `getAssetPath("/images/foo.jpg")`.
- **Slide Count**: Always update `TOTAL_SLIDES` in `app/page.tsx` when adding or removing slides to ensure the progress bar and navigation work correctly.
- **Navigation Feedback**: Remind the user about the **'F'** shortcut if they are reviewing or presenting.
