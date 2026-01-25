"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SlideTemplate, SlideHeading, SlideBody } from "./slide-template"
import { getAssetPath } from "@/lib/utils"

interface SlideCharacterBenjaminProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideCharacterBenjamin({ isActive, skipAnimations }: SlideCharacterBenjaminProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [hasPlayed, setHasPlayed] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (!videoRef.current) return

        if (isActive) {
            videoRef.current.currentTime = 0
            videoRef.current.pause()
            setHasPlayed(false)
            setHasStarted(false)
        } else {
            videoRef.current.pause()
            setHasStarted(false)
        }
    }, [isActive])

    const handleEnded = () => {
        if (!videoRef.current) return
        videoRef.current.currentTime = videoRef.current.duration
        videoRef.current.pause()
        setHasPlayed(true)
    }

    const triggerPlayback = useCallback(() => {
        if (!isActive || hasPlayed || !videoRef.current) return false
        videoRef.current.play().catch(() => {})
        setHasStarted(true)
        return true
    }, [isActive, hasPlayed])

    useEffect(() => {
        if (!isActive) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
                if (triggerPlayback()) {
                    e.preventDefault()
                    e.stopPropagation()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown, { capture: true })
        return () => window.removeEventListener("keydown", handleKeyDown, { capture: true })
    }, [isActive, triggerPlayback])

    const handleClick = (e: React.MouseEvent) => {
        if (triggerPlayback()) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    return (
        <div className="h-full w-full" onClick={handleClick}>
            <SlideTemplate
                isActive={isActive}
                skipAnimations={skipAnimations}
                alignment="left"
                mode="paper"
                fullImage={true}
                backgroundImage="/images/wildholz-background-new.png"
                contentWrapperClassName="max-w-[2000px] pl-6 pr-40 justify-start"
                contentClassName="max-w-4xl text-left"
                backgroundOverlay={
                    <>
                        <video
                            ref={videoRef}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={getAssetPath("/animation/Benjamin%20Hartmann.mp4")}
                            autoPlay={false}
                            muted
                            playsInline
                            onEnded={handleEnded}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    </>
                }
            >
                <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                    Benjamin Hartmann
                </SlideHeading>
                <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                    33, erfolgreicher Bestseller-Autor. Schreibt die Liebesgeschichten, von denen Emily träumt. Charmant, wortgewandt und von allen bewundert.{" "}
                    <motion.span
                        className="inline-block"
                        initial={skipAnimations ? false : { opacity: 0, y: 8 }}
                        animate={skipAnimations ? { opacity: 1, y: 0 } : (hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 })}
                        transition={skipAnimations ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        Bis er nach seinem Unfall in ein Koma fällt.
                    </motion.span>
                </SlideBody>
            </SlideTemplate>
        </div>
    )
}
