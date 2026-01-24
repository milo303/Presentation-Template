"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, Variants, Transition } from "framer-motion"
import Image from "next/image"
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
  const containerRef = useRef<HTMLDivElement>(null)

  const slideChildren = React.Children.toArray(children)

  const goToSlide = useCallback((index: number, direction: 1 | -1) => {
    if (isAnimating || index < 0 || index >= totalSlides) return

    // Custom transitions for specific slides
    // Zoom for index 1 <-> 2 (Video <-> Question)
    const useZoom = (currentSlide === 1 && index === 2) || (currentSlide === 2 && index === 1)

    // Iris Wipe for index 2 <-> 3 (Question <-> Producers Note)
    const useIris = (currentSlide === 2 && index === 3) || (currentSlide === 3 && index === 2)

    setIsAnimating(true)
    setLastDirection(direction)

    if (useZoom) setTransitionOverride("zoom")
    else if (useIris) setTransitionOverride("iris")
    else setTransitionOverride(null)

    setCurrentSlide(index)
    onSlideChange?.(index)

    // Synchronize animation lock with motion duration (Iris: 1.5s, Zoom: 1.4s, Book: 1.8s)
    let lockDuration = 1800
    if (useZoom) lockDuration = 1400
    if (useIris) lockDuration = 1500

    setTimeout(() => {
      setIsAnimating(false)
      setTransitionOverride(null)
    }, lockDuration)
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
      transform: "scale(1.1)", // Slight zoom start
      zIndex: 50, // Force highest Z
      opacity: 1,
    }),
    center: {
      clipPath: "circle(150% at 50% 50%)",
      transform: "scale(1)",
      zIndex: 50,
      opacity: 1,
      transition: {
        clipPath: { duration: 1.5, ease: [0.25, 1, 0.5, 1] },
        transform: { duration: 1.5, ease: "easeOut" },
        zIndex: { duration: 0 }
      }
    },
    exit: (direction: number) => ({
      clipPath: "circle(150% at 50% 50%)",
      transform: "scale(1)",
      zIndex: 0, // Drop behind
      opacity: 1, // Stay visible until covered
      transition: {
        // Stay mostly static while being covered, maybe slight darken?
        zIndex: { duration: 0 }
      }
    })
  }

  // Enhanced Book Page Flip Variants - simulating curvature and paper flexibility
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
      // Simulating a diagonal pull from the top corner to the bottom opposite
      // Slightly over-rotating (190) to ensure the edge fully clears the viewport
      rotateY: direction > 0 ? -190 : 190,
      rotateX: direction > 0 ? 12 : -12,
      rotateZ: direction > 0 ? 15 : -15,
      skewY: direction > 0 ? 8 : -8,
      scale: 0.94, // Slightly smaller to pull the edges away from the frame
      zIndex: 20,
      opacity: 0, // Proactively fade out
      transformOrigin: direction > 0 ? "left center" : "right center",
      transition: {
        rotateY: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        rotateX: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        rotateZ: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        skewY: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.6, delay: 0.2 } // Start fading almost immediately
      }
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      onClick={(e) => {
        if (e.defaultPrevented) return
        const width = window.innerWidth
        if (e.clientX < width * 0.3) prevSlide()
        else nextSlide()
      }}
      style={{ perspective: "1500px" }}
    >
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
              transformStyle: transitionOverride === "iris" ? "flat" : "preserve-3d", // Disable 3D for clip-path
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
      <AnimatePresence>
        {currentSlide !== 0 && (
          <motion.div
            className="absolute top-10 left-10 z-[60] pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className={cn(
              "relative w-40 h-10 transition-all duration-700",
              [6, 11, 14].includes(currentSlide) ? "brightness-0 invert" : "opacity-60 grayscale brightness-0"
            )}>
              <Image src={getAssetPath("/images/wildholz-logo.png")} alt="Wildholz" fill className="object-contain object-left" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 right-8 z-50 hidden items-center gap-2 text-xs text-muted-foreground/40 md:flex">
        <span className="text-white/20 uppercase tracking-[0.2em] text-[10px] mr-2">Steuerung</span>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">←</kbd>
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-white/50">→</kbd>
        <span className="mx-1 text-white/20">/</span>
        <span className="text-white/40 uppercase tracking-widest font-sans text-[10px]">Klick</span>
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
        <div className="px-10 py-3 flex justify-between items-center bg-transparent pointer-events-none">
          <span className={cn(
            "text-[10px] uppercase tracking-[0.5em] transition-all duration-700",
            currentSlide === 0 ? "opacity-0" : "opacity-100",
            [6, 11, 14].includes(currentSlide) ? "text-white/40" : "text-[#5C4033]/40"
          )}>
            Wildholz — Pitch Deck 2026
          </span>
          {!isFullscreen && (
            <span className={cn(
              "text-[clamp(0.75rem,0.5vw+0.6rem,1rem)] font-mono transition-colors duration-700",
              [0, 6, 11, 14].includes(currentSlide) ? "text-white/40" : "text-[#5C4033]/40"
            )}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
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
