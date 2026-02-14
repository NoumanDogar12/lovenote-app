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

        {/* Large radial glow behind title */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(225,29,72,0.25) 0%, rgba(251,113,133,0.12) 40%, transparent 70%)",
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
              className="bg-white text-rose-600 hover:bg-rose-50 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-rose-900/10 transition-all hover:-translate-y-0.5"
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
              className="text-white/80 text-sm font-semibold uppercase tracking-[0.3em] mb-5 drop-shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              Make it unforgettable
            </motion.p>

            <motion.h2
              className="text-6xl md:text-8xl font-bold text-white font-[var(--font-playfair)] mb-7 leading-[1.05] drop-shadow-md"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              Ask Your Valentine
              <br />
              <span className="text-rose-100">In Style</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            >
              Create a beautiful, animated love story website for your valentine.
              Pick a template, add your photos & messages, and share the magic.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
            >
              <Link
                href="/create"
                className="bg-white text-rose-600 hover:bg-rose-50 px-10 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-rose-900/15 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                Create Your Valentine
              </Link>
              <a
                href="#how-it-works"
                className="btn-valentine-outline px-10 py-4 rounded-2xl text-lg font-semibold"
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
        className="relative z-10 bg-valentine py-28"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-rose-500/80 text-xs font-bold uppercase tracking-[0.3em] mb-3">
              Simple as 1, 2, 3
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-rose-900 font-[var(--font-playfair)]">
              Three Steps to Their Heart
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Pick a Template",
                description:
                  "Choose from 6 beautiful themes that match your love story style",
                emoji: "\u{1F3A8}",
              },
              {
                step: "2",
                title: "Make It Yours",
                description:
                  "Add your photos, write heartfelt messages, and choose the ask style",
                emoji: "\u{2764}\u{FE0F}",
              },
              {
                step: "3",
                title: "Share the Magic",
                description:
                  "Send the link and watch them scroll through your love story",
                emoji: "\u{2728}",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="glass-card-strong rounded-3xl p-8 text-center group hover:shadow-xl hover:shadow-rose-200/40 transition-all duration-500 hover:-translate-y-2"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease }}
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500">
                  {item.emoji}
                </div>
                <div className="text-xs text-rose-400 font-bold uppercase tracking-[0.2em] mb-2">
                  Step {item.step}
                </div>
                <h4 className="text-xl font-bold text-rose-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-rose-700/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              className="btn-premium inline-block text-white px-10 py-4 rounded-2xl font-bold text-lg"
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
