"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TemplateTheme } from "@/lib/templates";
import IntroSection from "./IntroSection";
import StorySection from "./StorySection";
import BuildupSection from "./BuildupSection";
import AskSection from "./AskSection";
import CelebrationSection from "./CelebrationSection";
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

  const sortedPhotos = [...photos].sort((a, b) => a.sort_order - b.sort_order);

  const getMessage = (section: string) =>
    messages.find((m) => m.section === section)?.text || "";

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

      {/* Story sections - pair photos with messages */}
      {getMessage("story1") && (
        <StorySection
          message={getMessage("story1")}
          photo={sortedPhotos[0]?.public_url}
          template={template}
          index={0}
        />
      )}

      {sortedPhotos.slice(1, 4).map((photo, i) => (
        <StorySection
          key={photo.public_url}
          message={i === 0 ? getMessage("story2") : ""}
          photo={photo.public_url}
          template={template}
          index={i + 1}
        />
      ))}

      {getMessage("story3") && (
        <StorySection
          message={getMessage("story3")}
          photo={sortedPhotos[4]?.public_url}
          template={template}
          index={4}
        />
      )}

      {/* Remaining photos */}
      {sortedPhotos.slice(5).map((photo, i) => (
        <StorySection
          key={photo.public_url}
          message=""
          photo={photo.public_url}
          template={template}
          index={i + 5}
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
      />

      <CelebrationSection
        senderName={senderName}
        recipientName={recipientName}
        template={template}
      />
    </div>
  );
}
