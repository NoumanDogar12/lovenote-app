"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TemplateTheme } from "@/lib/templates";
import Fireworks from "@/components/Fireworks";

// Flower SVG component
function FlowerSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* 5 petals */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="20"
          cy="10"
          rx="6"
          ry="10"
          fill={color}
          opacity="0.85"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      {/* Center */}
      <circle cx="20" cy="20" r="5" fill="#FFD700" />
    </svg>
  );
}

type Particle = {
  id: number;
  x: number;
  type: "flower" | "heart" | "confetti" | "sparkle";
  color: string;
  size: number;
  delay: number;
  duration: number;
};

function ParticleRenderer({ particles }: { particles: Particle[] }) {
  return (
    <>
      {particles.map((p) => {
        if (p.type === "flower") {
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: `${p.x}%`, bottom: "-60px" }}
              initial={{ y: 0, opacity: 0, rotate: 0 }}
              animate={{
                y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 100],
                opacity: [0, 1, 0.9, 0],
                rotate: [0, Math.random() > 0.5 ? 360 : -360],
                x: [0, Math.sin(p.id) * 40],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <FlowerSVG color={p.color} size={p.size} />
            </motion.div>
          );
        }

        if (p.type === "heart") {
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                bottom: "-40px",
                fontSize: `${p.size}px`,
                color: p.color,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800)],
                opacity: [0, 0.8, 0],
                x: [0, Math.sin(p.id * 0.5) * 30],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              &#10084;
            </motion.div>
          );
        }

        if (p.type === "confetti") {
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: "-20px",
                width: p.size,
                height: p.size * 0.6,
                backgroundColor: p.color,
                borderRadius: "2px",
              }}
              initial={{ y: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: [0, (typeof window !== "undefined" ? window.innerHeight : 800) + 50],
                rotate: [0, Math.random() * 720],
                opacity: [1, 1, 0],
                x: [0, Math.sin(p.id) * 40],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          );
        }

        // sparkle
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${Math.random() * 80 + 10}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </>
  );
}

export default function CelebrationSection({
  senderName,
  recipientName,
  template,
}: {
  senderName: string;
  recipientName: string;
  template: TemplateTheme;
}) {
  const [leftParticles, setLeftParticles] = useState<Particle[]>([]);
  const [rightParticles, setRightParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      template.colors.primary,
      template.colors.secondary,
      template.colors.accent,
      "#FF69B4",
      "#FFD700",
      "#FF6B9D",
      "#C084FC",
      "#FB7185",
    ];

    const flowerColors = ["#FF69B4", "#FF6B9D", "#FB7185", "#F472B6", "#EC4899", "#C084FC", "#A78BFA", "#FFD700"];

    const left: Particle[] = [];
    const right: Particle[] = [];

    // Helper: x position within a strip (0-100% of that strip's width)
    const randX = () => Math.random() * 100;
    // Helper: pick left or right array
    const pickSide = () => (Math.random() > 0.5 ? left : right);

    // Flowers rising from bottom
    for (let i = 0; i < 18; i++) {
      pickSide().push({
        id: i,
        x: randX(),
        type: "flower",
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        size: Math.random() * 20 + 20,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 4,
      });
    }

    // Hearts
    for (let i = 0; i < 15; i++) {
      pickSide().push({
        id: 100 + i,
        x: randX(),
        type: "heart",
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 14,
        delay: Math.random() * 3,
        duration: Math.random() * 5 + 3,
      });
    }

    // Confetti falling from top
    for (let i = 0; i < 40; i++) {
      pickSide().push({
        id: 200 + i,
        x: randX(),
        type: "confetti",
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 1.5,
        duration: Math.random() * 3 + 2,
      });
    }

    // Sparkles
    for (let i = 0; i < 12; i++) {
      pickSide().push({
        id: 300 + i,
        x: randX(),
        type: "sparkle",
        color: "#FFD700",
        size: Math.random() * 6 + 3,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 1.5,
      });
    }

    setLeftParticles(left);
    setRightParticles(right);
  }, [template]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Fireworks celebration */}
      <Fireworks
        loop={true}
        interval={2000}
        colors={[
          template.colors.primary,
          template.colors.secondary,
          template.colors.accent,
          "#FF69B4",
          "#FFD700",
          "#C084FC",
          "#FB7185",
          "#FBBF24",
        ]}
        initialBursts={5}
      />

      {/* Left edge strip — clipped so particles can't enter center */}
      <div className="absolute top-0 left-0 w-[22%] h-full pointer-events-none overflow-hidden">
        <ParticleRenderer particles={leftParticles} />
      </div>

      {/* Right edge strip — clipped so particles can't enter center */}
      <div className="absolute top-0 right-0 w-[22%] h-full pointer-events-none overflow-hidden">
        <ParticleRenderer particles={rightParticles} />
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
      >
        {/* Bouncing heart */}
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          {"\u{1F496}"}
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {recipientName ? `${recipientName} said YES!` : "They said YES!"}
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl opacity-70 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8 }}
        >
          Happy Valentine&apos;s Day, from {senderName || "your valentine"}
        </motion.p>

        {/* Row of bouncing hearts */}
        <div className="flex justify-center gap-3">
          {[...Array(7)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl md:text-3xl"
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: [-20, 0, -20],
                opacity: 1,
              }}
              transition={{
                delay: 1 + i * 0.15,
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: template.colors.primary }}
            >
              &#10084;
            </motion.span>
          ))}
        </div>

        {/* Flower ring */}
        <div className="flex justify-center gap-2 mt-8">
          {["#FF69B4", "#FFD700", "#FF6B9D", "#C084FC", "#FB7185"].map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
            >
              <FlowerSVG color={color} size={28} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
