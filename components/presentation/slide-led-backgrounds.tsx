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
    "/LED%20Hintergru%CC%88nde/1.jpg",
    "/LED%20Hintergru%CC%88nde/2.jpg",
    "/LED%20Hintergru%CC%88nde/3.jpg",
    "/LED%20Hintergru%CC%88nde/4.jpg",
    "/LED%20Hintergru%CC%88nde/5.jpg",
    "/LED%20Hintergru%CC%88nde/6.jpg",
    "/LED%20Hintergru%CC%88nde/7.jpg",
  ]
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setImageIndex(0)
    }
  }, [isActive])

  const handleClick = () => {
    if (!isActive) return
    setImageIndex((current) => (current + 1) % images.length)
  }

  return (
    <section className="relative h-full w-full overflow-hidden bg-black" onClick={handleClick}>
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
