"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideProductionProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideProduction({ isActive, skipAnimations }: SlideProductionProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-production-v2.jpg"
            mode="paper"
            alignment="right"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Produktion</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Technologie & Rahmen</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    <strong>Virtual Production:</strong> KI-gestützte Stage für wetterunabhängige, nachhaltige und hocheffiziente Drehabläufe.
                </p>
                <p>
                    <strong>Green Motion:</strong> Massive Reduktion von Emissionen durch digitale 3D-Umgebungen und regionale Produktion.
                </p>

                <div className="pt-8 grid grid-cols-2 gap-8 border-t border-[#5C4033]/20">
                    <div>
                        <p className="text-[#5C4033]/60 uppercase tracking-widest text-xs mb-1">Budget (Staffel 1)</p>
                        <p className="text-2xl font-serif">17,5 Mio. €</p>
                        <p className="text-sm opacity-70">200 Folgen à 24-30 Min.</p>
                    </div>
                    <div>
                        <p className="text-[#5C4033]/60 uppercase tracking-widest text-xs mb-1">Timeline</p>
                        <p className="text-2xl font-serif">Sept. 2027</p>
                        <p className="text-sm opacity-70">Möglicher Sendestart</p>
                    </div>
                </div>
            </SlideBody>
        </SlideTemplate>
    )
}
