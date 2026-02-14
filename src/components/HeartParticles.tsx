"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function HeartParticles({ colors }: { colors: string[] }) {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
      travel: number;
      sway: number;
    }[]
  >([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 30;
    const height = window.innerHeight;

    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      travel: -(height + 100),
      sway: Math.sin(i) * 40,
    }));

    setParticles(generated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            bottom: "-20px",
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: 0.3,
          }}
          animate={{
            y: [0, p.travel],
            x: [0, p.sway],
            rotate: [0, 360],
            opacity: [0, 0.4, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          &#10084;
        </motion.div>
      ))}
    </div>
  );
}
