"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TemplateTheme } from "@/lib/templates";

interface AskSectionProps {
  recipientName: string;
  senderName: string;
  askStyle: string;
  template: TemplateTheme;
  valentineId: string;
  closingMessage: string;
  isPreview: boolean;
}

export default function AskSection({
  recipientName,
  senderName,
  askStyle,
  template,
  valentineId,
  closingMessage,
  isPreview,
}: AskSectionProps) {
  const [answered, setAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleYes = useCallback(async () => {
    setAnswered(true);
    setShowCelebration(true);

    if (!isPreview) {
      try {
        await fetch(`/api/respond/${valentineId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer: "yes" }),
        });
      } catch {
        // Don't block the celebration
      }
    }

    // Scroll to celebration after a moment
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 1500);
  }, [isPreview, valentineId]);

  if (showCelebration) return null; // CelebrationSection takes over

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      id="ask-section"
    >
      <motion.div
        className="text-center max-w-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {closingMessage && (
          <motion.p
            className="text-lg md:text-xl mb-8 opacity-80 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {closingMessage}
          </motion.p>
        )}

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: template.fonts.heading,
            color: template.colors.primary,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Will you be my Valentine?
        </motion.h2>

        <motion.p
          className="text-lg mb-12 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          - {senderName || "Your Secret Admirer"}
        </motion.p>

        {!answered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            {askStyle === "playful_dodge" && (
              <PlayfulDodge
                template={template}
                onYes={handleYes}
              />
            )}
            {askStyle === "cute_guilt" && (
              <CuteGuilt
                template={template}
                onYes={handleYes}
                recipientName={recipientName}
              />
            )}
            {askStyle === "sincere" && (
              <Sincere
                template={template}
                onYes={handleYes}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// --- PLAYFUL DODGE ---
function PlayfulDodge({
  template,
  onYes,
}: {
  template: TemplateTheme;
  onYes: () => void;
}) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const dodgeMessages = [
    "Nice try!",
    "Not so fast!",
    "Can't catch me!",
    "Nope!",
    "Try the other button!",
  ];

  function moveNo() {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    setDodgeCount((c) => c + 1);
  }

  return (
    <div className="relative flex flex-col items-center gap-4 min-h-[200px]">
      <div className="flex gap-6 items-center">
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 rounded-2xl text-xl font-bold text-white shadow-lg"
          style={{ backgroundColor: template.colors.primary }}
        >
          Yes!
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", damping: 15 }}
          onHoverStart={moveNo}
          onTouchStart={moveNo}
          className="px-8 py-4 rounded-2xl text-xl font-bold border-2 bg-white/80"
          style={{
            borderColor: template.colors.accent,
            color: template.colors.accent,
          }}
        >
          No
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {dodgeCount > 0 && (
          <motion.p
            key={dodgeCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm opacity-60 mt-4"
          >
            {dodgeMessages[dodgeCount % dodgeMessages.length]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- CUTE GUILT TRIP ---
function CuteGuilt({
  template,
  onYes,
  recipientName,
}: {
  template: TemplateTheme;
  onYes: () => void;
  recipientName: string;
}) {
  const [noCount, setNoCount] = useState(0);

  const stages = [
    null,
    { emoji: "\u{1F97A}", text: "Are you sure?" },
    { emoji: "\u{1F622}", text: `But ${recipientName || "my love"}...` },
    { emoji: "\u{1F494}", text: "You're really breaking my heart..." },
    { emoji: "\u{1F62D}", text: "PLEASE?" },
  ];

  const stage = stages[Math.min(noCount, stages.length - 1)];

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {stage && (
          <motion.div
            key={noCount}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-2">{stage.emoji}</div>
            <p className="text-lg opacity-70">{stage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <motion.button
          onClick={onYes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-2xl text-xl font-bold text-white shadow-lg"
          style={{
            backgroundColor: template.colors.primary,
            transform: noCount >= 3 ? `scale(${1 + noCount * 0.05})` : undefined,
          }}
        >
          {noCount === 0 ? "Yes!" : "Okay, YES!"}
        </motion.button>

        {noCount < 4 && (
          <motion.button
            onClick={() => setNoCount((c) => c + 1)}
            whileHover={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl text-lg border-2 bg-white/80"
            style={{
              borderColor: template.colors.accent,
              color: template.colors.accent,
              fontSize: `${Math.max(14, 18 - noCount * 2)}px`,
              opacity: Math.max(0.4, 1 - noCount * 0.2),
            }}
          >
            {noCount === 0 ? "No" : noCount < 3 ? "Still no..." : "...no"}
          </motion.button>
        )}
      </div>
    </div>
  );
}

// --- SINCERE ---
function Sincere({
  template,
  onYes,
}: {
  template: TemplateTheme;
  onYes: () => void;
}) {
  const [declined, setDeclined] = useState(false);

  if (declined) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="text-5xl opacity-50">{"\u{1F494}"}</div>
        <p className="text-lg opacity-50">Maybe next time...</p>
        <button
          onClick={() => setDeclined(false)}
          className="text-sm opacity-40 underline"
          style={{ color: template.colors.primary }}
        >
          Wait, I changed my mind
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex gap-6 justify-center">
      <motion.button
        onClick={onYes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-12 py-4 rounded-2xl text-xl font-bold text-white shadow-lg"
        style={{ backgroundColor: template.colors.primary }}
      >
        Yes
      </motion.button>

      <motion.button
        onClick={() => setDeclined(true)}
        whileHover={{ scale: 0.98 }}
        className="px-8 py-4 rounded-2xl text-xl border-2"
        style={{
          borderColor: template.colors.accent + "60",
          color: template.colors.accent,
        }}
      >
        No
      </motion.button>
    </div>
  );
}
