"use client"

import Image from "next/image"
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
    <section className="relative h-screen w-full bg-background overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl flex-col-reverse lg:flex-row">
        {/* Visual Content */}
        <div className="relative flex-1 min-h-[40vh] lg:min-h-full">
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-out ${mounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Image
              src="/images/wildholz-feeling-new.png"
              alt="Intimate moment in autumn nature with soft golden light"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/40 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent lg:hidden" />
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-16 lg:px-20 lg:py-24">
          <div className="max-w-xl">
            {/* Label */}
            <p
              className={`mb-4 text-sm font-sans uppercase tracking-[0.25em] text-muted-foreground transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Ton & Gefühl
            </p>

            {/* Heading */}
            <h2
              className={`mb-10 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                }`}
              style={{ transitionDelay: "400ms" }}
            >
              Warm. Sinnlich. Emotional.
            </h2>

            {/* Bullet Points with staggered animation */}
            <ul className="space-y-5">
              {bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    }`}
                  style={{ transitionDelay: `${700 + index * 150}ms` }}
                >
                  <span className={`mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold transition-transform duration-500 ${mounted ? "scale-100" : "scale-0"
                    }`}
                    style={{ transitionDelay: `${800 + index * 150}ms` }}
                  />
                  <span className="text-lg text-foreground/75 md:text-xl leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* End decoration */}
            <div
              className={`mt-12 flex items-center gap-3 transition-all duration-700 ease-out ${mounted ? "opacity-100" : "opacity-0"
                }`}
              style={{ transitionDelay: "1500ms" }}
            >
              <div className="h-px w-20 bg-forest/30" />
              <span className="text-sm text-muted-foreground/60 font-serif italic">Fin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
