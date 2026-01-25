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
import { SlideProductionData } from "@/components/presentation/slide-production-data"
import { SlideLedVideo } from "@/components/presentation/slide-led-video"
import { SlideVideoClip } from "@/components/presentation/slide-video-clip"
import { SlideGreenProduction } from "@/components/presentation/slide-green-production"
import { SlideLedBackgrounds } from "@/components/presentation/slide-led-backgrounds"
import { SlideProducersNote } from "@/components/presentation/slide-producers-note"
import { SlideTrailer } from "@/components/presentation/slide-trailer"
import { SlideClosing } from "@/components/presentation/slide-closing"
import { SlideQuestion } from "@/components/presentation/slide-question"
import { SlideKomparsen } from "@/components/presentation/slide-komparsen"

const TOTAL_SLIDES = 23

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
        <SlideProductionData isActive={activeSlide === 13} />
        <SlideProduction isActive={activeSlide === 14} />
        <SlideLedVideo isActive={activeSlide === 15} />
        <SlideVideoClip
          isActive={activeSlide === 16}
          src="/clips/1.%20Wildholz%20Stockshot%20mit%20Musik.mp4"
          title="Wildholz Clip 1"
        />
        <SlideVideoClip
          isActive={activeSlide === 17}
          src="/clips/2.%20Wildholz%20Anna%20Paul%20mit%20Musik.mp4"
          title="Wildholz Clip 2"
        />
        <SlideVideoClip
          isActive={activeSlide === 18}
          src="/clips/3.%20Wildholz%20Traumsequenz%20mit%20Musik.mp4"
          title="Wildholz Clip 3"
        />
        <SlideLedBackgrounds isActive={activeSlide === 19} />
        <SlideKomparsen isActive={activeSlide === 20} />
        <SlideGreenProduction isActive={activeSlide === 21} />
        <SlideClosing isActive={activeSlide === 22} />
      </PresentationController>
    </main>
  )
}
