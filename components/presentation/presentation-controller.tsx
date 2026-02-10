"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, Variants, Transition } from "framer-motion"
import Image from "next/image"
import { LayoutTemplate, ChevronRight, ChevronLeft, Maximize2, Minimize2, Settings2 } from "lucide-react"
import { cn, getAssetPath } from "@/lib/utils"

interface PresentationControllerProps {
  children: React.ReactNode[]
  totalSlides: number
  onSlideChange?: (index: number) => void
}

// Helper for the paper background that rotates WITH the slide
function SlideBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#f4ebd0]" />
      <div className="absolute inset-0 opacity-100 mix-blend-multiply">
        <img
          src={getAssetPath("/images/paper-texture-torn.png")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Global Leaves - consistently framed on each page */}
      <div className="absolute inset-0 z-5 opacity-80 mix-blend-multiply">
        <motion.div
          className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rotate-[-10deg]"
          animate={{ y: [0, -24, 0], x: [0, 12, 0], rotate: [-10, -3, -10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={getAssetPath("/images/autumn-leaves-overlay.png")} alt="" className="w-full h-full object-contain" />
        </motion.div>
        <motion.div
          className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rotate-[170deg] scale-x-[-1]"
          animate={{ y: [0, 26, 0], x: [0, -14, 0], rotate: [170, 178, 170] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={getAssetPath("/images/autumn-leaves-overlay.png")} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </div>
    </div>
  )
}

export function PresentationController({ children, totalSlides, onSlideChange }: PresentationControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [transitionStyle, setTransitionStyle] = useState<"slide" | "book">("slide")
  const [lastDirection, setLastDirection] = useState<1 | -1>(1)
  const [transitionOverride, setTransitionOverride] = useState<"fade" | "zoom" | "iris" | null>(null)
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const slideChildren = React.Children.toArray(children)

  const goToSlide = useCallback((index: number, direction?: 1 | -1) => {
    if (isAnimating || index < 0 || index >= totalSlides) return

    // Default direction logic if not provided
    const dir = direction || (index > currentSlide ? 1 : -1)

    setIsAnimating(true)
    setLastDirection(dir)
    setTransitionOverride(null)
    setCurrentSlide(index)
    onSlideChange?.(index)

    // Synchronize animation lock with motion duration
    setTimeout(() => {
      setIsAnimating(false)
    }, 1200)
  }, [isAnimating, totalSlides, onSlideChange, currentSlide])

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

  const toggleFullscreen = useCallback(() => {
    const element = containerRef.current
    if (!element) return

    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void element.requestFullscreen()
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        toggleFullscreen()
        return
      }

      const activeElement = document.activeElement
      if (activeElement?.tagName === "INPUT" || activeElement?.tagName === "TEXTAREA" || activeElement?.tagName === "SELECT") {
        return
      }

      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter" || e.key === "PageDown") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide, toggleFullscreen])

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 10,
      transition: {
        x: { type: "spring", stiffness: 200, damping: 25, mass: 0.5 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-25%" : "25%",
      opacity: 0,
      zIndex: 0,
      transition: {
        x: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.4 }
      }
    })
  }

  const fadeVariants: Variants = {
    enter: {
      opacity: 0,
      zIndex: 1,
    },
    center: {
      opacity: 1,
      zIndex: 10,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      zIndex: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const zoomVariants: Variants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.8 : 1.2,
      x: 0,
      opacity: 0,
      zIndex: 1,
    }),
    center: {
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 10,
      transition: {
        scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.9, ease: "easeInOut" }
      }
    },
    exit: (direction: number) => ({
      scale: direction > 0 ? 1.2 : 0.8,
      x: 0,
      opacity: 0,
      zIndex: 0,
      transition: {
        scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.8, ease: "easeInOut" }
      }
    })
  }

  const irisVariants: Variants = {
    enter: (direction: number) => ({
      clipPath: "circle(0% at 50% 50%)",
      transform: "scale(1.1)",
      zIndex: 50,
      opacity: 1,
    }),
    center: {
      clipPath: "circle(150% at 50% 50%)",
      transform: "scale(1)",
      zIndex: 50,
      opacity: 1,
      transition: {
        clipPath: { duration: 5, ease: [0.22, 1, 0.36, 1] },
        transform: { duration: 5, ease: "easeOut" },
        zIndex: { duration: 0 }
      }
    },
    exit: (direction: number) => ({
      clipPath: "circle(150% at 50% 50%)",
      transform: "scale(1)",
      zIndex: 0,
      opacity: 1,
      transition: {
        zIndex: { duration: 0 }
      }
    })
  }

  const bookVariants: Variants = {
    enter: (direction: number) => ({
      rotateY: 0,
      rotateZ: 0,
      skewY: 0,
      scale: 1,
      zIndex: 1,
      opacity: 1,
      transformOrigin: direction > 0 ? "left center" : "right center"
    }),
    center: {
      rotateY: 0,
      rotateZ: 0,
      skewY: 0,
      scale: 1,
      zIndex: 10,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -190 : 190,
      rotateX: direction > 0 ? 12 : -12,
      rotateZ: direction > 0 ? 15 : -15,
      skewY: direction > 0 ? 8 : -8,
      scale: 0.94,
      zIndex: 20,
      opacity: 0,
      transformOrigin: direction > 0 ? "left center" : "right center",
      transition: {
        rotateY: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        rotateX: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        rotateZ: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        skewY: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.6, delay: 0.2 }
      }
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={(e) => {
        if (e.defaultPrevented || isNavigatorOpen) return
        const width = window.innerWidth
        if (e.clientX < width * 0.3) prevSlide()
        else nextSlide()
      }}
      style={{ perspective: "1500px" }}
    >
      {/* Navigator Overlay */}
      <AnimatePresence>
        {isNavigatorOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 z-[100] h-full w-80 border-r border-white/10 bg-black/60 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Übersicht</h3>
                <button
                  onClick={() => setIsNavigatorOpen(false)}
                  className="rounded-full p-2 hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5 text-white/50" />
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goToSlide(i)
                      setIsNavigatorOpen(false)
                    }}
                    className={cn(
                      "group relative flex w-full items-center gap-4 rounded-lg p-3 text-left transition-all cursor-pointer",
                      currentSlide === i
                        ? "bg-gold/20 border border-gold/30"
                        : "hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <span className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs transition-colors",
                      currentSlide === i ? "bg-gold text-black" : "bg-white/10 text-white/40 group-hover:text-white/70"
                    )}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      currentSlide === i ? "text-gold" : "text-white/40 group-hover:text-white/70"
                    )}>
                      Slide {i + 1}
                    </span>
                    {currentSlide === i && (
                      <motion.div
                        layoutId="activeSlideIndicator"
                        className="absolute left-0 h-4 w-1 bg-gold rounded-r-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigator Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsNavigatorOpen(true)
        }}
        className="absolute left-8 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-4 text-white/50 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white cursor-pointer"
      >
        <LayoutTemplate className="h-6 w-6" />
      </button>

      {/* Global Paper Background (only for 'slide' mode since book needs it per-slide to flip) */}
      {transitionStyle === "slide" && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[#f4ebd0]" />
          <div className="absolute inset-0 opacity-100 mix-blend-multiply">
            <img src={getAssetPath("/images/paper-texture-torn.png")} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Leaves */}
          <div className="absolute inset-0 z-5 opacity-80 mix-blend-multiply">
            <motion.div
              className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rotate-[-10deg]"
              animate={{ y: [0, -24, 0], x: [0, 12, 0], rotate: [-10, -3, -10] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={getAssetPath("/images/autumn-leaves-overlay.png")} alt="" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div
              className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rotate-[170deg] scale-x-[-1]"
              animate={{ y: [0, 26, 0], x: [0, -14, 0], rotate: [170, 178, 170] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={getAssetPath("/images/autumn-leaves-overlay.png")} alt="" className="w-full h-full object-contain" />
            </motion.div>
          </div>
        </div>
      )}

      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={lastDirection} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={lastDirection}
            variants={
              transitionOverride === "zoom"
                ? zoomVariants
                : transitionOverride === "iris"
                  ? irisVariants
                  : transitionOverride === "fade"
                    ? fadeVariants
                    : (transitionStyle === "book" ? bookVariants : slideVariants)
            }
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
            style={{
              transformStyle: transitionOverride === "iris" ? "flat" : "preserve-3d",
              willChange: "transform",
            }}
          >
            {/* Front of the page */}
            <div
              className="absolute inset-0 h-full w-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                boxShadow: transitionStyle === "book" ? "0 0 50px rgba(0,0,0,0.15)" : "none"
              }}
            >
              {/* Individual Slide Background for Book mode (so it turns with the content) */}
              {transitionStyle === "book" && (
                <>
                  <SlideBackground />
                  {/* Spine Crease / Fold Shadow - now fades out gracefully */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: isAnimating ? 0 : 0.1 }}
                    className={cn(
                      "absolute inset-y-0 z-20 w-16 pointer-events-none",
                      lastDirection > 0 ? "left-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" : "right-0 bg-gradient-to-l from-black/25 via-black/10 to-transparent"
                    )}
                  />
                  {/* Dynamic surface highlight during turn - simulated curve */}
                  <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isAnimating ? { opacity: [0, 0.1, 0] } : { opacity: 0 }}
                    transition={{ duration: 1.8 }}
                    style={{
                      background: lastDirection > 0
                        ? "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)"
                        : "linear-gradient(-135deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)"
                    }}
                  />
                </>
              )}

              {React.isValidElement(slideChildren[currentSlide])
                ? React.cloneElement(slideChildren[currentSlide] as React.ReactElement<any>, {
                  isActive: true,
                  skipAnimations: transitionStyle === "book",
                  onNext: nextSlide,
                  onPrev: prevSlide,
                })
                : slideChildren[currentSlide]}
            </div>

            {/* Back of the page (Paper only) */}
            {transitionStyle === "book" && (
              <div
                className="absolute inset-0 h-full w-full bg-[#f4ebd0] shadow-2xl"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="absolute inset-0 opacity-100 mix-blend-multiply">
                  <img src={getAssetPath("/images/paper-texture-torn.png")} alt="" className="w-full h-full object-cover scale-x-[-1]" />
                </div>
                {/* Back side spine shadow */}
                <div
                  className={cn(
                    "absolute inset-y-0 z-10 w-20 pointer-events-none",
                    lastDirection > 0 ? "right-0 bg-gradient-to-l from-black/20 via-black/5 to-transparent" : "left-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent"
                  )}
                />
                {/* Back side sweeping shadow / curve illusion during turn */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isAnimating ? { opacity: [0, 0.15, 0] } : { opacity: 0 }}
                  transition={{ duration: 1.8 }}
                  style={{
                    background: lastDirection > 0
                      ? "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 20%, transparent 70%)"
                      : "linear-gradient(-135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 20%, transparent 70%)"
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Improved Shadow cast on the slide UNDERNEATH - now with smoother exit */}
        {transitionStyle === "book" && (
          <motion.div
            className="absolute inset-0 z-5 pointer-events-none"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={isAnimating ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
            transition={{
              duration: isAnimating ? 1.8 : 0.4,
              ease: "easeInOut"
            }}
            style={{
              background: lastDirection > 0
                ? "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 50%)"
                : "linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 50%)",
              transformOrigin: lastDirection > 0 ? "left center" : "right center"
            }}
          />
        )}
      </div>

      {/* Global UI Elements (Watermark, Progress, etc.) */}
      <div className="absolute bottom-8 right-8 z-50 hidden items-center gap-2 text-xs text-muted-foreground/40 md:flex">
        <span className="text-white/20 uppercase tracking-[0.2em] text-[10px] mr-2">Controls</span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">←</kbd>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">→</kbd>
        <span className="mx-1 text-white/20">/</span>
        <span className="text-white/40 uppercase tracking-widest font-sans text-[10px]">Click</span>
      </div>

      <div className="absolute top-0 left-0 z-50 w-full">
        <div className="h-1 w-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={false}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="px-10 py-3 flex justify-between items-center bg-transparent">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsNavigatorOpen(true)
            }}
            className="pointer-events-auto text-[10px] uppercase tracking-[0.5em] text-white/40 hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
          >
            <LayoutTemplate className="h-3 w-3" />
            Übersicht
          </button>

          <span className={cn(
            "text-[10px] uppercase tracking-[0.5em] transition-all duration-700 pointer-events-none",
            currentSlide === 0 ? "opacity-0" : "opacity-100",
            "text-white/40"
          )}>
            Presentation Template
          </span>
          {!isFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsNavigatorOpen(true)
              }}
              className="pointer-events-auto text-[clamp(0.75rem,0.5vw+0.6rem,1rem)] font-mono text-white/40 hover:text-gold transition-colors cursor-pointer"
            >
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </button>
          )}
        </div>
      </div>

      {!isFullscreen && (
        <div className="absolute bottom-8 left-8 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-white/70 backdrop-blur-sm">
          <span className="uppercase tracking-[0.2em] text-[10px] text-white/50">Transition</span>
          <select
            value={transitionStyle}
            onChange={(e) => setTransitionStyle(e.target.value as "slide" | "book")}
            className="bg-transparent text-white/80 text-xs uppercase tracking-[0.2em] outline-none cursor-pointer"
          >
            <option value="slide">Slide</option>
            <option value="book">Book</option>
          </select>
        </div>
      )}
    </div>
  )
}
