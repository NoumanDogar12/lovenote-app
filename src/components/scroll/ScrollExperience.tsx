"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TemplateTheme } from "@/lib/templates";
import IntroSection from "./IntroSection";
import StorySection from "./StorySection";
import BuildupSection from "./BuildupSection";
import AskSection from "./AskSection";
import CelebrationSection from "./CelebrationSection";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import HeartParticles from "@/components/HeartParticles";

interface ScrollExperienceProps {
  recipientName: string;
  senderName: string;
  messages: { section: string; text: string }[];
  photos: { public_url: string; sort_order: number }[];
  askStyle: string;
  musicUrl: string | null;
  template: TemplateTheme;
  valentineId: string;
  isPreview?: boolean;
}

export default function ScrollExperience({
  recipientName,
  senderName,
  messages,
  photos,
  askStyle,
  template,
  valentineId,
  isPreview = false,
}: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [saidYes, setSaidYes] = useState(false);

  const sortedPhotos = [...photos].sort((a, b) => a.sort_order - b.sort_order);

  const getMessage = (section: string) =>
    messages.find((m) => m.section === section)?.text || "";

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Build story sections — only include sections that have a message or photo (no empty slots)
  const storySections: { message: string; photo?: string; index: number }[] = [];

  if (getMessage("story1") || sortedPhotos[0]) {
    storySections.push({ message: getMessage("story1"), photo: sortedPhotos[0]?.public_url, index: 0 });
  }
  sortedPhotos.slice(1, 4).forEach((photo, i) => {
    storySections.push({ message: i === 0 ? getMessage("story2") : "", photo: photo.public_url, index: i + 1 });
  });
  if (getMessage("story3") || sortedPhotos[4]) {
    storySections.push({ message: getMessage("story3"), photo: sortedPhotos[4]?.public_url, index: 4 });
  }
  sortedPhotos.slice(5).forEach((photo, i) => {
    storySections.push({ message: "", photo: photo.public_url, index: i + 5 });
  });

  // Filter out sections with no message AND no photo
  const filteredStory = storySections.filter((s) => s.message || s.photo);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.fonts.body,
      }}
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          width: progressWidth,
          backgroundColor: template.colors.primary,
        }}
      />

      {/* Heart particles */}
      {template.particleColors.length > 0 && (
        <HeartParticles colors={template.particleColors} />
      )}

      {/* Preview watermark */}
      {isPreview && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40">
          <div className="text-6xl md:text-8xl font-bold opacity-10 rotate-[-30deg] select-none"
            style={{ color: template.colors.primary }}
          >
            PREVIEW
          </div>
        </div>
      )}

      {/* Sections */}
      <IntroSection
        recipientName={recipientName}
        message={getMessage("intro")}
        template={template}
      />

      {/* Story sections — only rendered if they have content */}
      {filteredStory.map((s) => (
        <StorySection
          key={`story-${s.index}`}
          message={s.message}
          photo={s.photo}
          template={template}
          index={s.index}
        />
      ))}

      <BuildupSection
        recipientName={recipientName}
        template={template}
      />

      <AskSection
        recipientName={recipientName}
        senderName={senderName}
        askStyle={askStyle}
        template={template}
        valentineId={valentineId}
        closingMessage={getMessage("closing")}
        isPreview={isPreview}
        onYes={() => setSaidYes(true)}
      />

      {/* Only show celebration AFTER they click Yes */}
      {saidYes && (
        <>
          <CelebrationOverlay template={template} />
          <CelebrationSection
            senderName={senderName}
            recipientName={recipientName}
            template={template}
          />
        </>
      )}
    </div>
  );
}
