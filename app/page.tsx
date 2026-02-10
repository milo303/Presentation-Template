"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTemplate, SlideHeading, SlideBody, SlideLabel } from "@/components/presentation/slide-template"

// ============================================================
// 🎯 EXAMPLE SLIDES — Delete all slides below and replace
//    with your own content. These are here to showcase
//    what the engine can do. Simply ask the AI:
//    "Delete all example slides and start fresh."
// ============================================================

const TOTAL_SLIDES = 5

// --- 3D Tilt Card Component for Slide 2 ---
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    x.set((clientX - left) / width - 0.5)
    y.set((clientY - top) / height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function PresentationTemplate() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [metricLayer, setMetricLayer] = useState(0)

  // Mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const metricSets = [
    [
      { label: "Rendering", value: "60", suffix: "FPS", desc: "Fluid motion engine" },
      { label: "Latency", value: "<10", suffix: "ms", desc: "Instant interactions" },
      { label: "Reliability", value: "99.9", suffix: "%", desc: "Production grade uptime" },
    ],
    [
      { label: "Throughput", value: "1.2", suffix: "GB/s", desc: "High-speed bus capacity" },
      { label: "Mesh Nodes", value: "256", suffix: "Core", desc: "Distributed processing" },
      { label: "Buffer", value: "2", suffix: "ms", desc: "Optimized data stream" },
    ]
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="h-screen overflow-hidden">
      <PresentationController
        totalSlides={TOTAL_SLIDES}
        onSlideChange={setActiveSlide}
      >

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 1: Hero / Title Slide (Cinematic)
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 0}
          mode="cinematic"
          alignment="center"
          className="bg-black perspective-[1000px]"
          backgroundOverlay={
            <div className="absolute inset-0 overflow-hidden">
              {/* Rich Gradient Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#050505] to-[#000000]" />

              {/* Parallax Background Elements */}
              <motion.div
                className="absolute inset-0"
                animate={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
              >
                {/* Subtle noise texture */}
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
              </motion.div>

              {/* Orbital Rings - Enhanced & Brighter */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vh] h-[85vh] rounded-full border border-white/5"
                style={{ rotateX: 60 }}
                animate={{ rotateZ: [0, 360], scale: [1, 1.05, 1] }}
                transition={{ rotateZ: { duration: 60, repeat: Infinity, ease: "linear" }, scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vh] h-[65vh] rounded-full border border-gold/10 dashed"
                style={{ rotateX: 60, rotateY: 10 }}
                animate={{ rotateZ: [360, 0] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing Orbs - More Vibtrant */}
              <motion.div
                className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 bg-transparent" />
            </div>
          }
        >
          <motion.div
            className="flex flex-col items-center gap-6 z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSlide === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated Pill Badge */}
            <motion.div
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2"
              initial={{ width: "auto" }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/70 font-medium">v2.0 Example</span>
            </motion.div>

            <SlideHeading isActive={activeSlide === 0} className="text-white text-center max-w-5xl !leading-[0.9]">
              <span className="block text-[clamp(3rem,5vw,6rem)] font-thin tracking-tight opacity-50 mb-[-0.2em]">The Future of</span>
              <span className="block text-[clamp(4rem,7vw,9rem)] font-bold bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent drop-shadow-2xl">
                Presentations
              </span>
            </SlideHeading>

            <SlideBody isActive={activeSlide === 0} className="text-center max-w-xl text-white/50 !text-lg !font-light tracking-wide">
              Experience slide transitions like never before.
              <br />
              Cinematic depth, 3D flips, and tactile paper modes.
            </SlideBody>
          </motion.div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 2: Stats / Metrics (Professional / Architectural)
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 1}
          mode="cinematic"
          alignment="center"
          className="bg-[#08080c]"
          backgroundOverlay={
            <div className="absolute inset-0 overflow-hidden">
              {/* Advanced Light Play */}
              <motion.div
                className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-500/10 blur-[140px] rounded-full"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-white/[0.05] blur-[120px] rounded-full"
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1.2, 1, 1.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Moving Scanning Line */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Grid with perspective */}
              <div className="absolute inset-0 opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
          }
        >
          <div className="flex flex-col items-center z-10 w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={activeSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <SlideLabel isActive={activeSlide === 1} className="text-blue-400/60 tracking-[0.6em] mb-4 uppercase text-[11px] font-medium">
                Real-time Intelligence
              </SlideLabel>
              <h2 className="text-white text-3xl font-light tracking-tight mb-12 opacity-80">
                {metricLayer === 0 ? "Core Performance" : "Network Topology"}
              </h2>
            </motion.div>

            <div
              className="grid grid-cols-3 gap-6 w-full perspective-[2000px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setMetricLayer(prev => prev === 0 ? 1 : 0)
              }}
            >
              {metricSets[metricLayer].map((stat, i) => (
                <motion.div
                  key={`${metricLayer}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={activeSlide === 1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
                  transition={{
                    delay: i * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <TiltCard className="h-full group relative">
                    {/* Advanced Glass Card */}
                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]" />

                    {/* Subtle Internal Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative p-12 flex flex-col items-center justify-center text-center h-full min-h-[360px]">
                      <div className="w-full flex justify-between items-center mb-10">
                        <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-mono border border-white/5 px-2 py-1 rounded">
                          {metricLayer === 0 ? "SYSTEM" : "NODE"} / 0{i + 1}
                        </span>
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
                          style={{ backgroundColor: metricLayer === 1 ? '#60a5fa' : 'white' }}
                        />
                      </div>

                      <div className="flex flex-col items-center mb-6">
                        <div className="flex items-baseline gap-2">
                          <motion.span
                            key={stat.value}
                            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            className="text-7xl font-extralight tracking-tighter text-white"
                          >
                            {stat.value}
                          </motion.span>
                          <span className="text-2xl text-white/30 font-extralight">{stat.suffix}</span>
                        </div>

                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-blue-400/40 text-[10px] uppercase tracking-[0.4em] mt-4 font-bold"
                        >
                          {stat.label}
                        </motion.div>
                      </div>

                      <p className="text-white/30 text-xs leading-relaxed font-light mt-4 max-w-[200px]">
                        {stat.desc}
                      </p>

                      {/* Interaction Hint (Hover Only) */}
                      <div className="absolute bottom-6 opacity-0 group-hover:opacity-40 transition-opacity">
                        <p className="text-[9px] uppercase tracking-widest text-white/50">Next Schema</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Control Hint Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={activeSlide === 1 ? { opacity: 0.3 } : { opacity: 0 }}
              className="mt-16 text-[9px] uppercase tracking-[0.5em] text-white"
            >
              Interactive Environment — Click Grid to Toggle
            </motion.p>
          </div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 3: Features (Paper - Hand-drawn feel)
            ────────────────────────────────────────────────── */}
        <SlideTemplate isActive={activeSlide === 2} mode="paper" alignment="left">
          <SlideHeading isActive={activeSlide === 2} mode="paper" className="!text-6xl !mb-12">
            Tactile <span className="text-[#8B5E3C] italic font-serif">Design</span>
          </SlideHeading>

          <motion.div className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
            {[
              { title: "Natural Textures", text: "Uses real scanned paper assets for authentic feel." },
              { title: "Dynamic Lighting", text: "Shadows react to page turns in real-time." },
              { title: "Typography Focused", text: "Curated pairing of Inter and Playfair Display." },
              { title: "Component Based", text: "Build slides like Lego blocks with React." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                animate={activeSlide === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8 + i * 0.15 }}
              >
                {/* Custom Bullet */}
                <motion.div
                  className="absolute left-0 top-1.5 w-3 h-3 border-2 border-[#8B5E3C] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
                <h4 className="text-[#3E2723] font-bold text-xl mb-1">{item.title}</h4>
                <p className="text-[#5D4037] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 4: Video Integration
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 3}
          mode="cinematic"
          alignment="center"
          backgroundVideo="/videos/intro.mp4" // Placeholder check
          backgroundOverlay={
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <motion.div
                className="w-[1px] h-[100vh] bg-white/20 absolute left-1/2 -translate-x-1/2"
                initial={{ scaleY: 0 }}
                animate={activeSlide === 3 ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: "circIn" }}
              />
            </div>
          }
        >
          <div className="text-center relative z-10 bg-black/40 p-12 backdrop-blur-sm border-y border-white/10">
            <SlideLabel isActive={activeSlide === 3} className="text-white/60">Seamless Integration</SlideLabel>
            <SlideHeading isActive={activeSlide === 3} className="text-white !mb-0 !leading-tight">
              Video Backgrounds
            </SlideHeading>
            <p className="text-white/40 mt-4 italic">Supported natively. Just drop in /public/images.</p>
          </div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 5: CTA (Cinematic - Pulse)
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 4}
          mode="cinematic"
          alignment="center"
          className="bg-black"
          backgroundOverlay={
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Ripple Effect */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-white/5"
                  initial={{ width: "100px", height: "100px", opacity: 0 }}
                  animate={{
                    width: ["100px", "100vw"],
                    height: ["100px", "100vh"],
                    opacity: [0.5, 0]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 1.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          }
        >
          <SlideHeading isActive={activeSlide === 4} className="text-white text-center text-7xl font-black tracking-tighter mix-blend-difference">
            START CREATING
          </SlideHeading>

          <motion.button
            className="mt-8 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={activeSlide === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            Edit app/page.tsx
          </motion.button>
        </SlideTemplate>

      </PresentationController>
    </main>
  )
}
