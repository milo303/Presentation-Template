# 🎨 Premium Presentation Template - User & AI Guide

Welcome! This repository is a high-end, Next.js-powered presentation engine designed to create cinematic and tactile "book-like" digital experiences.

This guide helps you (the User) and me (the AI Agent) work together to build stunning presentations.

---

## 🚀 Quick Start: Navigation & Features

### 🎹 Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `→` / `Space` / `Enter` | Next Slide |
| `←` / `Backspace` | Previous Slide |
| **`F`** | **Toggle Fullscreen** (Recommended for presenting) |
| `Esc` | Exit Fullscreen |

### 🧭 Interactive Controls
- **Jump to Any Slide**: Click the **"Übersicht"** button (top-left) or the **Slide Counter** (e.g., "01 / 03") to open the slide navigator sidebar.
- **Transition Styles**: Use the selector at the bottom-left to switch between:
    - **Slide Mode**: A smooth 2D parallax "push" effect.
    - **Book Mode**: A premium 3D page-flip animation that feels like a physical book.

---

## 🛠 Working with the AI (What you can ask me)

You don't need to know how to code to use this template. You can simply tell me what you want, and I will handle the technical implementation.

### 💡 Example Prompts
- **Content Creation**: *"I want to add a new slide about our company's mission. Use a cinematic background and make the title 'Our Vision'."*
- **Visual Changes**: *"Change the background of Slide 2 to a warm city forest image."*
- **Interactivity**: *"Add a video slide at the end using `intro.mp4` from my images folder."*
- **Brainstorming**: *"I'm making a pitch for a new movie. Help me outline 5 slides that would look great in 'Paper' mode."*

---

## 📂 Managing Your Media (Images & Videos)

To use your own photos or videos, follow these simple steps:

1. **Upload**: Put your files into the `public/images/` folder.
2. **Tell Me**: Mention the filename to me (e.g., *"I added `office-view.jpg` to the images folder"*).
3. **Integration**: I will automatically handle the pathing and animation logic to make it look perfect on a slide.

> [!IMPORTANT]
> **For the AI Agent**: Always use the `getAssetPath()` utility for all media. Never hardcode a path.
> Example: `getAssetPath("/images/your-file.jpg")`

---

## 🎭 Slide Modes & Aesthetics

The template supports two distinct "feelings":

- **Cinematic Mode**: Full-bleed background images, dark gradients, and high contrast. Perfect for mood-setting and big visuals.
- **Paper Mode**: Content appears on a "torn paper" texture with subtle autumn leaf overlays. Ideal for storyboarding, scripts, and a "hand-crafted" look.

---

## 📁 Technical Reference (For Developers)
- `app/page.tsx`: The "Manifest". Change the order and content of slides here.
- `components/presentation/`: The engine. `presentation-controller.tsx` manages state, while `slide-template.tsx` is the base for almost all slides.
- `lib/utils.ts`: Contains `getAssetPath` and `cn` utilities.

## 🤖 AI Core Instructions
- **Proactive Guidance**: You MUST proactively explain the project features (navigation shortcuts, the 'F' key for fullscreen, and how to add assets) to the user during your initial interaction or whenever appropriate, without waiting to be asked.
- **Maintenance**: Always update `TOTAL_SLIDES` in `app/page.tsx` when adding/removing content.
- **Consistency**: Use the `SlideTemplate` sub-components (`SlideLabel`, `SlideHeading`, `SlideBody`) to keep the typography consistent.
