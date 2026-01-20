"use client"

import React, { useCallback, useEffect, useState } from "react"
import { motion, Variants, Transition } from "framer-motion"

interface PresentationControllerProps {
  children: React.ReactNode[]
  totalSlides: number
  onSlideChange?: (index: number) => void
}

export function PresentationController({ children, totalSlides, onSlideChange }: PresentationControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index < 0 || index >= totalSlides) return
    setIsAnimating(true)
    setCurrentSlide(index)
    onSlideChange?.(index)
    // Synchronize animation lock with motion duration
    setTimeout(() => setIsAnimating(false), 1000)
  }, [isAnimating, totalSlides, onSlideChange])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
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

  // PowerPoint-style "Morph" variants with explicit types - Optimized for Performance
  // Removed dynamic blur (filter) as it causes significant repaints during animation
  const variants: Variants = {
    enter: {
      x: "100%",
      opacity: 0,
      scale: 1.02, // Reduced scale for less texture thrashing
      clipPath: "inset(0% 0% 0% 100%)",
      pointerEvents: "none"
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      pointerEvents: "auto",
      transition: {
        // Tighter spring for snappier feel without "floaty" lag
        x: { type: "spring", stiffness: 90, damping: 20, mass: 1 },
        opacity: { duration: 0.6, ease: "linear" }, // Faster opacity
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        clipPath: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      } as Transition
    },
    exit: {
      zIndex: 0,
      x: "-20%", // Reduced parallax distance
      opacity: 0,
      scale: 0.98,
      clipPath: "inset(0% 100% 0% 0%)",
      pointerEvents: "none",
      transition: {
        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.6, ease: "linear" },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        clipPath: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      } as Transition
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides Container - Everything is mounted to preload images */}
      <div className="relative h-full w-full">
        {React.Children.map(children, (child, index) => {
          const isCurrent = index === currentSlide
          const isPast = index < currentSlide
          const state = isCurrent ? "center" : isPast ? "exit" : "enter"

          return (
            <motion.div
              key={index}
              initial="enter"
              animate={state}
              variants={variants}
              className="absolute inset-0 h-full w-full"
              style={{
                visibility: (isCurrent || isPast || index === currentSlide + 1) ? "visible" : "hidden",
                willChange: "transform, opacity, clip-path", // Hardware acceleration hint
                backfaceVisibility: "hidden",
                perspective: 1000
              }}
            >
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<any>, {
                  isActive: isCurrent,
                  onNext: nextSlide,
                  onPrev: prevSlide
                })
                : child}
            </motion.div>
          )
        })}
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] } as Transition}
        />
      </div>
    </div>
  )
}
