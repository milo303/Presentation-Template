"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideLocationProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideLocation({ isActive, skipAnimations }: SlideLocationProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-location.png"
            mode="paper"
            imageClassName="w-[38%] h-[66%]"
            contentClassName="max-w-[820px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Setting</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">
                Wald statt WLAN,<br />Humor statt Homeoffice.
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper">
                Wildholz ist ein malerischer Forsthof in den Bergen – ein eskapistischer Rückzugsort, an dem Handwerk auf Nachhaltigkeit trifft.<br /><br />
                Ein Ort für Wärme, Zusammenhalt und die Kraft, neu zu beginnen.
            </SlideBody>
        </SlideTemplate>
    )
}
