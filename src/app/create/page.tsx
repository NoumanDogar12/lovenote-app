"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { templates } from "@/lib/templates";
import { createValentine } from "@/actions/valentines";
import Navbar from "@/components/Navbar";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TemplatePicker() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSelect(templateId: string) {
    setLoading(templateId);
    try {
      const valentineId = await createValentine(templateId);
      router.push(`/create/${valentineId}`);
    } catch {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-valentine relative overflow-hidden">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-rose-900 font-[var(--font-playfair)] mb-4">
            Choose Your Style
          </h1>
          <p className="text-lg text-rose-700/50 max-w-2xl mx-auto">
            Each template creates a unique, beautiful experience.
            Pick one that matches your love story.
          </p>
        </motion.div>

        {/* Template grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {templates.map((template, i) => (
            <motion.button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              disabled={loading !== null}
              className="group text-left glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-rose-200/40 transition-all duration-500 hover:-translate-y-2 disabled:opacity-60 disabled:cursor-wait"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
            >
              {/* Preview gradient */}
              <div
                className="h-52 relative overflow-hidden"
                style={{ background: template.previewGradient }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                  <span
                    className="text-2xl font-bold opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105 text-center"
                    style={{
                      fontFamily: template.fonts.heading,
                      color:
                        template.colors.background === "#0A0A0A" ||
                        template.colors.background === "#1A1A1A"
                          ? template.colors.text
                          : template.colors.primary,
                    }}
                  >
                    Will you be my Valentine?
                  </span>
                  <span
                    className="text-sm mt-2 opacity-0 group-hover:opacity-60 transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                    style={{
                      fontFamily: template.fonts.body,
                      color:
                        template.colors.background === "#0A0A0A" ||
                        template.colors.background === "#1A1A1A"
                          ? template.colors.text
                          : template.colors.primary,
                    }}
                  >
                    Click to start creating
                  </span>
                </div>

                {loading === template.id && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-rose-900">
                    {template.name}
                  </h3>
                  <svg
                    className="w-5 h-5 text-rose-200 group-hover:text-rose-400 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-rose-700/50">
                  {template.description}
                </p>

                {/* Color swatches */}
                <div className="flex gap-2 mt-3">
                  {Object.values(template.colors)
                    .slice(0, 4)
                    .map((color, ci) => (
                      <div
                        key={ci}
                        className="w-5 h-5 rounded-full border border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundColor: color,
                          transitionDelay: `${ci * 30}ms`,
                        }}
                      />
                    ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
