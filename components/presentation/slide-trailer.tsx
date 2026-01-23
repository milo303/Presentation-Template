"use client"
import { motion } from "framer-motion"

interface SlideTrailerProps {
    isActive?: boolean
    skipAnimations?: boolean
}

export function SlideTrailer({ isActive = false, skipAnimations = false }: SlideTrailerProps) {
    return (
        <section className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
            </div>

            {/* Video Container */}
            <div
                className={`relative z-10 w-full max-w-6xl aspect-video bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all duration-1000 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                <iframe
                    src="https://ufaintranet-my.sharepoint.com/personal/milo_brogi_ufa_de/_layouts/15/embed.aspx?UniqueId=ae342ec0-f653-4cbc-a0ea-fd0a1ddd3df0&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    title="WildholzCOmpress.mp4"
                />
            </div>

            {/* Header Overlay */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isActive ? { opacity: 0.15, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{
                        opacity: { duration: 1, delay: 0.8 },
                        y: { duration: 1, delay: 0.8 }
                    }}
                    className="text-white font-serif text-[8vw] tracking-tighter select-none mix-blend-overlay"
                >
                    Trailer
                </motion.h2>
            </div>
        </section>
    )
}
