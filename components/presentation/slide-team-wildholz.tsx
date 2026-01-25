"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideTeamWildholzProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideTeamWildholz({ isActive }: SlideTeamWildholzProps) {
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

  const triggerPlayback = useCallback(() => {
    if (!videoRef.current || !isActive || hasPlayed) return false
    videoRef.current.play().catch(() => { })
    return true
  }, [isActive, hasPlayed])

  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "Enter", "PageDown"].includes(event.key)) {
        if (triggerPlayback()) {
          event.preventDefault()
          event.stopPropagation()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown, { capture: true })
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true })
  }, [isActive, triggerPlayback])

  const handleClick = (event: React.MouseEvent) => {
    if (triggerPlayback()) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const handleEnded = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = videoRef.current.duration
    videoRef.current.pause()
    setHasPlayed(true)
  }

  return (
    <section className="relative h-full w-full overflow-hidden bg-black" onClick={handleClick}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={getAssetPath("/animation/Team%20Wildholz%20v3.mp4")}
        autoPlay={false}
        muted
        playsInline
        onEnded={handleEnded}
      />
    </section>
  )
}
