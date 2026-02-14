"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel: Themed ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-valentine-rich relative overflow-hidden items-center justify-center">
        {/* Decorative hearts */}
        {[
          { size: 50, x: "10%", y: "15%", delay: 0, dur: 5 },
          { size: 35, x: "80%", y: "12%", delay: 1.5, dur: 6 },
          { size: 45, x: "20%", y: "70%", delay: 0.8, dur: 5.5 },
          { size: 30, x: "75%", y: "65%", delay: 2, dur: 6.5 },
          { size: 25, x: "50%", y: "85%", delay: 1, dur: 5.2 },
          { size: 20, x: "88%", y: "40%", delay: 2.5, dur: 7 },
        ].map((h, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: h.x, top: h.y }}
            animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width={h.size} height={h.size * 1.1} viewBox="0 0 60 66" fill="none">
              <path
                d="M30 55C30 55 5 38 5 20C5 10 13 3 22 3C26.5 3 30 6 30 6C30 6 33.5 3 38 3C47 3 55 10 55 20C55 38 30 55 30 55Z"
                fill={i % 2 === 0 ? "#9F1239" : "#FDA4AF"}
              />
              <ellipse cx="20" cy="18" rx="8" ry="10" fill="white" opacity="0.3" />
            </svg>
          </motion.div>
        ))}

        {/* Clouds at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-80">
          <svg viewBox="0 0 800 120" fill="none" className="w-full">
            <ellipse cx="120" cy="90" rx="140" ry="50" fill="white" opacity="0.6" />
            <ellipse cx="350" cy="85" rx="160" ry="55" fill="white" opacity="0.7" />
            <ellipse cx="600" cy="90" rx="150" ry="48" fill="white" opacity="0.55" />
            <ellipse cx="750" cy="95" rx="100" ry="40" fill="white" opacity="0.5" />
          </svg>
        </div>

        {/* Sparkles */}
        {[
          { x: "30%", y: "25%", d: 0 },
          { x: "65%", y: "30%", d: 1.2 },
          { x: "45%", y: "55%", d: 0.6 },
          { x: "20%", y: "50%", d: 2 },
          { x: "70%", y: "80%", d: 1.8 },
        ].map((s, i) => (
          <motion.div
            key={`s${i}`}
            className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
            style={{ left: s.x, top: s.y }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
            transition={{ duration: 2.5, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <Link href="/">
              <h1
                className="text-5xl font-bold text-white font-[var(--font-playfair)] mb-6"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.15)" }}
              >
                LoveNote
              </h1>
            </Link>
            <p
              className="text-white/90 text-lg leading-relaxed mb-8"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.1)" }}
            >
              Create a beautiful, animated love story
              and ask your valentine in style.
            </p>
            <div className="flex justify-center gap-6 text-white/70 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-1">{"\u{1F3A8}"}</div>
                <span>6 Templates</span>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">{"\u{1F4F8}"}</div>
                <span>Photos</span>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">{"\u{1F48C}"}</div>
                <span>Messages</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Mobile-only logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent font-[var(--font-playfair)]">
                LoveNote
              </h1>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Welcome back
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Sign in to continue crafting your valentine
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium border border-red-100"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-rose-400 focus:bg-white transition-all"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-400 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-rose-500 hover:text-rose-600 font-bold transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
