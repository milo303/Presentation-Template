"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface SlideWorldProps {
  isActive?: boolean
}

export function SlideWorld({ isActive = true }: SlideWorldProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setMounted(true), 100)
      return () => clearTimeout(timer)
    } else {
      setMounted(false)
    }
  }, [isActive])

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
          src="/images/wildholz-world-new.png"
          alt="Atmospheric forest and mountains"
          fill
          className="object-cover"
          priority
        />
        {/* Cinematic color grade overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest/20 via-transparent to-warm-brown/10 mix-blend-overlay" />
      </motion.div>

      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 z-5 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">

            {/* Label */}
            <motion.p
              className="mb-6 text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-white/60"
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Die Welt von Wildholz
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="mb-8 font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[0.95]"
              initial={{ opacity: 0, y: 40 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Ein Ort zum <br />
              <span className="italic text-gold">Ankommen</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 max-w-xl font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Eine moderne, emotionale Daily-Serie über Liebe, Familie und Neuanfänge. Ein Forsthof in den Bergen – zwischen Tradition und Moderne.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={mounted ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            >
              <div className="h-[2px] w-16 bg-gold rounded-full" />
              <div className="h-[2px] w-8 bg-gold/50 rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-radial from-transparent to-black/30" />
    </section>
  )
}
