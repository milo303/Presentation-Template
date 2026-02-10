"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PresentationController } from "@/components/presentation/presentation-controller"
import { SlideTemplate, SlideHeading, SlideBody, SlideLabel } from "@/components/presentation/slide-template"

// ============================================================
// 🎯 EXAMPLE SLIDES — Delete all slides below and replace
//    with your own content. These are here to showcase
//    what the engine can do. Simply ask the AI:
//    "Delete all example slides and start fresh."
// ============================================================

const TOTAL_SLIDES = 5

export default function PresentationTemplate() {
  const [activeSlide, setActiveSlide] = useState(0)

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
          className="bg-black"
          backgroundOverlay={
            <div className="absolute inset-0">
              {/* Animated gradient orbs */}
              <motion.div
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[120px]"
                style={{ background: "radial-gradient(circle, #c8a24e 0%, transparent 70%)" }}
                animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[100px]"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
                animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full opacity-15 blur-[80px]"
                style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }}
                animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          }
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={activeSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Decorative line */}
            <motion.div
              className="w-16 h-[2px] bg-gold mb-6"
              initial={{ scaleX: 0 }}
              animate={activeSlide === 0 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
          <SlideLabel isActive={activeSlide === 0} className="text-gold/80 tracking-[0.5em]">
            Example Presentation
          </SlideLabel>
          <SlideHeading isActive={activeSlide === 0} className="text-white text-center max-w-4xl">
            The Art of{" "}
            <span className="bg-gradient-to-r from-gold via-amber-300 to-gold bg-clip-text text-transparent">
              Visual Storytelling
            </span>
          </SlideHeading>
          <SlideBody isActive={activeSlide === 0} className="text-white/50 text-center max-w-2xl mt-4">
            A showcase of what this presentation engine can do.
            <br />
            <span className="text-[0.85rem] text-white/30 mt-4 inline-block">Press → or click to navigate</span>
          </SlideBody>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 2: Stats / Metrics (Cinematic)
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 1}
          mode="cinematic"
          alignment="center"
          className="bg-[#0a0a1a]"
          backgroundOverlay={
            <div className="absolute inset-0">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px"
                }}
              />
              {/* Accent glow */}
              <motion.div
                className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] rounded-full opacity-10 blur-[100px]"
                style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          }
        >
          <SlideLabel isActive={activeSlide === 1} className="text-indigo-400/70 tracking-[0.4em]">
            By the Numbers
          </SlideLabel>
          <SlideHeading isActive={activeSlide === 1} className="text-white text-center">
            Built for Impact
          </SlideHeading>
          <motion.div
            className="grid grid-cols-3 gap-12 mt-12 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={activeSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { value: "60fps", label: "Smooth Animations", color: "from-indigo-400 to-violet-400" },
              { value: "2", label: "Transition Modes", color: "from-amber-400 to-orange-400" },
              { value: "∞", label: "Customization", color: "from-emerald-400 to-teal-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={activeSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.1)" }}
              >
                <span className={`text-[clamp(2rem,3vw,3.5rem)] font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <span className="text-white/40 text-sm uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 3: Feature List (Paper Mode)
            ────────────────────────────────────────────────── */}
        <SlideTemplate isActive={activeSlide === 2} mode="paper" alignment="center">
          <SlideLabel isActive={activeSlide === 2} mode="paper" className="tracking-[0.4em]">
            Capabilities
          </SlideLabel>
          <SlideHeading isActive={activeSlide === 2} mode="paper">
            Everything You Need
          </SlideHeading>
          <motion.div
            className="grid grid-cols-2 gap-6 mt-8 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={activeSlide === 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { icon: "🎬", title: "Cinematic Mode", desc: "Full-bleed backgrounds with dramatic overlays" },
              { icon: "📜", title: "Paper Mode", desc: "Textured, tactile feel with torn paper edges" },
              { icon: "📖", title: "Book Flip", desc: "3D page-turn transitions with realistic shadows" },
              { icon: "⌨️", title: "Keyboard Nav", desc: "Arrow keys, Space, Enter — plus 'F' for fullscreen" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#5C4033]/5 border border-[#5C4033]/10"
                initial={{ opacity: 0, x: -20 }}
                animate={activeSlide === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#7A2E2E]">{feature.title}</h3>
                  <p className="text-[#2A1A11]/60 text-sm mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 4: Quote / Cinematic Highlight
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 3}
          mode="cinematic"
          alignment="center"
          className="bg-[#0f0f0f]"
          backgroundOverlay={
            <div className="absolute inset-0">
              {/* Cinematic film grain feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/40 via-transparent to-[#0a1a2e]/30" />
              <motion.div
                className="absolute top-[15%] left-[50%] -translate-x-1/2 w-[1px] h-[70%] bg-gradient-to-b from-transparent via-gold/30 to-transparent"
                initial={{ scaleY: 0 }}
                animate={activeSlide === 3 ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          }
        >
          <motion.div
            className="text-[4rem] leading-none text-gold/30 font-serif"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={activeSlide === 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            &ldquo;
          </motion.div>
          <SlideHeading isActive={activeSlide === 3} className="text-white/90 text-center max-w-3xl !text-[clamp(1.8rem,2.5vw+0.8rem,3rem)] !leading-[1.3] italic font-light">
            Presentations should feel like cinema — every slide a scene, every transition a cut.
          </SlideHeading>
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={activeSlide === 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="w-10 h-[1px] bg-gold/40" />
            <span className="text-white/30 text-sm uppercase tracking-[0.3em] mt-2">Template Motto</span>
          </motion.div>
        </SlideTemplate>

        {/* ──────────────────────────────────────────────────
            EXAMPLE SLIDE 5: Call to Action / Closing
            ────────────────────────────────────────────────── */}
        <SlideTemplate
          isActive={activeSlide === 4}
          mode="cinematic"
          alignment="center"
          className="bg-black"
          backgroundOverlay={
            <div className="absolute inset-0 overflow-hidden">
              {/* Animated concentric rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
                  style={{
                    width: `${ring * 30}%`,
                    height: `${ring * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 4 + ring,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: ring * 0.5,
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-black/30" />
            </div>
          }
        >
          <SlideLabel isActive={activeSlide === 4} className="text-gold/60 tracking-[0.5em]">
            Get Started
          </SlideLabel>
          <SlideHeading isActive={activeSlide === 4} className="text-white text-center">
            Make It{" "}
            <span className="bg-gradient-to-r from-gold to-amber-300 bg-clip-text text-transparent">
              Yours
            </span>
          </SlideHeading>
          <motion.div
            className="mt-8 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSlide === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-white/40 text-center max-w-xl text-lg">
              Delete these example slides and start building your story.
              <br />
              Just tell the AI what you need.
            </p>
            <motion.div
              className="mt-4 px-8 py-3 rounded-full border border-gold/30 bg-gold/5 text-gold/80 text-sm uppercase tracking-[0.3em]"
              animate={{ borderColor: ["rgba(200,162,78,0.3)", "rgba(200,162,78,0.6)", "rgba(200,162,78,0.3)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Edit app/page.tsx to begin
            </motion.div>
          </motion.div>
        </SlideTemplate>

      </PresentationController>
    </main>
  )
}
