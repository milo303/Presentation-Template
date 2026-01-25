"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { getAssetPath } from "@/lib/utils"

interface SlideProductionProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideProduction({ isActive, skipAnimations }: SlideProductionProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [hasEnded, setHasEnded] = useState(false)

    useEffect(() => {
        if (!videoRef.current) return

        if (isActive) {
            videoRef.current.currentTime = 0
            videoRef.current.muted = false
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
                playsInline
                onEnded={handleEnded}
            />

            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Text Content with smooth staggered animations */}
            <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-end px-16 pb-20"
                initial={skipAnimations ? false : { opacity: 0 }}
                animate={skipAnimations ? { opacity: 1 } : (isActive ? { opacity: 1 } : { opacity: 0 })}
                transition={skipAnimations ? { duration: 0 } : { duration: 1.2, delay: 0.3 }}
            >
                {/* Label */}
                <motion.p
                    className="mb-4 text-[clamp(0.75rem,0.55vw+0.55rem,0.95rem)] font-sans uppercase tracking-[0.3em] text-white/70 font-medium"
                    initial={skipAnimations ? false : { opacity: 0, y: 20 }}
                    animate={skipAnimations ? { opacity: 1, y: 0 } : (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
                    transition={skipAnimations ? { duration: 0 } : { duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Produktion
                </motion.p>

                {/* Heading */}
                <motion.h2
                    className="mb-8 font-serif text-[clamp(2.6rem,2.6vw+1.4rem,4.1rem)] font-medium tracking-tight leading-[1.1] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                    initial={skipAnimations ? false : { opacity: 0, y: 30 }}
                    animate={skipAnimations ? { opacity: 1, y: 0 } : (isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
                    transition={skipAnimations ? { duration: 0 } : { duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                    Technologie & Workflows
                </motion.h2>

                {/* Content Body */}
                <div className="max-w-3xl space-y-8">
                    <motion.div
                        className="flex gap-6"
                        initial={skipAnimations ? false : { opacity: 0, x: -20 }}
                        animate={skipAnimations ? { opacity: 1, x: 0 } : (isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 })}
                        transition={skipAnimations ? { duration: 0 } : { duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-1 h-12 bg-gold/60 mt-2" />
                        <div>
                            <p className="text-xl font-medium text-white mb-2">Virtual Production</p>
                            <p className="text-lg text-white/80 font-light leading-relaxed">
                                LED-gestützte Stage für wetterunabhängige, nachhaltige und hocheffiziente Drehabläufe.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex gap-6"
                        initial={skipAnimations ? false : { opacity: 0, x: -20 }}
                        animate={skipAnimations ? { opacity: 1, x: 0 } : (isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 })}
                        transition={skipAnimations ? { duration: 0 } : { duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-1 h-12 bg-gold/60 mt-2" />
                        <div>
                            <p className="text-xl font-medium text-white mb-2">KI-Implementierung</p>
                            <p className="text-lg text-white/80 font-light leading-relaxed">
                                Gezielter KI Einsatz zur Effizienzgewinnung und Qualitätssteigerung.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Fade-in from black on slide entry */}
            <motion.div
                className="absolute inset-0 bg-black pointer-events-none z-30"
                initial={skipAnimations ? { opacity: 1 } : { opacity: 1 }}
                animate={skipAnimations ? { opacity: 0 } : { opacity: isActive ? 0 : 1 }}
                transition={skipAnimations ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
        </section>
    )
}
