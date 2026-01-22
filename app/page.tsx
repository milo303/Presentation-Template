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

const TOTAL_SLIDES = 20

export default function WildholzPresentation() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >
        <SlideTitle isActive={activeSlide === 0} />
        <SlideProducersNote isActive={activeSlide === 1} />
        <SlideTrailer isActive={activeSlide === 2} />
        <SlideProducersNote isActive={activeSlide === 3} />
        <SlideLocation isActive={activeSlide === 4} />
        <SlideIdea isActive={activeSlide === 5} />
        <SlideCharacter isActive={activeSlide === 6} />
        <SlideCharacterPaul isActive={activeSlide === 7} />
        <SlideIncitingIncident isActive={activeSlide === 8} />
        <SlideCharacterBenjamin isActive={activeSlide === 9} />
        <SlideFamilyTree isActive={activeSlide === 10} />
        <SlideCommunity isActive={activeSlide === 11} />
        <SlideFeeling isActive={activeSlide === 12} />
        <SlideStructure isActive={activeSlide === 13} />
        <SlideDifferentiation isActive={activeSlide === 14} />
        <SlideTransmedia isActive={activeSlide === 15} />
        <SlideAtmosphere isActive={activeSlide === 16} />
        <SlideMarketing isActive={activeSlide === 17} />
        <SlideProduction isActive={activeSlide === 18} />
        <SlideClosing isActive={activeSlide === 19} />
      </PresentationController>
    </main>
  )
}
