"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SlideTemplateProps {
    isActive: boolean
    backgroundImage?: string
    backgroundOverlay?: ReactNode
    children: ReactNode
    className?: string
    contentClassName?: string
    contentWrapperClassName?: string
    imageClassName?: string
    alignment?: "left" | "right" | "center"
    mode?: "cinematic" | "paper"
    fullImage?: boolean
    skipAnimations?: boolean
}

export function SlideTemplate({
    isActive,
    backgroundImage,
    backgroundOverlay,
    children,
    className,
    contentClassName,
    contentWrapperClassName,
    imageClassName,
    alignment = "left",
    mode = "cinematic",
    fullImage = false,
    skipAnimations = false
}: SlideTemplateProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => setMounted(true), 100)
            return () => clearTimeout(timer)
        } else {
            setMounted(false)
        }
    }, [isActive])

    const alignmentClasses = {
        left: "items-center justify-start",
        right: "items-center justify-end",
        center: "items-center justify-center",
    }

    const textAlignmentClasses = {
        left: "text-left",
        right: "text-right",
        center: "text-center",
    }

    // Paper Mode Styles
    const isPaper = mode === "paper"

    return (
        <section className={cn("relative h-full w-full overflow-hidden", isPaper ? "bg-transparent" : "bg-black", className)}>

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {mode === "cinematic" ? (
                    // CINEMATIC MODE: Full-bleed background
                    <>
                        {backgroundImage && (
                            <motion.div
                                className="absolute inset-0"
                                initial={skipAnimations ? false : { scale: 1.1, opacity: 0 }}
                                animate={skipAnimations ? { scale: 1, opacity: 1 } : (mounted ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 })}
                                transition={skipAnimations ? { duration: 0 } : { duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Image
                                    src={backgroundImage}
                                    alt="Slide background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        )}
                        {!backgroundOverlay && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
                        )}
                        {backgroundOverlay}
                    </>
                ) : (
                    // PAPER MODE: Texture + Leaves removed (handled globally)
                    // We only render the Inset Image here
                    <>
                        {/* Global texture is in PresentationController */}

                        {/* Inset Image / Full Image for Paper Mode */}
                        {backgroundImage && (
                            <motion.div
                                className={cn(
                                    "absolute z-10",
                                    fullImage
                                        ? "inset-0"
                                        : cn(
                                            "shadow-2xl sepia-[0.1] brightness-95 contrast-105",
                                            alignment === 'left' ? "right-[6%] top-[14%] w-[40%] h-[68%] rotate-2" :
                                                alignment === 'right' ? "left-[6%] top-[14%] w-[40%] h-[68%] -rotate-2" :
                                                    // Center alignment image positioning: Center background
                                                    "top-[16%] left-[50%] -translate-x-1/2 w-[60%] h-[62%] rotate-1"
                                        ),
                                    imageClassName
                                )}
                                initial={skipAnimations ? false : { opacity: 0, scale: fullImage ? 1.05 : 0.95 }}
                                animate={skipAnimations ? { opacity: 1, scale: 1 } : (mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: fullImage ? 1.05 : 0.95 })}
                                transition={skipAnimations ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }}
                            >
                                <div className={cn(
                                    "relative w-full h-full bg-white overflow-hidden",
                                    fullImage ? "border-0" : "border-[12px] border-white shadow-xl"
                                )}>
                                    <Image
                                        src={backgroundImage}
                                        alt="Slide visual"
                                        fill
                                        className={cn("object-cover", isPaper && !fullImage && "mix-blend-normal")}
                                        priority
                                    />
                                    {fullImage && (
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Content Layer */}
            <div className={cn("relative z-50 h-full flex w-full max-w-[1600px] mx-auto px-24", alignmentClasses[alignment], contentWrapperClassName)}>
                <div
                    className={cn(
                        "transition-all duration-500",
                        textAlignmentClasses[alignment],
                        // Spacing for Left/Right alignment - strict 50% width to avoid overlap
                        isPaper && !fullImage && alignment === 'left' && "mr-auto w-[50%] pr-12 max-w-[760px]",
                        isPaper && !fullImage && alignment === 'right' && "ml-auto w-[50%] pl-12 max-w-[760px]",

                        // Note Card style for Center alignment in Paper mode
                        isPaper && alignment === 'center' && !fullImage && "bg-[#F9F5EA]/95 backdrop-blur-sm p-12 shadow-2xl max-w-3xl mx-auto border border-[#5C4033]/10 rotate-1 rounded-sm",

                        // Fullscreen text style
                        fullImage && "max-w-2xl text-white drop-shadow-md",
                        contentClassName
                    )}
                >
                    {children}
                </div>
            </div>
        </section>
    )
}

// Sub-components for semantic structure
export function SlideLabel({ children, isActive, delay = 0.3, className, mode = 'cinematic', skipAnimations = false }: { children: ReactNode, isActive: boolean, delay?: number, className?: string, mode?: 'cinematic' | 'paper', skipAnimations?: boolean }) {
    const textColor = mode === 'paper' ? "text-[#5C4033]" : "text-white/60"

    return (
        <motion.p
            className={cn("mb-4 text-[clamp(0.75rem,0.55vw+0.55rem,0.95rem)] font-sans uppercase tracking-[0.3em] font-medium opacity-80", textColor, className)}
            initial={skipAnimations ? false : { opacity: 0, y: 18, x: -6, scale: 0.98 }}
            animate={skipAnimations ? { opacity: 1, y: 0, x: 0, scale: 1 } : (isActive ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 18, x: -6, scale: 0.98 })}
            transition={skipAnimations ? { duration: 0 } : { type: "spring", stiffness: 130, damping: 18, delay, restDelta: 0.001 }}
        >
            {children}
        </motion.p>
    )
}

export function SlideHeading({ children, isActive, delay = 0.5, className, mode = 'cinematic', skipAnimations = false }: { children: ReactNode, isActive: boolean, delay?: number, className?: string, mode?: 'cinematic' | 'paper', skipAnimations?: boolean }) {
    const textColor = mode === 'paper' ? "text-[#7A2E2E]" : "text-white"

    return (
        <motion.h2
            className={cn("mb-6 font-serif text-[clamp(2.6rem,2.6vw+1.4rem,4.1rem)] font-medium tracking-tight leading-[1.1]", textColor, className)}
            initial={skipAnimations ? false : { opacity: 0, y: 36, x: -8, scale: 0.97 }}
            animate={skipAnimations ? { opacity: 1, y: 0, x: 0, scale: 1 } : (isActive ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 36, x: -8, scale: 0.97 })}
            transition={skipAnimations ? { duration: 0 } : { type: "spring", stiffness: 110, damping: 20, delay, restDelta: 0.001 }}
        >
            {children}
        </motion.h2>
    )
}

export function SlideBody({ children, isActive, delay = 0.8, className, mode = 'cinematic', skipAnimations = false }: { children: ReactNode, isActive: boolean, delay?: number, className?: string, mode?: 'cinematic' | 'paper', skipAnimations?: boolean }) {
    const textColor = mode === 'paper' ? "text-[#2A1A11]" : "text-white/80"

    return (
        <motion.div
            className={cn("text-[clamp(1.05rem,1vw+0.7rem,1.45rem)] leading-relaxed font-light", textColor, className)}
            initial={skipAnimations ? false : { opacity: 0, y: 24, x: -4, scale: 0.98 }}
            animate={skipAnimations ? { opacity: 1, y: 0, x: 0, scale: 1 } : (isActive ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 24, x: -4, scale: 0.98 })}
            transition={skipAnimations ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 22, delay, restDelta: 0.001 }}
        >
            {children}
        </motion.div>
    )
}
