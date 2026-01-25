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
    "/LED Hintergründe/1.jpg",
    "/LED Hintergründe/2.jpg",
    "/LED Hintergründe/3.jpg",
    "/LED Hintergründe/4.jpg",
    "/LED Hintergründe/5.jpg",
    "/LED Hintergründe/6.jpg",
    "/LED Hintergründe/7.jpg",
  ]
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setImageIndex(0)
    }
  }, [isActive])

  const handleClick = (event: React.MouseEvent) => {
    if (!isActive) return
    event.preventDefault()
    event.stopPropagation()
    setImageIndex((current) => (current + 1) % images.length)
  }

  return (
    <section
      className="relative h-full w-full overflow-hidden bg-black"
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
