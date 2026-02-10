"use client"

import { useState } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTemplate, SlideHeading, SlideBody, SlideLabel } from "@/components/presentation/slide-template"

const TOTAL_SLIDES = 3

export default function PresentationTemplate() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTemplate isActive={activeSlide === 0} mode="cinematic">
          <SlideLabel isActive={activeSlide === 0}>Presentation</SlideLabel>
          <SlideHeading isActive={activeSlide === 0}>Welcome to Your Presentation</SlideHeading>
          <SlideBody isActive={activeSlide === 0}>
            Edit app/page.tsx to change this content or add new slides.
          </SlideBody>
        </SlideTemplate>

        <SlideTemplate isActive={activeSlide === 1} mode="paper">
          <SlideLabel isActive={activeSlide === 1} mode="paper">Section 1</SlideLabel>
          <SlideHeading isActive={activeSlide === 1} mode="paper">Key Features</SlideHeading>
          <SlideBody isActive={activeSlide === 1} mode="paper">
            <ul className="list-disc list-inside space-y-2">
              <li>Cinematic and Paper modes</li>
              <li>Smooth transitions (Slide & Book)</li>
              <li>Fully customizable with Tailwind CSS</li>
            </ul>
          </SlideBody>
        </SlideTemplate>

        <SlideTemplate isActive={activeSlide === 2} mode="cinematic">
          <SlideLabel isActive={activeSlide === 2}>Conclusion</SlideLabel>
          <SlideHeading isActive={activeSlide === 2}>Thank You</SlideHeading>
          <SlideBody isActive={activeSlide === 2}>
            Questions? Contact us at support@example.com
          </SlideBody>
        </SlideTemplate>
      </PresentationController>
    </main>
  )
}
