"use client"

import Image from "next/image"
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
    <section className="relative h-screen w-full bg-background overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl flex-col lg:flex-row">
        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-16 lg:px-20 lg:py-24">
          <div className="max-w-xl">
            {/* Label */}
            <p
              className={`mb-4 text-sm font-sans uppercase tracking-[0.25em] text-muted-foreground transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              Die Welt von Wildholz
            </p>

            {/* Heading */}
            <h2
              className={`mb-8 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
              style={{ transitionDelay: "400ms" }}
            >
              Ein Ort zum Ankommen
            </h2>

            {/* Description */}
            <p
              className={`text-lg leading-relaxed text-foreground/75 md:text-xl transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              style={{ transitionDelay: "700ms" }}
            >
              Wildholz ist eine moderne, emotionale Daily-Serie über Liebe, Familie und Neuanfänge.
              Ein Forsthof in den Bergen wird zum Mittelpunkt einer Gemeinschaft zwischen Tradition und Moderne.
            </p>

            {/* Decorative element */}
            <div
              className={`mt-10 flex items-center gap-4 transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="h-0.5 w-16 bg-gold/60 rounded-full" />
              <div className="h-0.5 w-8 bg-gold/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Visual Content */}
        <div className="relative flex-1 min-h-[40vh] lg:min-h-full">
          <div className={`absolute inset-0 transition-all duration-1000 ease-out ${mounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Image
              src="/images/wildholz-world-new.png"
              alt="Atmospheric forest light, wood textures, and rustic alpine buildings"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  )
}
