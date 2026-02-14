"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { templates } from "@/lib/templates";
import ValentineDecorations from "@/components/ValentineDecorations";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-valentine-rich overflow-hidden">
        <ValentineDecorations />

        {/* Soft radial glow behind title */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Nav */}
        <nav className="relative z-20 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white font-[var(--font-playfair)] drop-shadow-sm">
            LoveNote
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="btn-valentine-outline px-5 py-2.5 rounded-xl text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-rose-700 hover:bg-rose-50 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.p
              className="text-white/90 text-sm font-semibold uppercase tracking-[0.3em] mb-5"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              Make it unforgettable
            </motion.p>

            <motion.h2
              className="text-6xl md:text-8xl font-bold text-white font-[var(--font-playfair)] mb-7 leading-[1.05]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              Ask Your Valentine
              <br />
              <span className="text-rose-200">In Style</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              Create a beautiful, animated love story website for your valentine.
              Pick a template, add your photos & messages, and share the magic.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
            >
              <Link
                href="/create"
                className="w-full sm:w-auto text-center bg-white text-rose-700 hover:bg-rose-50 px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-black/15 transition-all hover:-translate-y-1 hover:shadow-3xl"
              >
                Create Your Valentine
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto text-center btn-valentine-outline px-10 py-4 rounded-2xl text-lg font-semibold text-white"
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="relative z-10 bg-valentine py-28 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 right-[8%] w-64 h-64 rounded-full bg-rose-300/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[5%] w-48 h-48 rounded-full bg-pink-300/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Section header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 border border-rose-100/50 mb-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-rose-400">
                <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" fill="currentColor" />
              </svg>
              <span className="text-rose-500 text-xs font-bold uppercase tracking-[0.2em]">
                Simple as 1, 2, 3
              </span>
            </motion.div>
            <h3 className="text-4xl md:text-6xl font-bold text-rose-900 font-[var(--font-playfair)] leading-tight mb-4">
              Three Steps to
              <br />
              Their Heart
            </h3>
            <p className="text-rose-700/50 max-w-lg mx-auto text-base">
              Creating your perfect valentine takes just minutes. Here&apos;s how the magic happens.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 relative">
            {/* Connector line behind cards - desktop only */}
            <div className="hidden md:block absolute top-[88px] left-[16.67%] right-[16.67%] h-[2px] z-0">
              <div className="w-full h-full bg-gradient-to-r from-rose-300/60 via-pink-300/60 to-fuchsia-300/60 rounded-full" />
              {/* Animated pulse dots on the line */}
              <motion.div
                className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-400"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-2/3 -translate-y-1/2 w-2 h-2 rounded-full bg-fuchsia-400"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              />
            </div>

            {/* Step 1 - Pick a Template */}
            <motion.div
              className="relative z-10 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="bg-white/85 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/90 shadow-lg shadow-rose-100/20 hover:shadow-2xl hover:shadow-rose-200/30 transition-all duration-500 hover:-translate-y-2">
                {/* Card header with icon */}
                <div className="relative px-7 pt-7 pb-5">
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-300/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {/* Palette icon */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="13.5" cy="6.5" r=".5" fill="white" />
                          <circle cx="17.5" cy="10.5" r=".5" fill="white" />
                          <circle cx="8.5" cy="7.5" r=".5" fill="white" />
                          <circle cx="6.5" cy="12.5" r=".5" fill="white" />
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                        </svg>
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-rose-500 text-[11px] font-black flex items-center justify-center shadow-md border-2 border-rose-100">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-rose-900 font-[var(--font-playfair)]">
                        Pick a Template
                      </h4>
                      <p className="text-rose-400 text-xs font-medium mt-0.5">
                        Choose your style
                      </p>
                    </div>
                  </div>

                  <p className="text-rose-700/55 text-sm leading-relaxed">
                    Choose from 6 handcrafted themes, each with unique fonts, colors, and animations that set the perfect mood.
                  </p>
                </div>

                {/* Divider with gradient */}
                <div className="mx-7 h-px bg-gradient-to-r from-transparent via-rose-200/50 to-transparent" />

                {/* Features grid */}
                <div className="px-7 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", label: "Classic Romance" },
                      { icon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", label: "Dark Romance" },
                      { icon: "M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z", label: "Playful & Cute" },
                      { icon: "M4 4h16v16H4z", label: "Minimalist" },
                      { icon: "M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z", label: "Cinematic" },
                      { icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", label: "Storybook" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-rose-50/50 border border-rose-100/30 group-hover:bg-rose-50/80 transition-colors duration-300"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 flex-shrink-0">
                          <path d={item.icon} />
                        </svg>
                        <span className="text-[11px] text-rose-800/60 font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 - Make It Yours */}
            <motion.div
              className="relative z-10 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              <div className="bg-white/85 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/90 shadow-lg shadow-rose-100/20 hover:shadow-2xl hover:shadow-pink-200/30 transition-all duration-500 hover:-translate-y-2">
                {/* Card header with icon */}
                <div className="relative px-7 pt-7 pb-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-pink-300/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {/* Sparkle/customize icon */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-pink-500 text-[11px] font-black flex items-center justify-center shadow-md border-2 border-pink-100">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-rose-900 font-[var(--font-playfair)]">
                        Make It Yours
                      </h4>
                      <p className="text-pink-400 text-xs font-medium mt-0.5">
                        Personalize everything
                      </p>
                    </div>
                  </div>

                  <p className="text-rose-700/55 text-sm leading-relaxed">
                    Add your photos, write heartfelt messages, choose how you ask the big question, and even add music.
                  </p>
                </div>

                <div className="mx-7 h-px bg-gradient-to-r from-transparent via-pink-200/50 to-transparent" />

                <div className="px-7 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", label: "Up to 10 Photos" },
                      { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", label: "Love Messages" },
                      { icon: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3", label: "Playful Dodge" },
                      { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6h10v2H7z", label: "Cute Guilt Trip" },
                      { icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", label: "Sincere Ask" },
                      { icon: "M9 18V5l12-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", label: "Background Music" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-pink-50/50 border border-pink-100/30 group-hover:bg-pink-50/80 transition-colors duration-300"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 flex-shrink-0">
                          <path d={item.icon} />
                        </svg>
                        <span className="text-[11px] text-rose-800/60 font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 - Share the Magic */}
            <motion.div
              className="relative z-10 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <div className="bg-white/85 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/90 shadow-lg shadow-rose-100/20 hover:shadow-2xl hover:shadow-fuchsia-200/30 transition-all duration-500 hover:-translate-y-2">
                {/* Card header with icon */}
                <div className="relative px-7 pt-7 pb-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-400 flex items-center justify-center shadow-xl shadow-fuchsia-300/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {/* Share/send icon */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white text-fuchsia-500 text-[11px] font-black flex items-center justify-center shadow-md border-2 border-fuchsia-100">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-rose-900 font-[var(--font-playfair)]">
                        Share the Magic
                      </h4>
                      <p className="text-fuchsia-400 text-xs font-medium mt-0.5">
                        Send &amp; celebrate
                      </p>
                    </div>
                  </div>

                  <p className="text-rose-700/55 text-sm leading-relaxed">
                    Share the link and watch them scroll through your animated love story. Get notified the moment they respond!
                  </p>
                </div>

                <div className="mx-7 h-px bg-gradient-to-r from-transparent via-fuchsia-200/50 to-transparent" />

                <div className="px-7 py-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", label: "Shareable Link" },
                      { icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM17.5 14v.5M17.5 20.5v.5M14 17.5h.5M20.5 17.5h.5M14 14h3v3h-3zM18 18h3v3h-3z", label: "QR Code" },
                      { icon: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0", label: "Instant Alerts" },
                      { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3", label: "Response Tracking" },
                      { icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83", label: "30-Day Active" },
                      { icon: "M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z", label: "Celebration FX" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-fuchsia-50/50 border border-fuchsia-100/30 group-hover:bg-fuchsia-50/80 transition-colors duration-300"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400 flex-shrink-0">
                          <path d={item.icon} />
                        </svg>
                        <span className="text-[11px] text-rose-800/60 font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <Link
              href="/create"
              className="btn-premium inline-flex items-center justify-center gap-2.5 text-white px-10 py-4 rounded-2xl font-bold text-lg w-full sm:w-auto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Start Creating Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TEMPLATES SHOWCASE ── */}
      <section className="relative z-10 bg-valentine py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-rose-500/80 text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Handcrafted themes
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-rose-900 font-[var(--font-playfair)] mb-4">
              6 Stunning Templates
            </h3>
            <p className="text-rose-700/50 max-w-xl mx-auto">
              From classic romance to modern minimalist, find the perfect style
              for your love story
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {templates.map((t, i) => (
              <motion.div
                key={t.id}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
              >
                <div
                  className="h-44 md:h-60 flex items-center justify-center relative overflow-hidden"
                  style={{ background: t.previewGradient }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  <span
                    className="text-lg md:text-xl font-bold opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500 text-center px-4 relative z-10"
                    style={{
                      fontFamily: t.fonts.heading,
                      color:
                        t.colors.background === "#0A0A0A" ||
                        t.colors.background === "#1A1A1A"
                          ? t.colors.text
                          : t.colors.primary,
                    }}
                  >
                    Will you be my Valentine?
                  </span>
                </div>
                <div className="bg-white/90 backdrop-blur p-4">
                  <h4 className="font-bold text-rose-900 text-sm">
                    {t.name}
                  </h4>
                  <p className="text-xs text-rose-700/50 mt-0.5">
                    {t.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="relative z-10 bg-valentine-rich py-28 overflow-hidden">
        {/* Small decorative hearts */}
        <div className="absolute top-10 left-[10%] text-white/20 text-4xl pointer-events-none" style={{ animation: "float 7s ease-in-out infinite" }}>{"\u2665"}</div>
        <div className="absolute bottom-16 right-[12%] text-white/15 text-5xl pointer-events-none" style={{ animation: "float 9s ease-in-out infinite 2s" }}>{"\u2665"}</div>

        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <motion.div
            className="glass-card-strong rounded-[2rem] p-12 shadow-2xl shadow-rose-300/30"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-rose-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Simple pricing
            </p>
            <h3 className="text-5xl font-bold text-rose-900 mb-1 font-[var(--font-playfair)]">
              $9.99
            </h3>
            <p className="text-rose-700/50 mb-8 text-sm">
              One-time payment. No subscriptions. No hidden fees.
            </p>

            <ul className="text-left space-y-3.5 mb-10 max-w-xs mx-auto">
              {[
                "6 beautiful templates",
                "Up to 10 photos",
                "Custom love messages",
                "3 fun ask styles",
                "Shareable link + QR code",
                "Instant response notification",
                "30-day active page",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-rose-800/70 text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-[10px] font-bold">{"\u2713"}</span>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/create"
              className="btn-premium inline-block text-center text-white px-10 py-4 rounded-2xl font-bold text-lg w-full sm:w-auto"
            >
              Create Your Valentine
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 bg-rose-900 py-8 text-center text-sm text-rose-300/60">
        <p>
          Made with{" "}
          <span className="text-rose-400">{"\u2665"}</span>{" "}
          LoveNote &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
