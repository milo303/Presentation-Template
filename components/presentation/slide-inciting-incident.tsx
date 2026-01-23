"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideIncitingIncidentProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideIncitingIncident({ isActive, skipAnimations }: SlideIncitingIncidentProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundImage="/images/wildholz-incident.png"
            mode="paper"
            imageClassName="right-[4%] top-[16%] w-[42%] h-[68%]"
            contentClassName="max-w-[780px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Der Auslöser</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Plötzlich Emily-Anna</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-center">
                Ein dramatischer Unfall im hektischen Köln führt Emily direkt ins Herz der Familie Hartmann.<br /><br />
                Vom Krankenhaus in den Forsthof: Ein Missverständnis macht sie zur Verlobten des Star-Autors Benjamin Hartmann – und sie kann das Geheimnis nicht mehr lüften.
            </SlideBody>
        </SlideTemplate>
    )
}
