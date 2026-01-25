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
      videoRef.current.pause()
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  const handleClick = (event: React.MouseEvent) => {
    if (!videoRef.current || !isActive) return
    videoRef.current.play().catch(() => { })
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <section className="relative h-full w-full overflow-hidden bg-black" onClick={handleClick}>
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
