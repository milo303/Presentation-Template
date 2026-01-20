"use client"

import React, { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PresentationControllerProps {
  children: React.ReactNode[]
  totalSlides: number
  onSlideChange?: (index: number) => void
}

export function PresentationController({ children, totalSlides, onSlideChange }: PresentationControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<number>(0) // 1 for next, -1 for prev
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number, dir: number) => {
    if (isAnimating || index < 0 || index >= totalSlides) return
    setIsAnimating(true)
    setDirection(dir)
    setCurrentSlide(index)
    onSlideChange?.(index)
    // Synchronize animation lock with motion duration
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating, totalSlides, onSlideChange])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, 1)
    }
  }, [currentSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, -1)
    }
  }, [currentSlide, goToSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const diff = touchStartX - touchEndX
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide()
        else prevSlide()
      }
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [nextSlide, prevSlide])

  // PowerPoint-style "Morph" variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "30vw" : "-30vw",
      opacity: 0,
      scale: 1.05,
      filter: "blur(20px)",
      clipPath: direction > 0
        ? "inset(0% 0% 0% 100%)"
        : "inset(0% 100% 0% 0%)"
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        x: { type: "spring", stiffness: 80, damping: 20, mass: 1 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.8 },
        clipPath: { duration: 1, ease: [0.16, 1, 0.3, 1] }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "20vw" : "-20vw",
      opacity: 0,
      scale: 0.95,
      filter: "blur(20px)",
      clipPath: direction < 0
        ? "inset(0% 0% 0% 100%)"
        : "inset(0% 100% 0% 0%)",
      transition: {
        x: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8 },
        scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.8 },
        clipPath: { duration: 1, ease: [0.16, 1, 0.3, 1] }
      }
    })
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
          >
            {React.isValidElement(children[currentSlide])
              ? React.cloneElement(children[currentSlide] as React.ReactElement<any>, {
                isActive: true,
                onNext: nextSlide,
                onPrev: prevSlide
              })
              : children[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-8 right-8 z-50 hidden items-center gap-2 text-xs text-muted-foreground/40 md:flex">
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">←</kbd>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">→</kbd>
        <span className="ml-1 text-white/30 uppercase tracking-widest">navigate</span>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 z-50 h-1 w-full bg-white/5">
        <motion.div
          className="h-full bg-gold"
          initial={false}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
