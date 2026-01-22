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
import { SlideProducersNote } from "@/components/presentation/slide-producers-note"
import { SlideTrailer } from "@/components/presentation/slide-trailer"
import { SlideClosing } from "@/components/presentation/slide-closing"

const TOTAL_SLIDES = 19

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
        <SlideProducersNote isActive={activeSlide === 2} />
        <SlideLocation isActive={activeSlide === 3} />
        <SlideIdea isActive={activeSlide === 4} />
        <SlideCharacter isActive={activeSlide === 5} />
        <SlideCharacterPaul isActive={activeSlide === 6} />
        <SlideIncitingIncident isActive={activeSlide === 7} />
        <SlideCharacterBenjamin isActive={activeSlide === 8} />
        <SlideFamilyTree isActive={activeSlide === 9} />
        <SlideCommunity isActive={activeSlide === 10} />
        <SlideFeeling isActive={activeSlide === 11} />
        <SlideStructure isActive={activeSlide === 12} />
        <SlideDifferentiation isActive={activeSlide === 13} />
        <SlideTransmedia isActive={activeSlide === 14} />
        <SlideAtmosphere isActive={activeSlide === 15} />
        <SlideMarketing isActive={activeSlide === 16} />
        <SlideProduction isActive={activeSlide === 17} />
        <SlideClosing isActive={activeSlide === 18} />
      </PresentationController>
    </main>
  )
}
