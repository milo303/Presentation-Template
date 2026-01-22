"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideTransmediaProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideTransmedia({ isActive, skipAnimations }: SlideTransmediaProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-novel.png"
            mode="paper"
            alignment="right"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Crossmedia</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Mehr als nur Serie</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    <strong>Die Roman-Reihe:</strong> Benjamin Hartmanns fiktive Bestseller werden real – als echte New-Adult-Romane im Buchhandel, noch vor Serienstart.
                </p>
                <p>
                    <strong>Der Soundtrack:</strong> Der Titelsong „The way to myself" (Camille Dombrowsky) schafft einen musikalischen Wiedererkennungswert.
                </p>
                <p className="text-xl italic opacity-70 pt-8 border-t border-[#5C4033]/20">
                    Ein Ökosystem aus Serie, Roman, Musik und Pop-ups.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
