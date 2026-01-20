"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SlideFeelingProps {
  isActive?: boolean
}

export function SlideFeeling({ isActive = true }: SlideFeelingProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(timer)
    } else {
      setMounted(false)
    }
  }, [isActive])

  const bulletPoints = [
    "Liebes- und Familiengeschichte im Licht des Waldes",
    "Eskapismus ohne Kitsch",
    "Figuren mit Tiefe, Wärme und Konflikten",
    "Ein ruhiger Gegenpol zur lauten digitalen Welt",
  ]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={mounted ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/wildholz-feeling-new.png"
          alt="Intimate autumn forest moment"
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
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex justify-end">
          <div className="max-w-2xl text-right">

            {/* Label */}
            <motion.p
              className="mb-6 text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Ton & Gefühl
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="mb-12 font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[0.95]"
              initial={{ opacity: 0, y: 40 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gold italic">Warm.</span> <br className="hidden md:block" />
              Sinnlich. <br className="hidden md:block" />
              Emotional.
            </motion.h2>

            {/* Bullet Points */}
            <ul className="space-y-4 md:space-y-5">
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-start justify-end gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.7, delay: 0.8 + index * 0.15, ease: "easeOut" }}
                >
                  <span className="text-base md:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
                    {point}
                  </span>
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                </motion.li>
              ))}
            </ul>

            {/* End decoration */}
            <motion.div
              className="mt-14 flex items-center justify-end gap-4"
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
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
