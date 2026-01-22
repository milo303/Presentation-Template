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
import { SlideTrailer } from "@/components/presentation/slide-trailer"
import { SlideClosing } from "@/components/presentation/slide-closing"

const TOTAL_SLIDES = 16

export default function WildholzPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTitle isActive={activeSlide === 0} />
        <SlideTrailer isActive={activeSlide === 1} />
        <SlideLocation isActive={activeSlide === 2} />
        <SlideIdea isActive={activeSlide === 3} />
        <SlideCharacter isActive={activeSlide === 4} />
        <SlideIncitingIncident isActive={activeSlide === 5} />
        <SlideCommunity isActive={activeSlide === 6} />
        <SlideFeeling isActive={activeSlide === 7} />
        <SlideStructure isActive={activeSlide === 8} />
        <SlideDifferentiation isActive={activeSlide === 9} />
        <SlideAudience isActive={activeSlide === 10} />
        <SlideTransmedia isActive={activeSlide === 11} />
        <SlideAtmosphere isActive={activeSlide === 12} />
        <SlideMarketing isActive={activeSlide === 13} />
        <SlideProduction isActive={activeSlide === 14} />
        <SlideClosing isActive={activeSlide === 15} />
      </PresentationController>
    </main>
  )
}
