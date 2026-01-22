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
            backgroundImage="/images/wildholz-structure.png"
            mode="paper"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Dramaturgie</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Die Story Engine</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    <strong>Identitäts-Drama:</strong> Emilys Gratwanderung als „Anna" – eine Lüge, die von Tag zu Tag schwerer wiegt.
                </p>
                <p>
                    <strong>Love-Triangle:</strong> Benjamin vs. Paul – der feingeistige Autor vs. der bodenständige Tischler.
                </p>
                <p>
                    <strong>Der Forsthof:</strong> Ein Erbe in Gefahr. Tradition trifft auf wirtschaftlichen Druck und Modernisierung.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
