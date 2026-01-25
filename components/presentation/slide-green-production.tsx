"use client"

import { useEffect, useRef, useState } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideGreenProductionProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideGreenProduction({ isActive }: SlideGreenProductionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.pause()
      setHasPlayed(false)
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  const handleClick = (event: React.MouseEvent | React.PointerEvent) => {
    if (!videoRef.current || hasPlayed) return
    videoRef.current.muted = false
    videoRef.current.play().catch(() => { })
    event.preventDefault()
    event.stopPropagation()
  }

  const handleEnded = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = videoRef.current.duration
    videoRef.current.pause()
    setHasPlayed(true)
  }

  return (
    <section
      className="relative h-full w-full overflow-hidden bg-black"
      onPointerDownCapture={handleClick}
      onClickCapture={handleClick}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={getAssetPath("/animation/Green%20Production.mp4")}
        autoPlay={false}
        playsInline
        onEnded={handleEnded}
      />
    </section>
  )
}
