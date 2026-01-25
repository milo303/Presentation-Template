"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideLedBackgroundsProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideLedBackgrounds({ isActive }: SlideLedBackgroundsProps) {
  const images = [
    "/LED%20Hintergruende/1.jpg",
    "/LED%20Hintergruende/2.jpg",
    "/LED%20Hintergruende/3.jpg",
    "/LED%20Hintergruende/4.jpg",
    "/LED%20Hintergruende/5.jpg",
    "/LED%20Hintergruende/6.jpg",
    "/LED%20Hintergruende/7.jpg",
  ]
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setImageIndex(0)
    }
  }, [isActive])

  const handleClick = (event: React.MouseEvent | React.PointerEvent) => {
    if (!isActive) return
    event.preventDefault()
    event.stopPropagation()
    setImageIndex((current) => (current + 1) % images.length)
  }

  return (
    <section
      className="relative h-full w-full overflow-hidden bg-black"
      onPointerDownCapture={handleClick}
      onClickCapture={handleClick}
      onClick={handleClick}
    >
      <Image
        src={getAssetPath(images[imageIndex])}
        alt="LED Hintergrund"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
