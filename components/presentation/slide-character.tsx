"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideCharacterProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCharacter({ isActive, skipAnimations }: SlideCharacterProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundImage="/images/wildholz-character.png"
            mode="paper"
            fullImage={true}
            contentWrapperClassName="max-w-[2000px] pl-6 pr-40"
            contentClassName="max-w-4xl"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                Hauptcharakter
            </SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                Emily (Anna) Keller
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                33, Grafik-Designerin für New-Adult-Romane. Sie lebt lieber in Tagträumen als in der Realität – bis sie durch einen Unfall zur Verlobten ihres Lieblingsautors wird.<br /><br />
                Ehrlich, humorvoll und endlich angekommen, aber mit einem Geheimnis, das alles zerstören könnte.
            </SlideBody>
        </SlideTemplate>
    )
}
