"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";

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
    <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div
        className="absolute top-20 left-[15%] w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.4) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute top-1/3 right-[25%] w-48 h-48 rounded-full opacity-10 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(190,18,60,0.3) 0%, transparent 70%)",
          animation: "float 7s ease-in-out infinite 4s",
        }}
      />

      {/* Floating hearts */}
      {["top-[15%] left-[8%]", "bottom-[20%] left-[18%]", "top-[25%] right-[12%]", "bottom-[35%] right-[8%]", "top-[60%] left-[5%]"].map(
        (pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} text-rose-200 pointer-events-none select-none`}
            style={{
              fontSize: `${16 + i * 6}px`,
              opacity: 0.15 + i * 0.03,
              animation: `float ${6 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
            }}
          >
            {"\u2665"}
          </div>
        )
      )}

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="inline-block group">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent font-[var(--font-playfair)] group-hover:from-rose-600 group-hover:to-pink-600 transition-all duration-500">
              LoveNote
            </h1>
          </Link>
          <p className="text-gray-400 mt-3 text-sm tracking-wide">
            Welcome back, lovebird
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass-card-strong rounded-3xl shadow-2xl shadow-rose-100/50 p-8 md:p-10 space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {error && (
            <motion.div
              className="bg-red-50/80 backdrop-blur text-red-500 px-4 py-3 rounded-xl text-sm font-medium border border-red-100"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-premium w-full px-4 py-3.5 rounded-xl text-gray-800 placeholder:text-gray-300 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-premium w-full px-4 py-3.5 rounded-xl text-gray-800 placeholder:text-gray-300 focus:outline-none"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full text-white font-semibold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
              className="text-rose-500 hover:text-rose-600 font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
}
