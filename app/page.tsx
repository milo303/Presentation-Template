"use client"

import { useState, useEffect } from "react"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTitle } from "@/components/presentation/slide-title"
import { SlideIdea } from "@/components/presentation/slide-idea"
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

const TOTAL_SLIDES = 17

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
        <SlideIdea isActive={activeSlide === 4} />
        <SlideCharacter isActive={activeSlide === 5} />
        <SlideCharacterBenjamin isActive={activeSlide === 6} />
        <SlideCharacterPaul isActive={activeSlide === 7} />
        <SlideIncitingIncident isActive={activeSlide === 8} />
        <SlideFamilyTree isActive={activeSlide === 9} />
        <SlideFeeling isActive={activeSlide === 10} />
        <SlideStructure isActive={activeSlide === 11} />
        <SlideTransmedia isActive={activeSlide === 12} />
        <SlideAtmosphere isActive={activeSlide === 13} />
        <SlideProduction isActive={activeSlide === 14} />
        <SlideKomparsen isActive={activeSlide === 15} />
        <SlideClosing isActive={activeSlide === 16} />
      </PresentationController>
    </main>
  )
}
