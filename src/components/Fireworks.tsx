"use client";

import { useEffect, useCallback } from "react";
import { confetti } from "@tsparticles/confetti";

interface FireworksProps {
  /** Keep launching bursts on a loop */
  loop?: boolean;
  /** Interval in ms between bursts (default 2500) */
  interval?: number;
  /** Color palette — falls back to valentine reds/pinks */
  colors?: string[];
  /** How many initial bursts to fire immediately */
  initialBursts?: number;
}

export default function Fireworks({
  loop = true,
  interval = 2500,
  colors,
  initialBursts = 3,
}: FireworksProps) {
  const palette = colors ?? [
    "#FF69B4",
    "#FF1493",
    "#FF6B9D",
    "#FFD700",
    "#C084FC",
    "#FB7185",
    "#F43F5E",
    "#EC4899",
    "#FCA5A5",
    "#FBBF24",
  ];

  const fireBurst = useCallback(() => {
    const x = 0.2 + Math.random() * 0.6;
    const y = 0.2 + Math.random() * 0.4;

    confetti({
      particleCount: 80 + Math.floor(Math.random() * 60),
      spread: 70 + Math.random() * 50,
      origin: { x, y },
      colors: palette.sort(() => Math.random() - 0.5).slice(0, 5),
      ticks: 200,
      gravity: 1.2,
      scalar: 1.1,
      drift: (Math.random() - 0.5) * 0.5,
      shapes: ["circle", "square"],
    });

    // Second smaller burst offset slightly for "starburst" feel
    setTimeout(() => {
      confetti({
        particleCount: 30 + Math.floor(Math.random() * 30),
        spread: 100,
        origin: { x: x + (Math.random() - 0.5) * 0.1, y: y - 0.05 },
        colors: ["#FFD700", "#FFF", "#FF69B4"],
        ticks: 150,
        gravity: 0.8,
        scalar: 0.8,
        shapes: ["star"],
        startVelocity: 30,
      });
    }, 150);
  }, [palette]);

  useEffect(() => {
    // Fire initial bursts staggered
    for (let i = 0; i < initialBursts; i++) {
      setTimeout(() => fireBurst(), i * 400);
    }

    if (!loop) return;

    const timer = setInterval(fireBurst, interval);
    return () => clearInterval(timer);
  }, [fireBurst, loop, interval, initialBursts]);

  return null; // confetti renders to a global canvas
}
