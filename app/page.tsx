"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideCharacter } from "@/components/presentation/slide-character"
import { SlideCharacterPaul } from "@/components/presentation/slide-character-paul"
import { SlideCharacterBenjamin } from "@/components/presentation/slide-character-benjamin"
import { SlideFamilyTree } from "@/components/presentation/slide-family-tree"
import { SlideIncitingIncident } from "@/components/presentation/slide-inciting-incident"
import { SlideFeeling } from "@/components/presentation/slide-feeling"
import { SlideStructure } from "@/components/presentation/slide-structure"
import { SlideTransmedia } from "@/components/presentation/slide-transmedia"
import { SlideAtmosphere } from "@/components/presentation/slide-atmosphere"
import { SlideProduction } from "@/components/presentation/slide-production"
import { SlideProducersNote } from "@/components/presentation/slide-producers-note"
import { SlideTrailer } from "@/components/presentation/slide-trailer"
import { SlideClosing } from "@/components/presentation/slide-closing"
import { SlideQuestion } from "@/components/presentation/slide-question"
import { SlideKomparsen } from "@/components/presentation/slide-komparsen"

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
        <SlideQuestion isActive={activeSlide === 2} />
        <SlideProducersNote isActive={activeSlide === 3} />
        <SlideCharacter isActive={activeSlide === 4} />
        <SlideCharacterBenjamin isActive={activeSlide === 5} />
        <SlideCharacterPaul isActive={activeSlide === 6} />
        <SlideFamilyTree isActive={activeSlide === 7} />
        <SlideIncitingIncident isActive={activeSlide === 8} />
        <SlideFeeling isActive={activeSlide === 9} />
        <SlideStructure isActive={activeSlide === 10} />
        <SlideTransmedia isActive={activeSlide === 11} />
        <SlideAtmosphere isActive={activeSlide === 12} />
        <SlideProduction isActive={activeSlide === 13} />
        <SlideKomparsen isActive={activeSlide === 14} />
        <SlideClosing isActive={activeSlide === 15} />
      </PresentationController>
    </main>
  )
}
