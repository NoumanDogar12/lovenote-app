"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

declare global {
  interface Window {
    YT: {
      Player: new (
        el: string | HTMLElement,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars: Record<string, number>;
          events: Record<string, (e: { target: { playVideo: () => void } }) => void>;
        }
      ) => { playVideo: () => void; pauseVideo: () => void; destroy: () => void };
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer({
  musicUrl,
  accentColor,
}: {
  musicUrl: string;
  accentColor: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [faded, setFaded] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);
  const playerRef = useRef<{ playVideo: () => void; pauseVideo: () => void; destroy: () => void } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);

  // Extract YouTube video ID
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = musicUrl ? getVideoId(musicUrl) : null;

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId) return;
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    // Check if script is already loading
    const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!existing) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    // Store previous callback to chain if needed
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      setApiReady(true);
    };

    // Poll as fallback in case callback already fired
    const poll = setInterval(() => {
      if (window.YT && window.YT.Player) {
        setApiReady(true);
        clearInterval(poll);
      }
    }, 200);

    return () => clearInterval(poll);
  }, [videoId]);

  const initPlayer = useCallback(() => {
    if (!videoId || !apiReady || !containerRef.current) return;
    if (playerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: "0",
      width: "0",
      videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId as unknown as number,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (e: { target: { playVideo: () => void } }) => {
          e.target.playVideo();
          setIsPlaying(true);
        },
      },
    });
  }, [videoId, apiReady]);

  // Track user interaction from mount — runs before API is ready
  useEffect(() => {
    if (!videoId || autoStarted) return;

    function markInteracted() {
      userInteractedRef.current = true;
      cleanup();
    }

    function cleanup() {
      window.removeEventListener("click", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
      window.removeEventListener("scroll", markInteracted);
      window.removeEventListener("keydown", markInteracted);
    }

    // If user already scrolled (pasted URL, scrolled before JS loaded)
    if (window.scrollY > 0) {
      userInteractedRef.current = true;
    } else {
      window.addEventListener("click", markInteracted, { once: true });
      window.addEventListener("touchstart", markInteracted, { once: true });
      window.addEventListener("scroll", markInteracted, { once: true });
      window.addEventListener("keydown", markInteracted, { once: true });
    }

    return cleanup;
  }, [videoId, autoStarted]);

  // When API is ready + user has interacted → start player
  useEffect(() => {
    if (!apiReady || !videoId || autoStarted) return;

    if (userInteractedRef.current) {
      initPlayer();
      setAutoStarted(true);
      return;
    }

    // API is ready but user hasn't interacted yet — listen for it
    function handleInteraction() {
      initPlayer();
      setAutoStarted(true);
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
  }, [apiReady, videoId, autoStarted, initPlayer]);

  useEffect(() => {
    const timer = setTimeout(() => setFaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup player on unmount
  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  if (!videoId) return null;

  const handleToggle = () => {
    if (!playerRef.current) {
      initPlayer();
      setAutoStarted(true);
      setFaded(false);
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
    setFaded(false);
  };

  return (
    <>
      {/* Player container — must not be display:none or YT API won't init */}
      <div ref={containerRef} className="fixed -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden" />

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
