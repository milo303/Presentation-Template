"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Maximize, Volume2, VolumeX } from "lucide-react"

interface SlideTrailerProps {
    isActive?: boolean
    skipAnimations?: boolean
}

export function SlideTrailer({ isActive = false, skipAnimations = false }: SlideTrailerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [progress, setProgress] = useState(0)

    // Handle auto-pause when slide is inactive
    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }, [isActive])

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (!videoRef.current) return

        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!videoRef.current) return
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
    }

    const handleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!videoRef.current) return

        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen()
        }
    }

    const handleTimeUpdate = () => {
        if (!videoRef.current) return
        const current = videoRef.current.currentTime
        const duration = videoRef.current.duration
        setProgress((current / duration) * 100)
    }

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (!videoRef.current) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = x / rect.width
        videoRef.current.currentTime = percentage * videoRef.current.duration
    }

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
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                onClick={togglePlay}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    playsInline
                    muted={isMuted}
                    src="/images/Wildholz-Compressed.mp4"
                    poster="/images/wildholz-background-new.png"
                />

                {/* Overlay Play Button (when paused) */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
                        >
                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold/90 text-black shadow-lg">
                                <Play className="fill-current ml-1" size={32} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Custom Controls */}
                <div
                    className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Progress Bar */}
                    <div
                        className="group relative h-1.5 w-full bg-white/20 rounded-full mb-6 cursor-pointer overflow-hidden transition-all hover:h-2"
                        onClick={handleSeek}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-gold transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={togglePlay}
                                className="text-white hover:text-gold transition-colors"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause size={24} /> : <Play size={24} className="fill-current" />}
                            </button>

                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-gold transition-colors"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>

                            <div className="text-white/60 font-mono text-sm tracking-widest uppercase">
                                {videoRef.current ?
                                    `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(videoRef.current.currentTime % 60).toString().padStart(2, '0')} / 
                   ${Math.floor(videoRef.current.duration / 60 || 0)}:${Math.floor(videoRef.current.duration % 60 || 0).toString().padStart(2, '0')}`
                                    : "0:00 / 0:00"
                                }
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleFullscreen}
                                className="text-white hover:text-gold transition-colors"
                                aria-label="Fullscreen"
                            >
                                <Maximize size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Caption Content */}
            <div className="absolute top-12 left-24 z-20">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-gold uppercase tracking-[0.5em] text-sm mb-4"
                >
                    Konzept Trailer
                </motion.p>
            </div>
        </section>
    )
}
