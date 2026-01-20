"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideWorld } from "@/components/presentation/slide-world"
import { SlideFeeling } from "@/components/presentation/slide-feeling"

const TOTAL_SLIDES = 3

export default function WildholzPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController 
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTitle isActive={activeSlide === 0} />
        <SlideWorld isActive={activeSlide === 1} />
        <SlideFeeling isActive={activeSlide === 2} />
      </PresentationController>
    </main>
  )
}
