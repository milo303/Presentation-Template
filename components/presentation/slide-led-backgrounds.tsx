"use client"

import Image from "next/image"
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

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-6">
        {images.map((src, index) => (
          <div key={src} className="relative h-full min-h-[140px] w-full overflow-hidden">
            <Image
              src={getAssetPath(src)}
              alt={`LED Hintergrund ${index + 1}`}
              fill
              className="object-cover"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
