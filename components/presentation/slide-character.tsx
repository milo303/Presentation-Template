"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"
import { cn } from "@/lib/utils"

interface SlideCharacterProps {
    isActive: boolean
    skipAnimations?: boolean
}

const SECONDARY_CHARACTERS = [
    {
        name: "Erik Wildholz",
        age: 35,
        role: "Der Lieblingsautor",
        image: "/images/char-erik.png",
        description: "Geheimnisvoll, zurückgezogen. Sein Bestseller machte ihn zum Star, doch er hasst das Rampenlicht."
    },
    {
        name: "Sophie",
        age: 30,
        role: "Die beste Freundin",
        image: "/images/char-sophie.png",
        description: "Digital Native, Realistin. Sie versucht Emily aus ihren Tagträumen zurück in die Berliner Realität zu holen."
    },
    {
        name: "Konrad",
        age: 65,
        role: "Der gute Geist",
        image: "/images/char-konrad.png",
        description: "Verwalter des Forsthofs. Er durchschaut Emilys Spiel sofort, schweigt aber aus Liebe zu Erik."
    }
]

export function SlideCharacter({ isActive, skipAnimations }: SlideCharacterProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundImage="/images/wildholz-character.png"
            mode="paper"
            fullImage={true}
            contentWrapperClassName="max-w-[2000px] pl-6 pr-40"
            contentClassName="max-w-4xl"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                Hauptfigur
            </SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                Emily (Anna) Keller
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                33, Grafik-Designerin für New-Adult-Romane. Sie lebt lieber in Tagträumen als in der Realität – bis sie durch einen Unfall zur Verlobten ihres Lieblingsautors wird.<br /><br />
                Ehrlich, humorvoll und endlich angekommen, aber mit einem Geheimnis, das alles zerstören könnte.
            </SlideBody>
        </SlideTemplate>
    )
}
