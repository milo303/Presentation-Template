"use client"

import { useEffect, useRef } from "react"
import { SlideTemplate, SlideHeading, SlideBody } from "./slide-template"
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
            mode="cinematic"
            contentWrapperClassName="max-w-[2000px] px-10 items-start"
            contentClassName="w-full h-full"
            backgroundOverlay={
                <>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 h-full w-full object-cover"
                        src={getAssetPath("/animation/Paul%20Hartmann.mp4")}
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
                <div className="absolute right-0 top-[18%] max-w-[520px] text-right">
                    <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="cinematic" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] leading-[1.05]">
                        Paul Hartmann
                    </SlideHeading>
                    <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="cinematic" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)]">
                        37, Benjamins großer Bruder. Tischler für exquisite Design-Holzmöbel. Für ihn zählt noch echte Handarbeit mit Liebe zum Detail. Nicht so wortgewandt wie sein Autor-Bruder.<br /><br />Ehrlich, anpackend, nimmt kein Blatt vor den Mund.
                    </SlideBody>
                </div>
            </div>
        </SlideTemplate>
    )
}
