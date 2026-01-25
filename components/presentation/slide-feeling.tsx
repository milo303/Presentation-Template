"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getAssetPath } from "@/lib/utils"

interface SlideFeelingProps {
  isActive?: boolean
  skipAnimations?: boolean
}

export function SlideFeeling({ isActive = true, skipAnimations = false }: SlideFeelingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (skipAnimations) {
      setMounted(true)
      return
    }
    if (isActive) {
      const timer = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(timer)
    } else {
      setMounted(false)
    }
  }, [isActive, skipAnimations])

  const show = skipAnimations || mounted
  const noTransition = { duration: 0 }

  return (
    <section className="relative h-full w-full overflow-hidden">
      {/* Full-bleed Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={skipAnimations ? false : { scale: 1.1, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
        transition={skipAnimations ? noTransition : { duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={getAssetPath("/images/wildholz-feeling-new.png")}
          alt="Waldstimmung Hintergrund"
          fill
          className="object-cover"
          priority
        />
        {/* Warm color grade */}
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-900/20 via-transparent to-forest/10 mix-blend-overlay" />
      </motion.div>

      {/* Dark gradient for text legibility - from right side */}
      <div className="absolute inset-0 z-5 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Content Container - Right aligned */}
      <div className="relative z-20 h-full flex items-center justify-end">
        <div className="w-full max-w-[1600px] mx-auto px-24 flex justify-end">
          <div className="max-w-2xl text-right">

            {/* Label */}
            <motion.p
              className="mb-8 text-[clamp(0.75rem,0.55vw+0.55rem,0.95rem)] font-sans uppercase tracking-[0.3em] text-white/60 font-medium opacity-80"
              initial={skipAnimations ? false : { opacity: 0, y: 24, x: -6, scale: 0.98 }}
              animate={show ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 24, x: -6, scale: 0.98 }}
              transition={skipAnimations ? noTransition : { type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
            >
              WIE SICH WILDHOLZ ANFÜHLT
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="mb-14 font-serif text-[clamp(2.6rem,2.6vw+1.4rem,4.1rem)] font-medium tracking-tight text-white leading-[1.1]"
              initial={skipAnimations ? false : { opacity: 0, y: 44, x: -8, scale: 0.97 }}
              animate={show ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 44, x: -8, scale: 0.97 }}
              transition={skipAnimations ? noTransition : { type: "spring", stiffness: 110, damping: 20, delay: 0.5 }}
            >
              <span className="text-gold italic">Warm.</span> <br className="hidden md:block" />
              Sinnlich. <br className="hidden md:block" />
              Emotional.
            </motion.h2>

            <motion.div
              className="text-[clamp(1.05rem,1vw+0.7rem,1.45rem)] text-white/80 font-light leading-relaxed space-y-8"
              initial={skipAnimations ? false : { opacity: 0, y: 30, x: -6, scale: 0.98 }}
              animate={show ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 30, x: -6, scale: 0.98 }}
              transition={skipAnimations ? noTransition : { type: "spring", stiffness: 105, damping: 20, delay: 0.8 }}
            >
              <p className="italic">
                „Wald statt WLAN,<br />Humor statt Homeoffice."
              </p>
              <p className="text-[clamp(1.05rem,1vw+0.7rem,1.45rem)] leading-relaxed text-white/80 font-light">
                WILDHOLZ ist traditionell und modern zugleich: Handwerk, Nachhaltigkeit und
                Digitalisierung; Stadt- und Landleben; Sehnsucht nach Gemeinschaft in einer immer
                mehr individualisierten Gesellschaft.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 text-[clamp(1.05rem,1vw+0.7rem,1.45rem)] text-white/80 font-light leading-relaxed text-right"
              initial={skipAnimations ? false : { opacity: 0, y: 24, x: -6, scale: 0.98 }}
              animate={show ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 24, x: -6, scale: 0.98 }}
              transition={skipAnimations ? noTransition : { type: "spring", stiffness: 105, damping: 20, delay: 1.1 }}
            >
              <p className="font-serif text-white/70">Genre & Haltung:</p>
              <p>Liebes- und Familiengeschichte</p>
              <p>Modern-romantisch mit komödiantischen Elementen</p>
            </motion.div>


            {/* End decoration */}
            <motion.div
              className="mt-14 flex items-center justify-end gap-4"
              initial={skipAnimations ? false : { opacity: 0, y: 6, scale: 0.98 }}
              animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.98 }}
              transition={skipAnimations ? noTransition : { type: "spring", stiffness: 120, damping: 18, delay: 1.6 }}
            >
              <span className="text-sm text-white/40 font-serif italic tracking-wide">Fin</span>
              <div className="h-[1px] w-16 bg-gold/50" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-radial from-transparent to-black/30" />
    </section>
  )
}
