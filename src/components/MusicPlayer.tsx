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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const startedRef = useRef(false);

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

  // Create iframe imperatively to preserve user gesture context
  const startMusic = () => {
    if (!videoId || startedRef.current) return;
    startedRef.current = true;

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.title = "Background music";
    iframe.style.cssText =
      "position:fixed;width:1px;height:1px;left:0;bottom:0;opacity:0;pointer-events:none;z-index:-1;border:none;";
    document.body.appendChild(iframe);
    iframeRef.current = iframe;
    setIsPlaying(true);
  };

  // Auto-start on first user interaction — imperatively, not through React state
  useEffect(() => {
    if (!videoId) return;

    function handleInteraction() {
      startMusic();
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

    return () => {
      cleanup();
      // Remove iframe on unmount
      if (iframeRef.current) {
        iframeRef.current.remove();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  if (!videoId) return null;

  const handleToggle = () => {
    if (!startedRef.current) {
      startMusic();
      setFaded(false);
      return;
    }

    if (isPlaying) {
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
  );
}
