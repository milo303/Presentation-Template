"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideDifferentiationProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideDifferentiation({ isActive, skipAnimations }: SlideDifferentiationProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundImage="/images/Buch.png"
            mode="paper"
            imageClassName="right-[4%] top-[14%] w-[42%] h-[70%]"
            contentClassName="max-w-[820px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Strategie</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Mediathek First Daily</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-8">
                <p>
                    <strong>Story First:</strong> Wir denken Daily neu. Weniger Recaps, dafür ein konzentrierter Sog durch den Bogen der Folge.
                </p>
                <p>
                    <strong>Streaming-Fokus:</strong> Variable Längen (24-30 Min.) und ein fokussierter Cast für maximale Bindung.
                </p>
                <p className="text-xl italic opacity-70 pt-8 border-t border-[#5C4033]/20">
                    „Form folgt Inhalt" – Eine technologische und inhaltliche Erneuerung der Daily.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
