"use client"

import { useEffect, useRef } from "react"
import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"
import { getAssetPath } from "@/lib/utils"

interface SlideCharacterPaulProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCharacterPaul({ isActive, skipAnimations }: SlideCharacterPaulProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!videoRef.current) return

        if (isActive) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
        }
    }, [isActive])

    const handleEnded = () => {
        if (!videoRef.current) return
        videoRef.current.currentTime = videoRef.current.duration
        videoRef.current.pause()
    }

    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            mode="paper"
            fullImage={true}
            contentWrapperClassName="max-w-[2000px] px-10 items-start"
            contentClassName="w-full h-full"
            backgroundOverlay={
                <>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={getAssetPath("/images/hf_20260122_165308_45669a47-d321-491b-948a-40da701a2792.mp4")}
                        autoPlay={false}
                        muted
                        playsInline
                        onEnded={handleEnded}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
                </>
            }
        >
            <div className="relative h-full w-full">
                <div className="absolute left-0 top-0">
                    <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                        Figur
                    </SlideLabel>
                    <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                        Paul Hartmann
                    </SlideHeading>
                </div>
                <div className="absolute right-0 top-[22%] max-w-[520px] text-right">
                    <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
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
