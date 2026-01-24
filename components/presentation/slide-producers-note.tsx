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
  const [arrowStep, setArrowStep] = useState(0)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
      setHasEnded(false)
      setArrowStep(0)
    } else {
      videoRef.current.pause()
      setArrowStep(0)
    }
  }, [isActive])

  const handleEnded = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = videoRef.current.duration
    videoRef.current.pause()
    setHasEnded(true)
    setArrowStep(1)
  }

  const handleArrowClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasEnded) return
    setArrowStep((current) => Math.min(current + 1, 3))
  }

  // Handle keyboard navigation for arrows
  useEffect(() => {
    if (!isActive || !hasEnded) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        if (arrowStep < 3) {
          e.preventDefault()
          e.stopImmediatePropagation() // Prevent global slide navigation
          setArrowStep((s) => s + 1)
        }
      }
    }

    // Use capture phase to intercept before PresentationController
    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [isActive, hasEnded, arrowStep])

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
              className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-auto cursor-pointer"
              initial={skipAnimations ? false : { opacity: 0, y: 24 }}
              animate={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={skipAnimations ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleArrowClick}
            >
              <div className="absolute inset-0">
                {/* Left Arrow - Farmhouse (left building) */}
                {arrowStep >= 1 && (
                  <div className="absolute left-[34%] bottom-[34%] flex flex-col items-center gap-4">
                    <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      Serienkonzept
                    </div>
                    <motion.div
                      className="relative h-28 w-[3px] bg-white/70"
                      initial={skipAnimations ? false : { scaleY: 0 }}
                      animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                      transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "bottom" }}
                    >
                      <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-white/80" />
                    </motion.div>
                  </div>
                )}
                {/* Center Arrow - Main House (central building) */}
                {arrowStep >= 2 && (
                  <div className="absolute left-[47%] bottom-[37%] flex flex-col items-center gap-4">
                    <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      Gesellschaftlicher Anspruch
                    </div>
                    <motion.div
                      className="relative h-24 w-[3px] bg-white/70"
                      initial={skipAnimations ? false : { scaleY: 0 }}
                      animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                      transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "bottom" }}
                    >
                      <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-white/80" />
                    </motion.div>
                  </div>
                )}
                {/* Right Arrow - Barn with Solar Panels */}
                {arrowStep >= 3 && (
                  <div className="absolute left-[72%] bottom-[34%] flex flex-col items-center gap-4">
                    <div className="text-sm uppercase tracking-[0.2em] font-bold text-white/85 text-center whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      Werteversprechen
                    </div>
                    <motion.div
                      className="relative h-28 w-[3px] bg-white/70"
                      initial={skipAnimations ? false : { scaleY: 0 }}
                      animate={skipAnimations ? { scaleY: 1 } : { scaleY: 1 }}
                      transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "bottom" }}
                    >
                      <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-white/80" />
                    </motion.div>
                  </div>
                )}
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
