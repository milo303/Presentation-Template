"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideClosingProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideClosing({ isActive, skipAnimations }: SlideClosingProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="center"
            backgroundImage="/images/wildholz-closing.png"
            mode="cinematic"
        >
            <div className="flex flex-col items-center text-center space-y-10">
                <SlideLabel isActive={isActive} skipAnimations={skipAnimations}>DESHALB WILDHOLZ</SlideLabel>
                <SlideHeading isActive={isActive} skipAnimations={skipAnimations}>
                    Eine Reise zu dem,<br />was wirklich zählt.
                </SlideHeading>
                <SlideBody isActive={isActive} skipAnimations={skipAnimations} className="max-w-3xl text-2xl">
                    WILDHOLZ ist mehr als eine neue Serie. Sie ist eine Einladung in eine sinnlich naturverbundene Welt, erzählt eine moderne und gleichzeitig warme Familien- und
                    Heimatgeschichte über Herkunft, Zugehörigkeit, Zusammenhalt.
                </SlideBody>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-start gap-12 text-white/50 text-xs uppercase tracking-[0.2em] pt-16 border-t border-white/20 w-full max-w-6xl text-center place-items-center">
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Autor*innen</p>
                        <p>Rebecca Mahnkopf</p>
                        <p>Peter Gallert</p>
                        <p>& Writer&apos;s Room</p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Producer</p>
                        <p>Claudia Danne</p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Produzent</p>
                        <p>Guido Reinhardt</p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Ausführende Produzentin</p>
                        <p>Dorothea Goldstein</p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Virtual Production<br />&amp; Implementation</p>
                        <p>Stephan Burchhardt</p>
                        <p>Felix Wolf</p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-bold text-white/80 tracking-widest mb-4">Partner</p>
                        <p>Bavaria Studios</p>
                        <p>Adobe</p>
                        <p>Filmstiftung NRW</p>
                    </div>
                </div>
            </div>
        </SlideTemplate>
    )
}
