"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideCharacterBenjaminProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCharacterBenjamin({ isActive, skipAnimations }: SlideCharacterBenjaminProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundVideo="/images/hf_20260122_155150_9a4bc8fb-d668-41ce-bd88-d056890d4fc4.mp4"
            mode="paper"
            fullImage={true}
            contentWrapperClassName="max-w-[2000px] pl-6 pr-40 justify-start"
            contentClassName="max-w-4xl text-left"
            backgroundOverlay={
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            }
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                Figur
            </SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                Benjamin Hartmann
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                33, erfolgreicher Bestseller-Autor. Er schreibt die Liebesgeschichten, von denen Emily träumt.<br /><br />
                Charmant, wortgewandt und von allen bewundert. Doch als er nach seinem Unfall aus dem Koma erwacht, ist sein Leben ein unbeschriebenes Blatt – und die falsche Verlobte seine einzige Konstante.
            </SlideBody>
        </SlideTemplate>
    )
}
