"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TemplateTheme } from "@/lib/templates";

export default function CelebrationOverlay({
  template,
}: {
  template: TemplateTheme;
}) {
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; color: string; size: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const colors = [
      template.colors.primary,
      template.colors.secondary,
      template.colors.accent,
      "#FFD700",
      "#FF69B4",
    ];

    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -(Math.random() * 20),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
    }));

    setConfetti(pieces);
  }, [template]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
            borderRadius: "2px",
          }}
          initial={{
            y: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: [0, window?.innerHeight || 800],
            rotate: [0, piece.rotation + 720],
            opacity: [1, 1, 0],
            x: [0, Math.sin(piece.id) * 100],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 1,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Floating hearts */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "0%",
            color: template.colors.primary,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -(window?.innerHeight || 800)],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        >
          &#10084;
        </motion.div>
      ))}
    </div>
  );
}
