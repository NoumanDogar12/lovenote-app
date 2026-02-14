"use client";

import { useState, useEffect, useRef } from "react";
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
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = musicUrl ? getVideoId(musicUrl) : null;

  // Fade button after 3s
  useEffect(() => {
    const timer = setTimeout(() => setFaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-start on first user interaction
  useEffect(() => {
    if (!videoId || started) return;

    function handleInteraction() {
      setStarted(true);
      setIsPlaying(true);
      cleanup();
    }

    function cleanup() {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    }

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return cleanup;
  }, [videoId, started]);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&enablejsapi=1`;

  const handleToggle = () => {
    if (!started) {
      setStarted(true);
      setIsPlaying(true);
    } else if (isPlaying) {
      // Post message to iframe to pause
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        "*"
      );
      setIsPlaying(false);
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );
      setIsPlaying(true);
    }
    setFaded(false);
  };

  return (
    <>
      {/* YouTube iframe — only rendered after user interaction */}
      {started && (
        <iframe
          ref={iframeRef}
          src={embedUrl}
          allow="autoplay; encrypted-media"
          style={{
            position: "fixed",
            width: 1,
            height: 1,
            left: 0,
            bottom: 0,
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
            border: "none",
          }}
          title="Background music"
        />
      )}

      {/* Play/Pause button */}
      <motion.button
        onClick={handleToggle}
        onHoverStart={() => setFaded(false)}
        onHoverEnd={() => setFaded(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-opacity"
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
