"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface SlideTitleProps {
  isActive?: boolean
}

export function SlideTitle({ isActive = true }: SlideTitleProps) {
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
    <section className="relative h-screen w-full flex flex-col overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-transform duration-[12000ms] ease-out ${mounted ? "scale-110" : "scale-100"
          }`}>
          <Image
            src="/images/wildholz-background-new.png"
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
        className={`absolute bottom-0 right-0 md:right-4 lg:right-8 z-10 transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
          }`}
        style={{ transitionDelay: "600ms" }}
      >
        <div className="relative h-[115vh] md:h-[125vh] lg:h-[135vh] w-[70vw] md:w-[75vw] lg:w-[85vw]">
          <Image
            src="/images/wildholz-couple-new.png"
            alt="Romantic couple embracing"
            fill
            className="object-contain object-bottom drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] mix-blend-multiply"
            priority
          />
        </div>
      </div>

      {/* Content - Left aligned */}
      <div className="relative z-20 flex flex-1 flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          {/* Subtitle */}
          <p
            className={`mb-4 text-sm font-sans uppercase tracking-[0.25em] text-white/70 md:text-base transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            Konzept fur eine Mediathek-Serie
          </p>

          {/* Main Title */}
          <h1
            className={`mb-6 font-serif text-6xl font-medium tracking-tight text-white md:text-7xl lg:text-9xl xl:text-[10rem] transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            Wildholz
          </h1>

          {/* Tagline */}
          <p
            className={`max-w-xl font-serif text-xl italic text-white/85 md:text-2xl lg:text-3xl transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "700ms" }}
          >
            „Während du schliefst" trifft auf „Virgin River"
          </p>

          {/* Integration of Logos */}
          <div
            className={`mt-16 flex items-center gap-10 transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <div className="relative h-10 w-32 transition-transform hover:scale-105 duration-300">
              <Image
                src="/images/logo-degeto.png"
                alt="ARD Degeto Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-10 w-16 transition-transform hover:scale-105 duration-300">
              <Image
                src="/images/logo-ufa.png"
                alt="UFA Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Subtle CTA hint */}
          <div
            className={`mt-16 flex items-center gap-3 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: "1400ms" }}
          >
            <div className="h-px w-12 bg-white/40" />
            <span className="text-sm font-sans text-white/50 tracking-wide">Weiter mit Pfeiltasten</span>
          </div>
        </div>
      </div>
    </section>
  )
}
