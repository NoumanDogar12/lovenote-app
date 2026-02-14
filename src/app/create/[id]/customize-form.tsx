"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { templates, askStyles, getTemplate } from "@/lib/templates";
import { updateValentine } from "@/actions/valentines";
import PhotoUploader from "@/components/PhotoUploader";
import Navbar from "@/components/Navbar";

interface Valentine {
  id: string;
  template_id: string;
  recipient_name: string;
  sender_name: string;
  messages: { section: string; text: string }[] | null;
  ask_style: string;
  music_url: string | null;
}

interface Photo {
  id: string;
  public_url: string;
  sort_order: number;
}

const MESSAGE_SECTIONS = [
  { id: "intro", label: "Opening Message", placeholder: "Hey beautiful, I have something to tell you..." },
  { id: "story1", label: "First Memory", placeholder: "Remember when we first met..." },
  { id: "story2", label: "What I Love About You", placeholder: "You make every day brighter because..." },
  { id: "story3", label: "Our Journey", placeholder: "Together we've been through..." },
  { id: "closing", label: "Final Words", placeholder: "So here's what I want to ask you..." },
];

export default function CustomizeForm({
  valentine,
  photos,
}: {
  valentine: Valentine;
  photos: Photo[];
}) {
  const router = useRouter();
  const [recipientName, setRecipientName] = useState(valentine.recipient_name || "");
  const [senderName, setSenderName] = useState(valentine.sender_name || "");
  const [messages, setMessages] = useState<Record<string, string>>(
    () => {
      const msgs: Record<string, string> = {};
      if (valentine.messages && Array.isArray(valentine.messages)) {
        valentine.messages.forEach((m: { section: string; text: string }) => {
          msgs[m.section] = m.text;
        });
      }
      return msgs;
    }
  );
  const [askStyle, setAskStyle] = useState(valentine.ask_style || "sincere");
  const [musicUrl, setMusicUrl] = useState(valentine.music_url || "");
  const [templateId, setTemplateId] = useState(valentine.template_id);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const selectedTemplate = getTemplate(templateId);

  const autoSave = useCallback(async () => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      setSaving(true);
      try {
        const messageArray = Object.entries(messages)
          .filter(([, text]) => text.trim())
          .map(([section, text]) => ({ section, text }));

        await updateValentine(valentine.id, {
          recipient_name: recipientName,
          sender_name: senderName,
          messages: messageArray,
          ask_style: askStyle,
          music_url: musicUrl || undefined,
          template_id: templateId,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        // Silently fail auto-save
      }
      setSaving(false);
    }, 2000);
  }, [recipientName, senderName, messages, askStyle, musicUrl, templateId, valentine.id]);

  useEffect(() => {
    autoSave();
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [autoSave]);

  return (
    <div className="min-h-screen bg-valentine relative overflow-hidden">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-rose-900 font-[var(--font-playfair)]">
              Customize Your Valentine
            </h1>
            <p className="text-rose-800/50 mt-1 text-sm">
              Make it personal, make it beautiful
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-rose-500/60 font-medium">
              {saving ? "Saving..." : saved ? "\u2713 Saved" : ""}
            </span>
            <Link
              href={`/preview/${valentine.id}`}
              className="btn-premium text-white px-5 py-2.5 rounded-xl font-medium text-sm flex-1 sm:flex-none text-center"
            >
              Preview
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Template selector (compact) */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-4">Template</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl transition-all duration-300 hover:scale-105 ${
                    templateId === t.id
                      ? "ring-3 ring-rose-400 ring-offset-2 shadow-lg"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={{ background: t.previewGradient }}
                  title={t.name}
                />
              ))}
            </div>
            {selectedTemplate && (
              <p className="text-xs text-rose-700/50 mt-2 font-medium">{selectedTemplate.name}</p>
            )}
          </section>

          {/* Names */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-4">Names</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-700/50 uppercase tracking-wider mb-1.5">
                  Your Valentine&apos;s Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value.slice(0, 50))}
                  className="input-premium w-full px-4 py-3 rounded-xl focus:outline-none text-gray-800 placeholder:text-gray-300"
                  placeholder="Their name"
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-rose-700/50 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value.slice(0, 50))}
                  className="input-premium w-full px-4 py-3 rounded-xl focus:outline-none text-gray-800 placeholder:text-gray-300"
                  placeholder="Your name"
                  maxLength={50}
                />
              </div>
            </div>
          </section>

          {/* Photos */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-4">Photos</h2>
            <PhotoUploader valentineId={valentine.id} photos={photos} />
          </section>

          {/* Messages */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-1">Messages</h2>
            <p className="text-xs text-rose-700/50 mb-5">
              Write messages that appear as your valentine scrolls. Leave blank to skip.
            </p>
            <div className="space-y-5">
              {MESSAGE_SECTIONS.map((section) => (
                <div key={section.id}>
                  <label className="block text-xs font-semibold text-rose-700/50 uppercase tracking-wider mb-1.5">
                    {section.label}
                  </label>
                  <textarea
                    value={messages[section.id] || ""}
                    onChange={(e) =>
                      setMessages((prev) => ({
                        ...prev,
                        [section.id]: e.target.value.slice(0, 500),
                      }))
                    }
                    rows={3}
                    className="input-premium w-full px-4 py-3 rounded-xl focus:outline-none resize-none text-gray-800 placeholder:text-gray-300"
                    placeholder={section.placeholder}
                    maxLength={500}
                  />
                  <span className="text-[10px] text-rose-400/50 font-medium">
                    {(messages[section.id] || "").length}/500
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Ask Style */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-1">
              The Big Question Style
            </h2>
            <p className="text-xs text-rose-700/50 mb-5">
              How should the &quot;Will you be my Valentine?&quot; moment feel?
            </p>
            <div className="space-y-3">
              {askStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setAskStyle(style.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                    askStyle === style.id
                      ? "border-rose-400 bg-rose-50/80 shadow-md shadow-rose-100/30"
                      : "border-transparent bg-white/50 hover:bg-white/80 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{style.emoji}</span>
                    <div>
                      <div className="font-semibold text-rose-900 text-sm">
                        {style.name}
                      </div>
                      <div className="text-xs text-rose-700/50">
                        {style.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Music */}
          <section className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50">
            <h2 className="text-sm font-semibold text-rose-800/60 uppercase tracking-wider mb-1">
              Background Music
            </h2>
            <p className="text-xs text-rose-700/50 mb-4">
              Optional. Paste a YouTube link for background music.
            </p>
            <input
              type="url"
              value={musicUrl}
              onChange={(e) => setMusicUrl(e.target.value)}
              className="input-premium w-full px-4 py-3 rounded-xl focus:outline-none text-gray-800 placeholder:text-gray-300"
              placeholder="https://youtube.com/watch?v=..."
            />
          </section>

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 pt-4 pb-8">
            <Link
              href="/create"
              className="text-rose-700/60 hover:text-rose-500 text-sm transition-colors font-medium w-full sm:w-auto text-center"
            >
              &larr; Change Template
            </Link>
            <Link
              href={`/preview/${valentine.id}`}
              className="btn-premium text-white px-8 py-3 rounded-xl font-semibold w-full sm:w-auto text-center"
            >
              Preview Your Valentine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
