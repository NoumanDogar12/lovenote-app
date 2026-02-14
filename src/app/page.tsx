"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { templates } from "@/lib/templates";
import HeartParticles from "@/components/HeartParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-premium overflow-hidden relative">
      <HeartParticles colors={["#C41E3A", "#FFB6C1", "#FF69B4"]} />

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-[var(--font-playfair)]">
          LoveNote
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="btn-outline-premium text-rose-600 px-5 py-2.5 rounded-xl text-sm font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="btn-premium text-white px-5 py-2.5 rounded-xl text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.p
            className="text-rose-400/80 text-sm font-semibold uppercase tracking-[0.25em] mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Make it unforgettable
          </motion.p>
          <motion.h2
            className="text-6xl md:text-8xl font-bold text-gray-900 font-[var(--font-playfair)] mb-7 leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            Ask Your Valentine
            <br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
              In Style
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
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
              className="btn-premium text-white px-10 py-4 rounded-2xl text-lg font-semibold"
            >
              Create Your Valentine
            </Link>
            <a
              href="#how-it-works"
              className="btn-outline-premium text-rose-600 px-10 py-4 rounded-2xl text-lg font-semibold"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 max-w-5xl mx-auto px-6 py-28"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-rose-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Simple as 1, 2, 3
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 font-[var(--font-playfair)]">
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
              className="glass-card rounded-3xl p-8 text-center group hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease }}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500">
                {item.emoji}
              </div>
              <div className="text-xs text-rose-400/60 font-bold uppercase tracking-[0.2em] mb-2">
                Step {item.step}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates showcase */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-28">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-rose-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Handcrafted themes
          </p>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 font-[var(--font-playfair)] mb-4">
            6 Stunning Templates
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            From classic romance to modern minimalist, find the perfect style
            for your love story
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-rose-100/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
            >
              <div
                className="h-44 md:h-60 flex items-center justify-center relative overflow-hidden"
                style={{ background: t.previewGradient }}
              >
                {/* Hover overlay */}
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
              <div className="bg-white p-4">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {t.name}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 max-w-xl mx-auto px-6 py-28 text-center">
        <motion.div
          className="glass-card-strong rounded-[2rem] p-12 shadow-2xl shadow-rose-100/30"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-rose-400/70 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Simple pricing
          </p>
          <h3 className="text-5xl font-bold text-gray-900 mb-1 font-[var(--font-playfair)]">
            $9.99
          </h3>
          <p className="text-gray-400 mb-8 text-sm">
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
                className="flex items-center gap-3 text-gray-600 text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-rose-400 text-xs">{"\u2713"}</span>
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/create"
            className="btn-premium inline-block text-white px-10 py-4 rounded-2xl font-semibold text-lg"
          >
            Create Your Valentine
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-rose-100/50 py-8 text-center text-sm text-gray-300">
        <p>
          Made with{" "}
          <span className="text-rose-300">{"\u2665"}</span>{" "}
          LoveNote &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
