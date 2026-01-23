"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { getAssetPath } from "@/lib/utils"

interface SlideKomparsenProps {
  isActive: boolean
  skipAnimations?: boolean
}

export function SlideKomparsen({ isActive, skipAnimations }: SlideKomparsenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasEnded, setHasEnded] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
      setHasEnded(false)
    } else {
      videoRef.current.pause()
    }
  }, [isActive])

  const handleEnded = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = videoRef.current.duration
    videoRef.current.pause()
    setHasEnded(true)
  }

  return (
    <section className="relative h-full w-full overflow-hidden bg-black">
      {/* Fullscreen Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={getAssetPath("/images/hf_20260122_154804_b77bf969-4e16-4887-8857-7459813fdc17.mp4")}
        autoPlay={false}
        muted
        playsInline
        onEnded={handleEnded}
      />

      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Text Content with smooth staggered animations */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-end px-16 pb-20"
        initial={skipAnimations ? false : { opacity: 0 }}
        animate={skipAnimations ? { opacity: 1 } : (isActive ? { opacity: 1 } : { opacity: 0 })}
        transition={skipAnimations ? { duration: 0 } : { duration: 1.2, delay: 0.5 }}
      >
        {/* Label */}
        <motion.p
          className="mb-4 text-[clamp(0.75rem,0.55vw+0.55rem,0.95rem)] font-sans uppercase tracking-[0.3em] text-white/70 font-medium"
          initial={skipAnimations ? false : { opacity: 0, y: 20 }}
          animate={skipAnimations ? { opacity: 1, y: 0 } : (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
          transition={skipAnimations ? { duration: 0 } : { duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          Mitmach-Aktion
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="mb-6 font-serif text-[clamp(2.6rem,2.6vw+1.4rem,4.1rem)] font-medium tracking-tight leading-[1.1] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          initial={skipAnimations ? false : { opacity: 0, y: 30 }}
          animate={skipAnimations ? { opacity: 1, y: 0 } : (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
          transition={skipAnimations ? { duration: 0 } : { duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Ihre Gesichter,<br />unsere Geschichte
        </motion.h2>

        {/* Body text */}
        <motion.p
          className="max-w-2xl text-[clamp(1.05rem,1vw+0.7rem,1.45rem)] leading-relaxed font-light text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          initial={skipAnimations ? false : { opacity: 0, y: 20 }}
          animate={skipAnimations ? { opacity: 1, y: 0 } : (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
          transition={skipAnimations ? { duration: 0 } : { duration: 1.0, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Über eine Mitmach-Aktion werden echte Gesichter von Zuschauern Teil der Serie – und schaffen eine einzigartige Verbindung zwischen Publikum und Erzählung.
        </motion.p>
      </motion.div>

      {/* Fade-in from black on slide entry */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-30"
        initial={skipAnimations ? { opacity: 0 } : { opacity: 1 }}
        animate={skipAnimations ? { opacity: 0 } : { opacity: isActive ? 0 : 1 }}
        transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  )
}
