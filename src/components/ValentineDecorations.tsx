"use client";

import { motion } from "motion/react";

/* SVG heart balloon with highlight and string */
function HeartBalloon({
  color,
  size,
  x,
  y,
  delay,
  duration,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) {
  const lighter =
    color === "#BE123C"
      ? "#F9A8D4"
      : color === "#E11D48"
        ? "#FBB6CE"
        : "#FECDD3";
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 60 78"
        fill="none"
      >
        {/* Heart shape */}
        <path
          d="M30 55C30 55 5 38 5 20C5 10 13 3 22 3C26.5 3 30 6 30 6C30 6 33.5 3 38 3C47 3 55 10 55 20C55 38 30 55 30 55Z"
          fill={color}
        />
        {/* Glossy highlight */}
        <ellipse cx="20" cy="18" rx="8" ry="10" fill={lighter} opacity="0.45" />
        {/* String */}
        <path
          d="M30 55 C28 62, 32 68, 30 78"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

/* Soft cloud shape */
function Cloud({ x, y, width, flip }: { x: string; y: string; width: number; flip?: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        bottom: y,
        width,
        transform: flip ? "scaleX(-1)" : undefined,
        opacity: 0.7,
      }}
    >
      <svg viewBox="0 0 200 80" fill="none" width="100%">
        <ellipse cx="60" cy="55" rx="60" ry="28" fill="white" opacity="0.8" />
        <ellipse cx="100" cy="45" rx="50" ry="35" fill="white" opacity="0.9" />
        <ellipse cx="145" cy="55" rx="55" ry="25" fill="white" opacity="0.75" />
        <ellipse cx="35" cy="60" rx="35" ry="20" fill="white" opacity="0.6" />
        <ellipse cx="165" cy="60" rx="35" ry="20" fill="white" opacity="0.6" />
      </svg>
    </div>
  );
}

/* Tiny floating sparkle/dot */
function Sparkle({ x, y, delay, size }: { x: string; y: string; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function ValentineDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Heart balloons */}
      <HeartBalloon color="#BE123C" size={55} x="5%" y="12%" delay={0} duration={5} />
      <HeartBalloon color="#E11D48" size={40} x="15%" y="25%" delay={1.2} duration={6} />
      <HeartBalloon color="#FB7185" size={48} x="82%" y="8%" delay={0.5} duration={5.5} />
      <HeartBalloon color="#BE123C" size={35} x="90%" y="22%" delay={2} duration={6.5} />
      <HeartBalloon color="#FDA4AF" size={30} x="75%" y="35%" delay={1.8} duration={5.2} />
      <HeartBalloon color="#E11D48" size={42} x="8%" y="45%" delay={0.8} duration={6} />
      <HeartBalloon color="#FB7185" size={28} x="70%" y="55%" delay={2.5} duration={5.8} />
      <HeartBalloon color="#BE123C" size={38} x="92%" y="48%" delay={1} duration={5.5} />

      {/* Small hearts scattered */}
      <HeartBalloon color="#FDA4AF" size={20} x="25%" y="15%" delay={3} duration={7} />
      <HeartBalloon color="#FECDD3" size={18} x="60%" y="18%" delay={2.2} duration={6.8} />
      <HeartBalloon color="#FB7185" size={22} x="45%" y="60%" delay={1.5} duration={5} />

      {/* Clouds at bottom */}
      <Cloud x="-5%" y="-10px" width={280} />
      <Cloud x="55%" y="-15px" width={320} flip />
      <Cloud x="25%" y="-5px" width={250} />

      {/* Sparkles */}
      <Sparkle x="20%" y="30%" delay={0} size={4} />
      <Sparkle x="78%" y="15%" delay={1.5} size={3} />
      <Sparkle x="50%" y="45%" delay={0.8} size={5} />
      <Sparkle x="35%" y="65%" delay={2} size={3} />
      <Sparkle x="85%" y="40%" delay={1.2} size={4} />
      <Sparkle x="12%" y="55%" delay={2.5} size={3} />
      <Sparkle x="65%" y="70%" delay={0.5} size={4} />
    </div>
  );
}
