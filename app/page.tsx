"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideLocation } from "@/components/presentation/slide-location"
import { SlideIdea } from "@/components/presentation/slide-idea"
import { SlideCharacter } from "@/components/presentation/slide-character"
import { SlideIncitingIncident } from "@/components/presentation/slide-inciting-incident"
import { SlideCommunity } from "@/components/presentation/slide-community"
import { SlideFeeling } from "@/components/presentation/slide-feeling"
import { SlideStructure } from "@/components/presentation/slide-structure"
import { SlideDifferentiation } from "@/components/presentation/slide-differentiation"
import { SlideAudience } from "@/components/presentation/slide-audience"
import { SlideTransmedia } from "@/components/presentation/slide-transmedia"
import { SlideAtmosphere } from "@/components/presentation/slide-atmosphere"
import { SlideMarketing } from "@/components/presentation/slide-marketing"
import { SlideProduction } from "@/components/presentation/slide-production"
import { SlideClosing } from "@/components/presentation/slide-closing"

const TOTAL_SLIDES = 15

export default function WildholzPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTitle isActive={activeSlide === 0} />
        <SlideLocation isActive={activeSlide === 1} />
        <SlideIdea isActive={activeSlide === 2} />
        <SlideCharacter isActive={activeSlide === 3} />
        <SlideIncitingIncident isActive={activeSlide === 4} />
        <SlideCommunity isActive={activeSlide === 5} />
        <SlideFeeling isActive={activeSlide === 6} />
        <SlideStructure isActive={activeSlide === 7} />
        <SlideDifferentiation isActive={activeSlide === 8} />
        <SlideAudience isActive={activeSlide === 9} />
        <SlideTransmedia isActive={activeSlide === 10} />
        <SlideAtmosphere isActive={activeSlide === 11} />
        <SlideMarketing isActive={activeSlide === 12} />
        <SlideProduction isActive={activeSlide === 13} />
        <SlideClosing isActive={activeSlide === 14} />
      </PresentationController>
    </main>
  )
}
