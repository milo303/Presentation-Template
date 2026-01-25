"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideStructureProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideStructure({ isActive, skipAnimations }: SlideStructureProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="right"
            backgroundImage="/images/Blaetterdach.jpg"
            mode="paper"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="hidden">Dramaturgie</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Wie in Wildholz die Bäume rascheln</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    Moderne, emotionale Daily-Telenovela. Liebes- und Familienserie mit dem Mut zu
                    großen Gefühlen, authentisch und doch romantisch erzählt. Mit einer selbstironischen
                    Heldin, die uns zum Lachen bringt.
                </p>
                <p>
                    Ein wunderschöner Forsthof mit Sägewerk, Möbelwerkstatt, Pension und Hof-Café,
                    Mehrgenerationenfamilie lebt und arbeitet gemeinsam, inklusive Pferd Horst-Peter, den
                    Schafen Gisela und Greta und der durchgeknallten Labrador-Hunden Timmi, Tommi und Tammi.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
