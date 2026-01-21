"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SlideAtmosphereProps {
  isActive?: boolean
  onNext?: () => void
  onPrev?: () => void
}

// Configurable sequence: images with video transitions between them
// To swap or extend assets, simply modify this array
const SEQUENCE = {
  images: [
    '/images/wilholzBox-1.png',
    '/images/wilholzBox-2.png',
    '/images/wilholzBox-3.png',
  ],
  // Videos that play BETWEEN images (transitions[i] plays between images[i] and images[i+1])
  transitions: [
    '/images/Video-1.mp4',
    '/images/Video-2.mp4',
  ],
}

// Text content for each stage
const TEXT_CONTENT = [
  {
    title: "Wildholz in deiner Stadt",
    description: "Wildholz zum Anfassen, nicht zum Scrollen. Ein analoger Zufluchtsort im urbanen Raum."
  },
  {
    title: "Waldwürfel zum Durchatmen",
    description: "Holz, Moos und Tannenduft statt Screen und Technik. Ein Ort zum Anlehnen und Rausfallen."
  },
  {
    title: "Analoge Markenwelt",
    description: "Über Social Media hinaus in den realen Stadtraum. Die Stimmung von Wildholz, physisch erlebbar."
  }
]

type MediaState =
  | { type: 'image'; index: number }
  | { type: 'video'; index: number; direction: 'forward' | 'backward' }

export function SlideAtmosphere({ isActive = false, onNext, onPrev }: SlideAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastActionTime = useRef(0)

  const [mediaState, setMediaState] = useState<MediaState>({ type: 'image', index: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isBlending, setIsBlending] = useState(false)

  // Reset video playing state when media state changes
  useEffect(() => {
    setIsVideoPlaying(false)
  }, [mediaState])

  const totalImages = SEQUENCE.images.length

  // Get current image index for indicator dots
  const currentImageIndex = mediaState.type === 'image'
    ? mediaState.index
    : mediaState.direction === 'forward'
      ? mediaState.index + 1
      : mediaState.index

  const goForward = useCallback(() => {
    const now = Date.now()
    if (now - lastActionTime.current < 200 || isTransitioning) return
    lastActionTime.current = now

    if (mediaState.type === 'image') {
      const currentIndex = mediaState.index
      if (currentIndex < totalImages - 1) {
        // Start video transition to next image
        setIsTransitioning(true)
        setMediaState({ type: 'video', index: currentIndex, direction: 'forward' })
      } else {
        // At last image, proceed to next slide
        if (onNext) onNext()
      }
    }
  }, [mediaState, totalImages, onNext, isTransitioning])

  const goBackward = useCallback(() => {
    const now = Date.now()
    if (now - lastActionTime.current < 200 || isTransitioning) return
    lastActionTime.current = now

    if (mediaState.type === 'image') {
      const currentIndex = mediaState.index
      if (currentIndex > 0) {
        // Skip video, go directly to previous image
        setMediaState({ type: 'image', index: currentIndex - 1 })
      } else {
        // At first image, go to previous slide
        if (onPrev) onPrev()
      }
    }
  }, [mediaState, onPrev, isTransitioning])

  // Handle video end - advance to next image after a blend period
  const handleVideoEnded = useCallback(() => {
    if (mediaState.type === 'video') {
      setIsBlending(true)

      const nextImageIndex = mediaState.direction === 'forward'
        ? mediaState.index + 1
        : mediaState.index

      // Wait for the fade-out to complete before switching states
      setTimeout(() => {
        setMediaState({ type: 'image', index: nextImageIndex })
        setIsTransitioning(false)
        setIsBlending(false)
      }, 600)
    }
  }, [mediaState])

  // Start video playback when transitioning
  useEffect(() => {
    if (mediaState.type === 'video' && videoRef.current) {
      videoRef.current.playbackRate = 8.0 // Fast playback
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(console.error)
    }
  }, [mediaState])

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault()
        e.stopPropagation()
        goForward()
      } else if (["ArrowLeft", "ArrowUp", "Backspace"].includes(e.key)) {
        e.preventDefault()
        e.stopPropagation()
        goBackward()
      }
    }
    window.addEventListener("keydown", handleKeyDown, { capture: true })
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true })
  }, [isActive, goForward, goBackward])

  // Wheel navigation
  useEffect(() => {
    if (!isActive) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.deltaY > 20) goForward()
      else if (e.deltaY < -20) goBackward()
    }
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true })
    return () => window.removeEventListener("wheel", handleWheel, { capture: true })
  }, [isActive, goForward, goBackward])

  // Reset to first image when slide becomes inactive
  useEffect(() => {
    if (!isActive) {
      const timer = setTimeout(() => {
        setMediaState({ type: 'image', index: 0 })
        setIsTransitioning(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  // Helper to determine if an image should be visible
  const isImageVisible = (idx: number) => {
    // If currently showing this static image
    if (mediaState.type === 'image' && mediaState.index === idx) return true

    // If transitioning
    if (mediaState.type === 'video') {
      const sourceIndex = mediaState.index
      const targetIndex = mediaState.direction === 'forward'
        ? mediaState.index + 1
        : mediaState.index

      // During blending (fade-out), only the target image should be visible underneath
      if (isBlending) {
        return idx === targetIndex
      }

      // During playback, show both (source is covered by video, target is ready underneath)
      return idx === sourceIndex || idx === targetIndex
    }

    return false
  }

  // Helper for z-index during transition
  const getImageZIndex = (idx: number) => {
    if (mediaState.type === 'image') return 10

    if (mediaState.type === 'video') {
      const sourceIndex = mediaState.index
      const targetIndex = mediaState.direction === 'forward'
        ? mediaState.index + 1
        : mediaState.index

      // During blending, target image stays at mid-level while video fades over it
      if (isBlending) {
        if (idx === targetIndex) return 10
        return 1
      }

      // Source on top of Target, so video covers Source -> Source disappears -> Target revealed
      if (idx === sourceIndex) return 10
      if (idx === targetIndex) return 5
    }

    return 1
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* Still Images Layer */}
      {SEQUENCE.images.map((src, idx) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: isImageVisible(idx) ? 1 : 0,
            zIndex: getImageZIndex(idx),
          }}
        >
          <Image
            src={src}
            alt={`Scene ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx <= 1} // Preload first two
          />
        </div>
      ))}

      {/* Video Transition Layer */}
      {mediaState.type === 'video' && (
        <div className="absolute inset-0 z-20">
          <video
            ref={videoRef}
            src={SEQUENCE.transitions[mediaState.index]}
            className={`w-full h-full object-cover transition-opacity ease-in-out ${isBlending ? 'duration-600 opacity-0' : 'duration-150'
              }`}
            style={{ opacity: isBlending ? 0 : (isVideoPlaying ? 1 : 0) }}
            muted
            playsInline
            onEnded={handleVideoEnded}
            onPlaying={() => setIsVideoPlaying(true)}
          />
        </div>
      )}

      {/* Preload videos */}
      <div className="hidden">
        {SEQUENCE.transitions.map((src) => (
          <video key={src} src={src} preload="auto" muted />
        ))}
      </div>

      {/* Text Overlay Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none flex items-end pb-24">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl border-l-[2px] border-amber-400 pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mb-4 text-xs md:text-sm font-sans uppercase tracking-[0.4em] text-white/50">
                  Konzept: Pop-up Store
                </p>
                <h2 className="mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]">
                  {TEXT_CONTENT[currentImageIndex]?.title}
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-white/70 max-w-xl font-light">
                  {TEXT_CONTENT[currentImageIndex]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cinematic gradient overlay for legibility */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        {/* Bottom-to-top gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Indicator Dots */}
      <div className="absolute top-1/2 -translate-y-1/2 right-8 z-50 flex flex-col gap-6">
        {SEQUENCE.images.map((_, i) => (
          <div
            key={i}
            className={`w-1 h-8 rounded-full transition-all duration-500 ${currentImageIndex === i
              ? 'bg-amber-400 scale-x-150'
              : 'bg-white/30'
              }`}
          />
        ))}
      </div>

    </section>
  )
}
