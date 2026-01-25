"use client"

import Image from "next/image"
import { getAssetPath } from "@/lib/utils"

interface SlideProductionDataProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideProductionData({ isActive }: SlideProductionDataProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      <Image
        src={getAssetPath("/images/Produktionelle%20Eckdaten.png")}
        alt="Produktionelle Eckdaten"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
