"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SlideTemplate, SlideLabel, SlideHeading } from "./slide-template"

interface SlideFamilyTreeProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideFamilyTree({ isActive, skipAnimations }: SlideFamilyTreeProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            mode="paper"
            className="bg-[#F9F5EA]"
        >
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('/images/paper-texture.jpg')] bg-cover mix-blend-multiply" />

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-16">
                {/* Header */}
                <div className="text-center mb-8">
                    <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Das Ensemble</SlideLabel>
                    <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Die Familie Hartmann</SlideHeading>
                </div>

                {/* Horizontal Tree Container */}
                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center">

                        {/* Level 1: Grandparents */}
                        <FamilyNode
                            image="/images/Ilse und Carl.png"
                            label="Opa Karl & Oma Ilse"
                            sub="Die Großeltern"
                            isActive={isActive}
                            delay={0.2}
                            size="xl"
                        />

                        {/* Connector Line to Martha */}
                        <motion.div
                            className="h-1 bg-[#5C4033]/50 rounded-full -mx-1"
                            initial={{ width: 0 }}
                            animate={isActive ? { width: 80 } : { width: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        />

                        {/* Level 2: Martha */}
                        <FamilyNode
                            image="/images/Martha.png"
                            label="Martha"
                            sub="Familienoberhaupt"
                            isActive={isActive}
                            delay={0.7}
                            size="lg"
                        />

                        {/* Connector Line to Siblings Vertical Bar */}
                        <motion.div
                            className="h-1 bg-[#5C4033]/50 rounded-full -mx-1"
                            initial={{ width: 0 }}
                            animate={isActive ? { width: 60 } : { width: 0 }}
                            transition={{ duration: 0.4, delay: 1.0 }}
                        />

                        {/* Vertical Bar + Sibling Branches */}
                        <div className="relative flex items-center">
                            {/* Vertical Bar */}
                            <motion.div
                                className="w-1 bg-[#5C4033]/50 rounded-full absolute left-0"
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                                initial={{ height: 0 }}
                                animate={isActive ? { height: 320 } : { height: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            />

                            {/* Level 3: Siblings Column */}
                            <div className="flex flex-col gap-3 ml-1">
                                {/* Clara & Robert + Kids */}
                                <div className="flex items-center">
                                    <motion.div
                                        className="h-1 bg-[#5C4033]/50 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isActive ? { width: 40 } : { width: 0 }}
                                        transition={{ duration: 0.3, delay: 1.6 }}
                                    />
                                    <FamilyNode
                                        image="/images/Clara und Robert.png"
                                        label="Clara & Robert"
                                        sub="BWLerin & Bürgermeister"
                                        isActive={isActive}
                                        delay={1.8}
                                        size="md"
                                    />
                                    <motion.div
                                        className="h-1 bg-[#5C4033]/50 rounded-full -mx-1"
                                        initial={{ width: 0 }}
                                        animate={isActive ? { width: 40 } : { width: 0 }}
                                        transition={{ duration: 0.3, delay: 2.3 }}
                                    />
                                    {/* Kids Vertical + Branches */}
                                    <div className="relative flex items-center">
                                        <motion.div
                                            className="w-1 bg-[#5C4033]/50 rounded-full absolute left-0"
                                            style={{ top: '50%', transform: 'translateY(-50%)' }}
                                            initial={{ height: 0 }}
                                            animate={isActive ? { height: 80 } : { height: 0 }}
                                            transition={{ duration: 0.3, delay: 2.4 }}
                                        />
                                        <div className="flex flex-col gap-2 ml-1">
                                            <div className="flex items-center">
                                                <motion.div
                                                    className="h-1 bg-[#5C4033]/50 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={isActive ? { width: 24 } : { width: 0 }}
                                                    transition={{ duration: 0.2, delay: 2.5 }}
                                                />
                                                <FamilyNode
                                                    image="/images/Emma.png"
                                                    label="Emma"
                                                    sub="Enkelin"
                                                    isActive={isActive}
                                                    delay={2.6}
                                                    size="sm"
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <motion.div
                                                    className="h-1 bg-[#5C4033]/50 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={isActive ? { width: 24 } : { width: 0 }}
                                                    transition={{ duration: 0.2, delay: 2.6 }}
                                                />
                                                <FamilyNode
                                                    image="/images/Tom.png"
                                                    label="Tom"
                                                    sub="Enkel"
                                                    isActive={isActive}
                                                    delay={2.7}
                                                    size="sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Paul */}
                                <div className="flex items-center">
                                    <motion.div
                                        className="h-1 bg-[#5C4033]/50 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isActive ? { width: 40 } : { width: 0 }}
                                        transition={{ duration: 0.3, delay: 1.7 }}
                                    />
                                    <FamilyNode
                                        image="/images/Paul.png"
                                        label="Paul"
                                        sub="Der Tischler"
                                        isActive={isActive}
                                        delay={1.9}
                                        size="md"
                                    />
                                </div>

                                {/* Lotte */}
                                <div className="flex items-center">
                                    <motion.div
                                        className="h-1 bg-[#5C4033]/50 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isActive ? { width: 40 } : { width: 0 }}
                                        transition={{ duration: 0.3, delay: 1.8 }}
                                    />
                                    <FamilyNode
                                        image="/images/lotte.png"
                                        label="Lotte"
                                        sub="Die Försterin"
                                        isActive={isActive}
                                        delay={2.0}
                                        size="md"
                                    />
                                </div>

                                {/* Benjamin */}
                                <div className="flex items-center">
                                    <motion.div
                                        className="h-1 bg-[#5C4033]/50 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isActive ? { width: 40 } : { width: 0 }}
                                        transition={{ duration: 0.3, delay: 1.9 }}
                                    />
                                    <FamilyNode
                                        image="/images/Benjamin.png"
                                        label="Benjamin"
                                        sub="Der Autor"
                                        isActive={isActive}
                                        delay={2.1}
                                        size="md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SlideTemplate>
    )
}

interface FamilyNodeProps {
    image: string
    label: string
    sub: string
    isActive: boolean
    delay: number
    size: "xl" | "lg" | "md" | "sm"
}

function FamilyNode({ image, label, sub, isActive, delay, size }: FamilyNodeProps) {
    const sizeClasses = {
        xl: "w-28 h-28",
        lg: "w-24 h-24",
        md: "w-20 h-20",
        sm: "w-14 h-14"
    }

    const textSizes = {
        xl: "text-base",
        lg: "text-sm",
        md: "text-xs",
        sm: "text-[10px]"
    }

    return (
        <motion.div
            className="flex flex-col items-center gap-1 text-center flex-shrink-0 px-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay, type: "spring", bounce: 0.3 }}
        >
            <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-xl sepia-[0.2]`}>
                <Image src={image} alt={label} fill className="object-cover" />
            </div>
            <div>
                <p className={`font-serif text-[#7A2E2E] ${textSizes[size]} leading-tight font-medium whitespace-nowrap`}>{label}</p>
                <p className={`font-sans text-[#5C4033]/60 uppercase tracking-wider text-[8px] mt-0.5 whitespace-nowrap`}>{sub}</p>
            </div>
        </motion.div>
    )
}
