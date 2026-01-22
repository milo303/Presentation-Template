"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideIdeaProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideIdea({ isActive, skipAnimations }: SlideIdeaProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-idea.png"
            mode="paper"
            imageClassName="w-[38%] h-[66%]"
            contentClassName="max-w-[820px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Das Konzept</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Wahrheit vs. Illusion</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper">
                Wildholz ist eine moderne, emotionale Daily-Telenovela über Liebe, Familie und Neuanfang.<br /><br />
                Hier prallen Welten aufeinander: Handwerk trifft auf Digitalisierung, Stadt auf Land und die einsame Emily auf eine Gemeinschaft, die sie für ihre Verlobte hält.
            </SlideBody>
        </SlideTemplate>
    )
}
