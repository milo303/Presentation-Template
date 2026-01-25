"use client"

import Image from "next/image"
import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"
import { getAssetPath } from "@/lib/utils"

interface SlideTransmediaProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideTransmedia({ isActive, skipAnimations }: SlideTransmediaProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/Buch.png"
            mode="paper"
            alignment="right"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Crossmedia</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Mehr als nur Serie</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-6">
                <p>
                    <strong>Die Roman-Reihe:</strong> Benjamin Hartmanns fiktive Bestseller werden real – als echte New-Adult-Romane im Buchhandel, noch vor Serienstart.
                </p>
                <div className="pt-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#5C4033]/70 font-semibold">
                        Multiplattform-Strategie
                    </p>
                    <div className="mt-3 flex flex-wrap gap-6 justify-end">
                        <Image
                            src={getAssetPath("/logos/443809c5-42c6-4e17-9f31-1732ccfccc09%20(1).png")}
                            alt="Logo 1"
                            width={168}
                            height={168}
                            className="h-24 w-24 object-contain"
                        />
                        <Image
                            src={getAssetPath("/logos/6bae3d5a-b44b-418e-bd7d-eb3a356630a8%20(1)-2.png")}
                            alt="Logo 2"
                            width={168}
                            height={168}
                            className="h-24 w-24 object-contain"
                        />
                        <Image
                            src={getAssetPath("/logos/b0d1a469-093a-469c-ae38-798f884a796b%20(1)-2.png")}
                            alt="Logo 3"
                            width={168}
                            height={168}
                            className="h-24 w-24 object-contain"
                        />
                        <Image
                            src={getAssetPath("/logos/cad5ae49-a82b-4828-a961-6476cce4bf73%20(1)-2.png")}
                            alt="Logo 4"
                            width={168}
                            height={168}
                            className="h-24 w-24 object-contain"
                        />
                    </div>
                </div>
                <p className="text-xl italic opacity-70 pt-8 border-t border-[#5C4033]/20">
                    Ein Ökosystem aus Serie, Roman, Musik und Pop-ups.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
