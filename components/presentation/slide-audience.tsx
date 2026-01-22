"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideAudienceProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideAudience({ isActive, skipAnimations }: SlideAudienceProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-audience.png"
            mode="paper"
            alignment="left"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Zielgruppe</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">The New Adult Market</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    <strong>Fandom & Community:</strong> Wir bedienen die hochaktive <em>BookTok-Community</em> und Fans moderner Romance – ein Megatrend im Buchmarkt.
                </p>
                <p>
                    <strong>Cozy Romance:</strong> WILDHOLZ füllt die Lücke zwischen klassischer Daily und modernem Streaming-Eskapismus.
                </p>
                <p className="text-xl italic text-[#7A2E2E] font-medium pt-8 border-t border-[#5C4033]/20">
                    Authentisch, nahbar & emotional aufgeladen.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
