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
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
      setHasEnded(false)
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
            src={getAssetPath("/animation/Producers%20Note%20V2.mp4")}
            autoPlay={false}
            muted
            playsInline
            onEnded={handleEnded}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            initial={skipAnimations ? false : { opacity: 1 }}
            animate={skipAnimations ? { opacity: 0 } : { opacity: isActive ? 0 : 1 }}
            transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {hasEnded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={skipAnimations ? false : { opacity: 0, y: 24 }}
              animate={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={skipAnimations ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0">
                {/* Left Arrow - Farmhouse (left building) */}
                <div className="absolute left-[22%] bottom-[32%] flex flex-col items-center gap-3">
                  <motion.div
                    className="relative h-28 w-[2px] bg-white/70"
                    initial={skipAnimations ? false : { scaleY: 0 }}
                    animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                    transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/80" />
                  </motion.div>
                  <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap">
                    Familien- und<br />Heimatgeschichte
                  </div>
                </div>
                {/* Center Arrow - Main House (central building) */}
                <div className="absolute left-[46%] bottom-[35%] flex flex-col items-center gap-3">
                  <motion.div
                    className="relative h-24 w-[2px] bg-white/70"
                    initial={skipAnimations ? false : { scaleY: 0 }}
                    animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                    transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/80" />
                  </motion.div>
                  <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap">
                    Gesellschaftlicher<br />Anspruch
                  </div>
                </div>
                {/* Right Arrow - Barn with Solar Panels */}
                <div className="absolute left-[68%] bottom-[32%] flex flex-col items-center gap-3">
                  <motion.div
                    className="relative h-32 w-[2px] bg-white/70"
                    initial={skipAnimations ? false : { scaleY: 0 }}
                    animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                    transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/80" />
                  </motion.div>
                  <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap">
                    Echte Gefühle
                  </div>
                </div>
              </div>
            </motion.div>
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
