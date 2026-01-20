"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface SlideAtmosphereProps {
    isActive?: boolean
    onNext?: () => void
    onPrev?: () => void
}

type AtmosphereState = 0 | 1 | 2

export function SlideAtmosphere({ isActive = false, onNext, onPrev }: SlideAtmosphereProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<AtmosphereState>(0)
    const lastActionTime = useRef(0)

    const goForward = useCallback(() => {
        const now = Date.now()
        if (now - lastActionTime.current < 600) return
        lastActionTime.current = now
        if (state < 2) setState((s) => (s + 1) as AtmosphereState)
        else if (onNext) onNext()
    }, [state, onNext])

    const goBackward = useCallback(() => {
        const now = Date.now()
        if (now - lastActionTime.current < 600) return
        lastActionTime.current = now
        if (state > 0) setState((s) => (s - 1) as AtmosphereState)
        else if (onPrev) onPrev()
    }, [state, onPrev])

    useEffect(() => {
        if (!isActive) return
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.deltaY > 20) goForward()
            else if (e.deltaY < -20) goBackward()
        }
        window.addEventListener("wheel", handleWheel, { passive: false, capture: true })
        return () => window.removeEventListener("wheel", handleWheel, { capture: true })
    }, [isActive, goForward, goBackward])

    useEffect(() => {
        if (!isActive) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
                e.preventDefault(); e.stopPropagation(); goForward()
            } else if (["ArrowLeft", "ArrowUp", "Backspace"].includes(e.key)) {
                e.preventDefault(); e.stopPropagation(); goBackward()
            }
        }
        window.addEventListener("keydown", handleKeyDown, { capture: true })
        return () => window.removeEventListener("keydown", handleKeyDown, { capture: true })
    }, [isActive, goForward, goBackward])

    useEffect(() => {
        if (!isActive) {
            const timer = setTimeout(() => setState(0), 800)
            return () => clearTimeout(timer)
        }
    }, [isActive])

    const visuals = {
        cityOpacity: state === 0 ? 0.3 : state === 1 ? 0.95 : 0.4, // Dim city more at night for focus
        cityBlur: state === 0 ? 20 : state === 1 ? 10 : 4,         // Sharper city at night for depth
        cityY: state === 0 ? "0%" : state === 1 ? "4%" : "15%",
        cityScale: state === 0 ? 1.05 : state === 1 ? 1.1 : 1.25,
        warmthOpacity: state === 0 ? 0 : state === 1 ? 0.7 : 0,
        nightOpacity: state === 0 ? 0 : state === 1 ? 0 : 1,       // Full night overlay
        hutScale: state === 0 ? 0.8 : state === 1 ? 0.9 : 1.05,
        lightOpacity: state === 0 ? 0 : state === 1 ? 0.2 : 1.0,
    }

    const textColor = state === 2 ? "text-white" : "text-stone-900"
    const textShadow = state === 2 ? "drop-shadow-lg" : "drop-shadow-sm"

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-stone-100">

            {/* Background Transitions */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    backgroundColor: state === 0 ? "#e7e5e4" : state === 1 ? "#faebd7" : "#0f172a"
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* MOON & STARS (State 2) - Premium Image Asset */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: state === 2 ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                <Image
                    src="/images/night-sky.png"
                    alt="Night Sky with Moon and Stars"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </motion.div>

            {/* City Backdrop */}
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    opacity: visuals.cityOpacity,
                    y: visuals.cityY,
                    scale: visuals.cityScale,
                    filter: `blur(${visuals.cityBlur}px)`
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <Image
                    src="/images/city-neutral.png"
                    alt="City"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Atmosphere Overlays */}
            <motion.div
                className="absolute inset-0 z-5 bg-gradient-to-t from-orange-500/30 to-transparent mix-blend-overlay pointer-events-none"
                animate={{ opacity: visuals.warmthOpacity }}
                transition={{ duration: 1.2 }}
            />
            {/* Night Gradient Overlay - adjusted for new sky image */}
            <motion.div
                className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-900 pointer-events-none"
                animate={{ opacity: visuals.nightOpacity }}
                transition={{ duration: 1.2 }}
            />

            {/* Cinematic Lens Bloom (Global) */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                animate={{ opacity: state === 2 ? 0.8 : 0 }}
                transition={{ duration: 1.5 }}
            >
                {/* Central Warm Bloom from Hut */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-amber-500/20 blur-[100px] rounded-full" />

                {/* Cold Bloom from Moon */}
                <div className="absolute top-[5%] right-[25%] w-[400px] h-[400px] bg-blue-300/10 blur-[80px] rounded-full" />
            </motion.div>

            {/* --- HUT (THE BOX) --- */}
            {/* Kept big but shifted vertically/scaled to avoid text overlap */}
            <div className="absolute inset-0 z-20 flex items-end justify-center pb-12 md:pb-20 pointer-events-none">
                <motion.div
                    className="relative h-[55vh] md:h-[65vh] w-full max-w-5xl flex items-end justify-center"
                    animate={{
                        scale: visuals.hutScale,
                        y: state === 0 ? "10%" : "0%"
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Volumetric Floor Glow - Reduced intensity */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-[15%] bg-amber-500/20 blur-[50px] rounded-[100%] mix-blend-screen z-0"
                        animate={{ opacity: state === 2 ? 0.4 : 0, scale: state === 2 ? 1.1 : 0.8 }}
                    />

                    {/* Volumetric Beams (Behind) - Softer */}
                    <motion.div
                        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[150%] z-0"
                        animate={{ opacity: state === 2 ? 0.6 : 0 }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[15%] h-full bg-gradient-to-t from-amber-200/10 to-transparent blur-[50px] rotate-[-12deg] origin-bottom" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[15%] h-full bg-gradient-to-t from-amber-200/10 to-transparent blur-[50px] rotate-[12deg] origin-bottom" />
                    </motion.div>

                    {/* Interior 3D Glow Source - NOW BEHIND (Backlighting/Volume) */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        animate={{ opacity: visuals.lightOpacity }}
                    >
                        {/* Core Light - White hot center for realism */}
                        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[30%] h-[30%] bg-white/60 blur-[60px] rounded-full mix-blend-hard-light" />

                        {/* Middle warmth - Amber/Gold */}
                        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-amber-500/50 blur-[100px] rounded-full mix-blend-screen" />

                        {/* Outer atmosphere - Wide Orange spill */}
                        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[140%] h-[110%] bg-orange-600/20 blur-[140px] rounded-full mix-blend-screen" />

                        {/* Pulse Effect - Subtle ambient pulse */}
                        {state === 2 && (
                            <motion.div
                                className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-amber-300/10 blur-[90px] rounded-full mix-blend-overlay"
                                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        )}
                    </motion.div>

                    {/* Animated Hut Image */}
                    <motion.div
                        className="relative w-full h-full z-10"
                        animate={{
                            filter: state === 2 ? "brightness(0.7) contrast(1.15) sepia(0.2)" : "brightness(1) contrast(1) sepia(0)"
                        }}
                        transition={{ duration: 1.2 }}
                    >
                        <Image
                            src="/images/wildholz-hut.png"
                            alt="Hut"
                            fill
                            className="object-contain drop-shadow-2xl"
                            style={{ objectPosition: "bottom center" }}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* --- THE TEXT --- */}
            {/* Positioned in the TOP HALF to clear the grounded box */}
            <div className="absolute inset-0 z-40 px-10 md:px-20 lg:px-32 flex flex-col pt-16 md:pt-24 pointer-events-none">
                <AnimatePresence mode="wait">
                    {state === 0 && (
                        <motion.div
                            key="t0"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-5xl"
                        >
                            <h2 className={`font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tighter ${textColor} ${textShadow} mb-6`}>
                                Pop-up <br /><span className="italic pl-2 md:pl-4">Wildholz</span>
                            </h2>
                            <p className={`font-serif text-2xl md:text-4xl italic opacity-90 ${textColor} ${textShadow}`}>
                                Zum Anfassen, nicht zum Scrollen
                            </p>
                        </motion.div>
                    )}

                    {state === 1 && (
                        <motion.div
                            key="t1"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-4xl"
                        >
                            <p className={`text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-light ${textColor} ${textShadow}`}>
                                Ein <span className="font-semibold underline underline-offset-8 decoration-orange-500/20">Waldwürfel</span> in der Stadt. Holz, Moos, Tannenduft.
                            </p>
                            <p className={`mt-10 text-xl md:text-2xl leading-relaxed italic font-serif ${textColor} opacity-80`}>
                                „Ein Stück Forsthof im echten Leben.“
                            </p>
                        </motion.div>
                    )}

                    {state === 2 && (
                        <motion.div
                            key="t2"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-5xl pt-10"
                        >
                            <p className={`text-3xl md:text-5xl lg:text-7xl leading-[1.1] font-light ${textColor} ${textShadow}`}>
                                Ein Ort zum <span className="text-amber-400">Durchatmen</span>. <br />Ein analoger Zufluchtsort.
                            </p>
                            <p className="mt-12 text-sm md:text-lg font-bold uppercase tracking-[0.4em] text-amber-400 opacity-90">
                                Vom Social Media in den Stadtraum.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Indicator Dots */}
            <div className="absolute top-1/2 -translate-y-1/2 right-8 z-50 flex flex-col gap-6">
                {[0, 1, 2].map((i) => (
                    <div key={i} className={`w-1 h-8 rounded-full transition-all duration-500 ${state === i ? (state === 2 ? 'bg-amber-400 scale-x-150' : 'bg-stone-900 scale-x-150') : 'bg-stone-400/30'}`} />
                ))}
            </div>

        </section>
    )
}
