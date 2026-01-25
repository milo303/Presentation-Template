"use client"

import { useEffect, useRef } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideVideoClipProps {
  isActive: boolean
  skipAnimations?: boolean
  src: string
  title: string
}

export function SlideVideoClip({ isActive, src, title }: SlideVideoClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.muted = false
      videoRef.current.play().catch(() => { })
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={getAssetPath(src)}
        autoPlay={false}
        playsInline
        aria-label={title}
      />
    </section>
  )
}
