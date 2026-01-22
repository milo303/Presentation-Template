"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideCommunityProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCommunity({ isActive, skipAnimations }: SlideCommunityProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-community.png"
            mode="paper"
            alignment="left"
            imageClassName="w-[38%] h-[66%]"
            contentClassName="max-w-[820px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Das Ensemble</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Das Herz von Wildholz</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper">
                Die Hartmanns: Eine Familie mit Kanten und viel Herz. Martha (59), das resolute Oberhaupt. Paul (37), der bodenständige Tischler.<br /><br />
                Lotte (35), die naturverbundene Försterin und Opa Karl (84) mit seinem Akkordeon. Eine Welt, in der jeder seinen Platz hat – außer Emily... noch.
            </SlideBody>
        </SlideTemplate>
    )
}
