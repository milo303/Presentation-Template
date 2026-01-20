"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideAtmosphere } from "@/components/presentation/slide-atmosphere"
import { SlideWorld } from "@/components/presentation/slide-world"
import { SlideFeeling } from "@/components/presentation/slide-feeling"

const TOTAL_SLIDES = 4

export default function WildholzPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTitle isActive={activeSlide === 0} />
        <SlideAtmosphere isActive={activeSlide === 1} />
        <SlideWorld isActive={activeSlide === 2} />
        <SlideFeeling isActive={activeSlide === 3} />
      </PresentationController>
    </main>
  )
}
