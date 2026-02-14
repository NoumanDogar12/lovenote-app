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
  const playerRef = useRef<{ playVideo: () => void; pauseVideo: () => void; destroy: () => void } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (window.YT) {
      setApiReady(true);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => setApiReady(true);
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
        playlist: videoId as unknown as number, // YouTube API needs this for loop
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
      // First click — initialize player (autoplay)
      initPlayer();
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
      {/* Hidden player container */}
      <div ref={containerRef} className="hidden" />

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
