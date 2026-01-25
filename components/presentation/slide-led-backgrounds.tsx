"use client"

import Image from "next/image"
import { getAssetPath } from "@/lib/utils"

interface SlideLedBackgroundsProps {
  isActive: boolean
  skipAnimations?: boolean
  images: string[]
}

export function SlideLedBackgrounds({ isActive, images }: SlideLedBackgroundsProps) {

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-6">
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
