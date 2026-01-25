"use client"

import { getAssetPath } from "@/lib/utils"

interface SlideProductionDataProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideProductionData({ isActive }: SlideProductionDataProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-white">
      <iframe
        title="Produktionelle Eckdaten"
        src={getAssetPath("/Slide/Produktionelle%20Eckdaten%20.pdf")}
        className="absolute inset-0 h-full w-full"
      />
    </section>
  )
}
