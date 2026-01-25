"use client"

import { useEffect, useRef } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideTeamWildholzProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideTeamWildholz({ isActive }: SlideTeamWildholzProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
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
        src={getAssetPath("/animation/Team%20Wildholz.mp4")}
        autoPlay={false}
        muted
        playsInline
      />
    </section>
  )
}
