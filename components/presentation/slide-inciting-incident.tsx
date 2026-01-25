"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideIncitingIncidentProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideIncitingIncident({ isActive, skipAnimations }: SlideIncitingIncidentProps) {
    const slideshowImages = [
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2014.27.04.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2014.29.13.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2014.29.35.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2014.32.24.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2014.32.41.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2018.43.40.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2018.44.56.png",
        "/Slideshow/Bildschirmfoto%202026-01-25%20um%2019.08.29.png",
    ]
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        if (!isActive) {
            setImageIndex(0)
            return
        }

        const intervalId = window.setInterval(() => {
            setImageIndex((current) => (current + 1) % slideshowImages.length)
        }, 4000)

        return () => window.clearInterval(intervalId)
    }, [isActive, slideshowImages.length])

    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="left"
            backgroundImage={slideshowImages[imageIndex]}
            mode="paper"
            imageClassName="right-[4%] top-[16%] w-[42%] h-[68%]"
            contentClassName="max-w-[780px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Staffel 1</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">Plötzlich Emily-Anna</SlideHeading>
            <SlideBody isActive={isActive} skipAnimations={skipAnimations} mode="paper" className="space-y-4">
                <p>• Annas geheime Identität als „Verlobte" - ständige Gratwanderung.</p>
                <p>• Paul entdeckt seine Gefühle für Anna, kämpft aber mit Loyalität und Schuld.</p>
                <p>• Die Familie steht vor der Entscheidung:<br />modernisieren oder verkaufen.</p>
                <p>• Benjamin erwacht mit Gedächtnisverlust -<br />verliebt sich ebenfalls in Anna.</p>
                <p>• Die echte Anna taucht auf und niemand glaubt ihr.</p>
                <p>• Paul findet Emilys wahre Identität heraus.</p>
            </SlideBody>
        </SlideTemplate>
    )
}
