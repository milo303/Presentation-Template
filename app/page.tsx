"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideLocation } from "@/components/presentation/slide-location"
import { SlideIdea } from "@/components/presentation/slide-idea"
import { SlideCharacter } from "@/components/presentation/slide-character"
import { SlideCharacterPaul } from "@/components/presentation/slide-character-paul"
import { SlideCharacterBenjamin } from "@/components/presentation/slide-character-benjamin"
import { SlideFamilyTree } from "@/components/presentation/slide-family-tree"
import { SlideIncitingIncident } from "@/components/presentation/slide-inciting-incident"
import { SlideCommunity } from "@/components/presentation/slide-community"
import { SlideFeeling } from "@/components/presentation/slide-feeling"
import { SlideStructure } from "@/components/presentation/slide-structure"
import { SlideDifferentiation } from "@/components/presentation/slide-differentiation"
import { SlideTransmedia } from "@/components/presentation/slide-transmedia"
import { SlideAtmosphere } from "@/components/presentation/slide-atmosphere"
import { SlideMarketing } from "@/components/presentation/slide-marketing"
import { SlideProduction } from "@/components/presentation/slide-production"
import { SlideTrailer } from "@/components/presentation/slide-trailer"
import { SlideClosing } from "@/components/presentation/slide-closing"

const TOTAL_SLIDES = 18

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
        <SlideCharacterPaul isActive={activeSlide === 5} />
        <SlideIncitingIncident isActive={activeSlide === 6} />
        <SlideCharacterBenjamin isActive={activeSlide === 7} />
        <SlideFamilyTree isActive={activeSlide === 8} />
        <SlideCommunity isActive={activeSlide === 9} />
        <SlideFeeling isActive={activeSlide === 10} />
        <SlideStructure isActive={activeSlide === 11} />
        <SlideDifferentiation isActive={activeSlide === 12} />
        <SlideTransmedia isActive={activeSlide === 13} />
        <SlideAtmosphere isActive={activeSlide === 14} />
        <SlideMarketing isActive={activeSlide === 15} />
        <SlideProduction isActive={activeSlide === 16} />
        <SlideClosing isActive={activeSlide === 17} />
      </PresentationController>
    </main>
  )
}
