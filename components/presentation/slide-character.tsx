"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"
import { cn } from "@/lib/utils"

interface SlideCharacterProps {
    isActive: boolean
    skipAnimations?: boolean
    onNext?: () => void
    onPrev?: () => void
}

const SECONDARY_CHARACTERS = [
    {
        name: "Erik Wildholz",
        age: 35,
        role: "Der Lieblingsautor",
        image: "/images/char-erik.png",
        description: "Geheimnisvoll, zurückgezogen. Sein Bestseller machte ihn zum Star, doch er hasst das Rampenlicht."
    },
    {
        name: "Sophie",
        age: 30,
        role: "Die beste Freundin",
        image: "/images/char-sophie.png",
        description: "Digital Native, Realistin. Sie versucht Emily aus ihren Tagträumen zurück in die Berliner Realität zu holen."
    },
    {
        name: "Konrad",
        age: 65,
        role: "Der gute Geist",
        image: "/images/char-konrad.png",
        description: "Verwalter des Forsthofs. Er durchschaut Emilys Spiel sofort, schweigt aber aus Liebe zu Erik."
    }
]

export function SlideCharacter({ isActive, skipAnimations, onNext, onPrev }: SlideCharacterProps) {
    const [step, setStep] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Reset step when slide becomes active from start
    useEffect(() => {
        if (!isActive) {
            setStep(0)
        }
    }, [isActive])

    const goNext = useCallback(() => {
        if (isTransitioning) return
        if (step === 0) {
            setIsTransitioning(true)
            setStep(1)
            setTimeout(() => setIsTransitioning(false), 800)
        } else {
            onNext?.()
        }
    }, [step, isTransitioning, onNext])

    const goPrev = useCallback(() => {
        if (isTransitioning) return
        if (step === 1) {
            setIsTransitioning(true)
            setStep(0)
            setTimeout(() => setIsTransitioning(false), 800)
        } else {
            onPrev?.()
        }
    }, [step, isTransitioning, onPrev])

    // Keyboard and Click management (preventing dual triggers)
    useEffect(() => {
        if (!isActive) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowRight", "ArrowDown", " ", "Enter"].includes(e.key)) {
                e.preventDefault()
                e.stopPropagation()
                goNext()
            } else if (["ArrowLeft", "ArrowUp", "Backspace"].includes(e.key)) {
                e.preventDefault()
                e.stopPropagation()
                goPrev()
            }
        }
        window.addEventListener("keydown", handleKeyDown, { capture: true })
        return () => window.removeEventListener("keydown", handleKeyDown, { capture: true })
    }, [isActive, goNext, goPrev])

    const handleContainerClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const width = window.innerWidth
        if (e.clientX < width * 0.3) {
            goPrev()
        } else {
            goNext()
        }
    }

    return (
        <div className="h-full w-full relative" onClick={handleContainerClick}>
            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                        className="h-full w-full"
                    >
                        <SlideTemplate
                            isActive={isActive}
                            skipAnimations={skipAnimations}
                            alignment="left"
                            backgroundImage="/images/wildholz-character.png"
                            mode="paper"
                            fullImage={true}
                            contentWrapperClassName="max-w-[2000px] pl-6 pr-40"
                            contentClassName="max-w-4xl"
                        >
                            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.65rem,0.7vw+0.45rem,1.25rem)] text-white/90">
                                Hauptfigur
                            </SlideLabel>
                            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.2rem,3.2vw+1.6rem,5.8rem)] text-white leading-[1.05]">
                                Emily (Anna) Keller
                            </SlideHeading>
                            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.9rem,1.2vw+0.7rem,1.8rem)] text-white/85">
                                33, Grafik-Designerin für New-Adult-Romane. Sie lebt lieber in Tagträumen als in der Realität – bis sie durch einen Unfall zur Verlobten ihres Lieblingsautors wird.<br /><br />
                                Ehrlich, humorvoll und endlich angekommen, aber mit einem Geheimnis, das alles zerstören könnte.
                            </SlideBody>
                        </SlideTemplate>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full w-full relative"
                    >
                        <SlideTemplate
                            isActive={isActive}
                            skipAnimations={true} // Animations handled by motion.div wrapper
                            alignment="left"
                            mode="paper"
                            contentWrapperClassName="max-w-full px-20 flex flex-col justify-start pt-32"
                            contentClassName="max-w-none w-full"
                        >
                            <div className="flex flex-col gap-12 w-full">
                                <div>
                                    <SlideLabel isActive={true} skipAnimations={true} mode="paper">Das Ensemble</SlideLabel>
                                    <SlideHeading isActive={true} skipAnimations={true} mode="paper" className="!mb-0 text-5xl">Weitere Figuren</SlideHeading>
                                </div>

                                <div className="grid grid-cols-3 gap-10 w-full">
                                    {SECONDARY_CHARACTERS.map((char, i) => (
                                        <motion.div
                                            key={char.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                            className="flex flex-col gap-6 group"
                                        >
                                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border-[8px] border-white shadow-xl rotate-[1deg] group-hover:rotate-0 transition-transform duration-500">
                                                <Image
                                                    src={char.image}
                                                    alt={char.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                                            </div>

                                            <div className="px-2">
                                                <p className="text-[#7A2E2E] font-serif italic text-xl mb-1">{char.name}, {char.age}</p>
                                                <p className="text-[#5C4033]/60 uppercase tracking-widest text-[10px] mb-3">{char.role}</p>
                                                <p className="text-[#2A1A11] text-sm leading-relaxed font-light opacity-90">{char.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </SlideTemplate>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
