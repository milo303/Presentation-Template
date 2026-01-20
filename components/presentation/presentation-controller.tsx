"use client"

import React from "react"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PresentationControllerProps {
  children: React.ReactNode[]
  totalSlides: number
  onSlideChange?: (index: number) => void
}

export function PresentationController({ children, totalSlides, onSlideChange }: PresentationControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback((index: number, dir: "next" | "prev") => {
    if (isAnimating || index < 0 || index >= totalSlides) return
    setIsAnimating(true)
    setDirection(dir)
    setCurrentSlide(index)
    onSlideChange?.(index)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating, totalSlides, onSlideChange])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, "next")
    }
  }, [currentSlide, totalSlides, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, "prev")
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${index === currentSlide
              ? "opacity-100 translate-x-0 scale-100 z-10"
              : index < currentSlide
                ? "opacity-0 -translate-x-full scale-95 z-0"
                : "opacity-0 translate-x-full scale-95 z-0"
              }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                isActive: index === currentSlide,
                onNext: nextSlide,
                onPrev: prevSlide
              })
              : child}
          </div>
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-8 right-8 z-50 hidden items-center gap-2 text-xs text-muted-foreground/40 md:flex">
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">←</kbd>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">→</kbd>
        <span className="ml-1 text-white/30 uppercase tracking-widest">navigate</span>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 z-50 h-1 w-full bg-foreground/5">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  )
}
