"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { TemplateTheme } from "@/lib/templates";

export default function StorySection({
  message,
  photo,
  template,
  index,
}: {
  message: string;
  photo?: string;
  template: TemplateTheme;
  index: number;
}) {
  if (!message && !photo) return null;

  const isEven = index % 2 === 0;
  const delay = 0.1;

  const variants = {
    hidden: {
      opacity: 0,
      x: template.animationStyle === "smooth" ? 0 : isEven ? -40 : 40,
      y: template.animationStyle === "smooth" ? 30 : 0,
      scale: template.animationStyle === "bouncy" ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
  };

  const transition =
    template.animationStyle === "bouncy"
      ? { type: "spring" as const, damping: 20, stiffness: 100, delay }
      : { duration: 0.8, ease: "easeOut" as const, delay };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div
        className={`max-w-4xl w-full flex flex-col ${
          photo && message
            ? isEven
              ? "md:flex-row"
              : "md:flex-row-reverse"
            : "items-center"
        } gap-8 md:gap-12 items-center`}
      >
        {/* Photo */}
        {photo && (
          <motion.div
            className="w-full md:w-1/2 aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={transition}
          >
            <Image
              src={photo}
              alt="Memory"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay tint */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(to top, ${template.colors.primary}, transparent)`,
              }}
            />
          </motion.div>
        )}

        {/* Message */}
        {message && (
          <motion.div
            className={`${photo ? "w-full md:w-1/2" : "max-w-xl text-center"}`}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: delay + 0.2 }}
          >
            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: template.fonts.body }}
            >
              {message}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
