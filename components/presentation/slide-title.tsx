"use client"

import Image from "next/image"
import { getAssetPath } from "@/lib/utils"
import { useEffect, useState } from "react"

interface SlideTitleProps {
  isActive?: boolean
  skipAnimations?: boolean
}

export function SlideTitle({ isActive = true, skipAnimations = false }: SlideTitleProps) {
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

  // Force mounted true if skipAnimations
  const show = skipAnimations || mounted

  return (
    <section className="relative h-full w-full flex flex-col overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${skipAnimations ? "" : "transition-transform duration-[12000ms] ease-out"} ${show ? "scale-110" : "scale-100"
          }`}>
          <Image
            src={getAssetPath("/images/wildholz-background-new.png")}
            alt="Autumn mountain landscape with golden foliage"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Couple Image - positioned on right side with transparent background (simulated via multiply) */}
      <div
        className={`absolute bottom-0 right-0 md:right-4 lg:right-8 z-10 ${skipAnimations ? "" : "transition-all duration-1000 ease-out"} ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
          }`}
        style={{ transitionDelay: skipAnimations ? "0ms" : "600ms" }}
      >
        <div className="relative h-[135vh] w-[85vw]">
          <Image
            src={getAssetPath("/images/wildholz-couple-new.png")}
            alt="Romantic couple embracing"
            fill
            className="object-contain object-bottom drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] mix-blend-multiply"
            priority
          />
        </div>
      </div>

      {/* Content - Left aligned */}
      <div className="relative z-20 flex flex-1 flex-col justify-center px-24">
        <div className="max-w-4xl">
          {/* Subtitle */}
          <p
            className={`mb-6 text-[clamp(0.95rem,0.7vw+0.6rem,1.2rem)] font-sans uppercase tracking-[0.3em] text-white/80 ${skipAnimations ? "" : "transition-all duration-700 ease-out"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: skipAnimations ? "0ms" : "200ms" }}
          >
            Konzept fur eine Mediathek-Serie
          </p>

          {/* Main Title (Logo Schriftzug) */}
          <div
            className={`mb-12 ${skipAnimations ? "" : "transition-all duration-1000 ease-out"} ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
              }`}
            style={{ transitionDelay: skipAnimations ? "0ms" : "400ms" }}
          >
            <div className="relative w-[clamp(560px,42vw,880px)] h-[clamp(180px,18vw,280px)]">
              <Image
                src={getAssetPath("/images/wildholz-logo.png")}
                alt="Wildholz"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Tagline */}
          <p
            className={`max-w-2xl font-serif text-[clamp(1.8rem,1.6vw+1.1rem,2.6rem)] italic text-white/95 leading-tight ${skipAnimations ? "" : "transition-all duration-700 ease-out"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: skipAnimations ? "0ms" : "700ms" }}
          >
            „Während du schliefst" trifft auf „Virgin River"
          </p>

          {/* Integration of Logos */}
          <div
            className={`mt-14 flex items-center gap-14 ${skipAnimations ? "" : "transition-all duration-1000 ease-out"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: skipAnimations ? "0ms" : "1000ms" }}
          >
            <div className="relative h-14 w-44 transition-transform hover:scale-105 duration-300 shadow-sm">
              <Image
                src={getAssetPath("/images/logo-degeto.png")}
                alt="ARD Degeto Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-14 w-24 transition-transform hover:scale-105 duration-300 shadow-sm">
              <Image
                src={getAssetPath("/images/logo-ufa.png")}
                alt="UFA Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Subtle CTA hint */}
          <div
            className={`mt-12 flex items-center gap-3 ${skipAnimations ? "" : "transition-all duration-700 ease-out"} ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: skipAnimations ? "0ms" : "1400ms" }}
          >
            <div className="h-px w-12 bg-white/40" />
            <span className="text-[clamp(0.85rem,0.4vw+0.7rem,1rem)] font-sans text-white/55 tracking-wide">Weiter mit Pfeiltasten oder Klick</span>
          </div>
        </div>
      </div>
    </section>
  )
}
