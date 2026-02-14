"use client";

import { motion } from "motion/react";
import { TemplateTheme } from "@/lib/templates";
import CelebrationOverlay from "@/components/CelebrationOverlay";

export default function CelebrationSection({
  senderName,
  recipientName,
  template,
}: {
  senderName: string;
  recipientName: string;
  template: TemplateTheme;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <CelebrationOverlay template={template} />

      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="text-7xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {"\u{1F496}"}
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          {recipientName ? `${recipientName} said YES!` : "They said YES!"}
        </motion.h2>

        <motion.p
          className="text-xl opacity-70 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          Happy Valentine&apos;s Day, from {senderName || "your valentine"}
        </motion.p>

        {/* Floating hearts */}
        <div className="flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              initial={{ y: 0, opacity: 0 }}
              whileInView={{
                y: [-20, 0, -20],
                opacity: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 1.5 + i * 0.2,
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: template.colors.primary }}
            >
              &#10084;
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
