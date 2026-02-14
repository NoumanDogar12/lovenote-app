"use client";

import { motion } from "motion/react";
import { TemplateTheme } from "@/lib/templates";

export default function IntroSection({
  recipientName,
  message,
  template,
}: {
  recipientName: string;
  message: string;
  template: TemplateTheme;
}) {
  const isSpring = template.animationStyle === "bouncy";
  const transition = isSpring
    ? { type: "spring" as const, damping: 15, stiffness: 100 }
    : { duration: 1.2, ease: "easeOut" as const };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative circles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{ backgroundColor: template.colors.primary }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: template.colors.secondary }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.5 }}
      >
        <motion.p
          className="text-sm uppercase tracking-[0.3em] mb-6 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A message for you
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          style={{ fontFamily: template.fonts.heading, color: template.colors.primary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.8 }}
        >
          {recipientName || "My Love"}
        </motion.h1>

        {message && (
          <motion.p
            className="text-lg md:text-xl leading-relaxed opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest opacity-40">
          Scroll down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 rounded-full flex justify-center pt-1"
          style={{ borderColor: template.colors.primary + "40" }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: template.colors.primary }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
