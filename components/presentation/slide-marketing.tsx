"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideMarketingProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideMarketing({ isActive, skipAnimations }: SlideMarketingProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            backgroundImage="/images/wildholz-marketing.png"
            mode="paper"
            alignment="left"
            imageClassName="right-[4%] top-[18%] w-[40%] h-[64%]"
            contentClassName="max-w-[860px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(0.85rem,0.7vw+0.6rem,1.1rem)]">
                Eskapismus
            </SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(2.8rem,2.8vw+1.8rem,4.4rem)]">
                Marke Wildholz
            </SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="text-[clamp(1.05rem,1.1vw+0.8rem,1.6rem)] space-y-6">
                <p>
                    <strong>Rückzugsort:</strong> In einer hektischen Welt wird WILDHOLZ zum analogen und digitalen Ruhepol – ein „Wald im Scrollen".
                </p>
                <p>
                    <strong>Fandom-Motor:</strong> <em>Team Benjamin vs. Team Paul</em> – das Love-Triangle als interaktives Herzstück für die Community.
                </p>
                <p>
                    <strong>Wildholz in deiner Stadt:</strong> Ein undigitaler Waldwürfel als analoger Zufluchtsort mitten im Trubel der Fußgängerzone.
                </p>
            </SlideBody>
        </SlideTemplate>
    )
}
