"use client"

import { useEffect, useRef } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideLedVideoProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideLedVideo({ isActive }: SlideLedVideoProps) {
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
        src={getAssetPath("/clips/LED%20Video%20V3.mp4")}
        autoPlay={false}
        playsInline
      />
    </section>
  )
}
