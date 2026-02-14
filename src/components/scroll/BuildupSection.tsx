"use client";

import { motion } from "motion/react";
import { TemplateTheme } from "@/lib/templates";

export default function BuildupSection({
  recipientName,
  template,
}: {
  recipientName: string;
  template: TemplateTheme;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Pulsing background circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: template.colors.primary,
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            opacity: 0,
          }}
          whileInView={{
            opacity: [0, 0.05, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          viewport={{ once: false }}
          transition={{
            repeat: Infinity,
            duration: 3 + i,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="text-2xl md:text-3xl leading-relaxed mb-8 opacity-70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {recipientName || "My Love"}, I have something important to ask you...
        </motion.p>

        {/* Heartbeat animation */}
        <motion.div
          className="text-6xl"
          animate={{
            scale: [1, 1.2, 1, 1.3, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <span style={{ color: template.colors.primary }}>
            &#10084;
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
