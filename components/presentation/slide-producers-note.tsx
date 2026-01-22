"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { SlideTemplate } from "./slide-template"
import { getAssetPath } from "@/lib/utils"

interface SlideProducersNoteProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideProducersNote({ isActive, skipAnimations }: SlideProducersNoteProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasEnded, setHasEnded] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      setHasEnded(false)
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
    setHasEnded(true)
  }

  return (
    <SlideTemplate
      isActive={isActive}
      skipAnimations={skipAnimations}
      mode="cinematic"
      backgroundOverlay={
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={getAssetPath("/animation/Producers%20Note.mp4")}
            autoPlay={false}
            muted
            playsInline
            onEnded={handleEnded}
          />
          {hasEnded && (
            <div className="absolute inset-0 flex items-start justify-center pt-[12vh]">
              <motion.p
                className="text-white text-[clamp(3rem,4.6vw+1.6rem,6.2rem)] font-serif font-semibold tracking-[0.04em] drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                initial={skipAnimations ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={skipAnimations ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Warum Wildholz?
              </motion.p>
            </div>
          )}
        </>
      }
      contentClassName="hidden"
      contentWrapperClassName="pointer-events-none"
    >
      {null}
    </SlideTemplate>
  )
}
