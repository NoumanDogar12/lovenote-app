"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function MusicPlayer({
  musicUrl,
  accentColor,
}: {
  musicUrl: string;
  accentColor: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!musicUrl) return null;

  // Extract YouTube embed URL
  const getEmbedUrl = (url: string) => {
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/
    );
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&loop=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(musicUrl);

  return (
    <>
      {/* Hidden iframe for audio */}
      {isPlaying && embedUrl && (
        <iframe
          src={embedUrl}
          allow="autoplay"
          className="hidden"
          title="Background music"
        />
      )}

      {/* Play/Pause button */}
      <motion.button
        onClick={() => {
          setIsPlaying(!isPlaying);
          setFaded(false);
        }}
        onHoverStart={() => setFaded(false)}
        onHoverEnd={() => setFaded(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{
          backgroundColor: accentColor,
          opacity: faded ? 0.5 : 1,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-white text-lg">
          {isPlaying ? "\u23F8" : "\u25B6"}
        </span>
      </motion.button>
    </>
  );
}
