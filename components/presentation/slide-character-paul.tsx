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
            alignment="right" // Right alignment to contrast with Emily's left alignment? Or stick to left? Let's try right.
            backgroundVideo="/images/hf_20260122_165308_45669a47-d321-491b-948a-40da701a2792.mp4"
            mode="paper"
            fullImage={true}
            contentWrapperClassName="max-w-[2000px] pr-6 pl-40 justify-end"
            contentClassName="max-w-4xl text-right"
            backgroundOverlay={
                <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
            }
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                Figur
            </SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                Paul Hartmann
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                37, Benjamins großer Bruder und Tischler. Nicht so feingeistig wie der Autor – anpackend, ehrlich und nimmt kein Blatt vor den Mund.<br /><br />
                Er ist der geerdete Gegenpol zu seinem Bruder. Unter der rauen Schale verbirgt sich ein verletzliches Herz, das schon bald für die falsche Verlobte schlägt.
            </SlideBody>
        </SlideTemplate>
    )
}
