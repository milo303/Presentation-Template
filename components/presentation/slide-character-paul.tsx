"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideCharacterPaulProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCharacterPaul({ isActive, skipAnimations }: SlideCharacterPaulProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            mode="cinematic"
            backgroundVideo="/animation/Paul%20Hartmann.mp4"
            contentWrapperClassName="max-w-[2000px] px-10 items-start"
            contentClassName="w-full h-full"
            backgroundOverlay={
                <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
            }
        >
            <div className="relative h-full w-full">
                <div className="absolute right-0 top-[18%] max-w-[520px] text-right">
                    <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="cinematic" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)]">
                        Figur
                    </SlideLabel>
                    <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="cinematic" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] leading-[1.05]">
                        Paul Hartmann
                    </SlideHeading>
                    <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="cinematic" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)]">
                        37, Benjamins großer Bruder und Tischler. Nicht so feingeistig wie der Autor – anpackend,
                        ehrlich und nimmt kein Blatt vor den Mund.<br /><br />
                        Er ist der geerdete Gegenpol zu seinem Bruder. Unter der rauen Schale verbirgt sich ein
                        verletzliches Herz, das schon bald für die falsche Verlobte schlägt.
                    </SlideBody>
                </div>
            </div>
        </SlideTemplate>
    )
}
