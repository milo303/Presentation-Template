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

  // Mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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
              {/* Parallax Background Elements */}
              <motion.div
                className="absolute inset-0"
                animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
                transition={{ type: "tween", ease: "linear", duration: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(200,162,78,0.15),transparent_70%)]" />
              </motion.div>

              {/* Orbital Rings - Enhanced */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full border border-gold/10"
                style={{ rotateX: 60 }}
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-gold/20 dashed"
                style={{ rotateX: 60, rotateY: 10 }}
                animate={{ rotateZ: [360, 0] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing Orbs */}
              <motion.div
                className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
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
            EXAMPLE SLIDE 2: Stats / Metrics (Cinematic - 3D Cards)
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 1}
          mode="cinematic"
          alignment="center"
          className="bg-[#050510]"
          backgroundOverlay={
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050510] to-[#050510]"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              {/* Animated Grid */}
              <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
              />
            </div>
          }
        >
          <SlideLabel isActive={activeSlide === 1} className="text-indigo-400 tracking-[0.4em] mb-8">Performance Metrics</SlideLabel>
          <div className="grid grid-cols-3 gap-8 w-full max-w-6xl perspective-[2000px]">
            {[
              { label: "Frame Rate", value: "60", suffix: "FPS", desc: "Silky smooth animations driven by framer-motion", color: "from-blue-400 to-indigo-500" },
              { label: "Deployment", value: "0.1", suffix: "s", desc: "Instant static generation with Next.js App Router", color: "from-fuchsia-400 to-purple-500" },
              { label: "Customizability", value: "100", suffix: "%", desc: "Fully hackable Tailwind CSS styling architecture", color: "from-emerald-400 to-teal-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateX: 90, y: 100 }}
                animate={activeSlide === 1 ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 0, rotateX: 90, y: 100 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                <TiltCard className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-xl relative group overflow-hidden">
                  {/* Card Glo Effect */}
                  <div className={`absolute -inset-full w-[300%] h-[300%] bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl p-20`} />

                  <h3 className="text-white/40 text-sm font-mono uppercase tracking-widest mb-4">{stat.label}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</span>
                    <span className="text-2xl text-white/50 font-light">{stat.suffix}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{stat.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
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
