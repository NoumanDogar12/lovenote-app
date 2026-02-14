"use client";

import Link from "next/link";
import { getTemplate } from "@/lib/templates";
import SharePanel from "./SharePanel";
import { useState } from "react";
import { motion } from "motion/react";

interface DashboardCardProps {
  valentine: {
    id: string;
    recipient_name: string;
    sender_name: string;
    template_id: string;
    status: string;
    share_link: string | null;
    created_at: string;
    published_at: string | null;
    expires_at: string | null;
    valentine_responses?: { answer: string; responded_at: string }[];
  };
}

/* Inline SVG icons for a polished look */
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function PenIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CreditCardIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function DashboardCard({ valentine: v }: DashboardCardProps) {
  const [showShare, setShowShare] = useState(false);
  const template = getTemplate(v.template_id);
  const response = v.valentine_responses?.[0];
  const isExpired = v.expires_at && new Date(v.expires_at) < new Date();
  const status = isExpired ? "expired" : response ? "responded" : v.status;

  const statusConfig: Record<
    string,
    { bg: string; label: string; icon: React.ReactNode; glow?: string }
  > = {
    draft: {
      bg: "bg-rose-50/80 text-rose-400 border border-rose-100/50",
      label: "Draft",
      icon: <PenIcon className="w-3 h-3" />,
    },
    payment_pending: {
      bg: "bg-amber-50/80 text-amber-600 border border-amber-100/50",
      label: "Awaiting Payment",
      icon: <CreditCardIcon className="w-3 h-3" />,
    },
    published: {
      bg: "bg-emerald-50/80 text-emerald-600 border border-emerald-100/50",
      label: "Live",
      icon: <SparkleIcon className="w-3 h-3" />,
      glow: "shadow-emerald-200/50",
    },
    responded: {
      bg: "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 border border-rose-200/50",
      label: "They Said YES!",
      icon: <HeartIcon className="w-3 h-3" />,
      glow: "shadow-rose-200/60",
    },
    expired: {
      bg: "bg-gray-50/80 text-gray-400 border border-gray-100/50",
      label: "Sealed",
      icon: <LockIcon className="w-3 h-3" />,
    },
  };

  const { bg, label, icon, glow } = statusConfig[status] || statusConfig.draft;

  const daysLeft =
    v.expires_at && !isExpired
      ? Math.ceil(
          (new Date(v.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
        isExpired ? "opacity-55" : ""
      } ${glow ? `hover:shadow-xl ${glow}` : "hover:shadow-xl hover:shadow-rose-200/30"}`}
    >
      {/* Card background with glass effect */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl" />

      {/* Template gradient header with heart pattern overlay */}
      <div
        className="relative h-28 overflow-hidden"
        style={{
          background:
            template?.previewGradient ||
            "linear-gradient(135deg, #F43F5E, #EC4899)",
        }}
      >
        {/* Decorative hearts in header */}
        <div className="absolute inset-0 opacity-[0.12]">
          <svg className="absolute top-2 right-4 w-10 h-10" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg className="absolute bottom-3 left-6 w-6 h-6 rotate-12" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg className="absolute top-5 left-[40%] w-5 h-5 -rotate-6" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Status badge - floating in header */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold backdrop-blur-sm ${bg}`}
          >
            {icon}
            {label}
          </span>
        </div>

        {/* Template name tag */}
        <div className="absolute bottom-3 left-4">
          <span className="text-[10px] font-semibold text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            {template?.name || "Template"}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="relative p-5">
        {/* Names */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <HeartIcon className="text-rose-400 w-4 h-4 flex-shrink-0" />
            <h3 className="font-bold text-rose-900 text-lg truncate font-[var(--font-playfair)]">
              {v.recipient_name || "Your Valentine"}
            </h3>
          </div>
          {v.sender_name && (
            <p className="text-xs text-rose-400/70 font-medium ml-6">
              with love from {v.sender_name}
            </p>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-[11px] text-rose-400/60 font-medium mb-4">
          <ClockIcon className="text-rose-300/60" />
          <span>{new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          {daysLeft !== null && (
            <>
              <span className="w-1 h-1 rounded-full bg-rose-200" />
              <span className={`${daysLeft <= 5 ? "text-amber-500 font-semibold" : "text-rose-400/60"}`}>
                {daysLeft} {daysLeft === 1 ? "day" : "days"} left
              </span>
            </>
          )}
        </div>

        {/* Response celebration */}
        {status === "responded" && response && (
          <div className="relative mb-4 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="relative p-4 text-center">
              <div className="text-2xl mb-1">{"\u2764\uFE0F"}</div>
              <p className="text-rose-600 font-bold text-sm">
                They said {response.answer.toUpperCase()}!
              </p>
              <p className="text-[10px] text-rose-400 mt-1 font-medium">
                {new Date(response.responded_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )}

        {/* Share panel (toggled) */}
        {showShare && v.share_link && (
          <div className="mb-4 p-3 bg-rose-50/50 rounded-2xl border border-rose-100/30">
            <SharePanel
              shareLink={v.share_link}
              recipientName={v.recipient_name}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {status === "draft" && (
            <>
              <Link
                href={`/create/${v.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm btn-premium text-white py-2.5 rounded-xl font-semibold"
              >
                <PenIcon className="w-3.5 h-3.5" />
                Continue
              </Link>
              <Link
                href={`/preview/${v.id}`}
                className="inline-flex items-center justify-center gap-1.5 text-sm bg-rose-50/80 text-rose-500 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl transition-all font-medium border border-rose-100/50"
              >
                <EyeIcon />
                Preview
              </Link>
            </>
          )}
          {(status === "published" || status === "responded") && (
            <>
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm btn-premium text-white py-2.5 rounded-xl font-semibold"
              >
                <ShareIcon className="w-3.5 h-3.5" />
                {showShare ? "Hide" : "Share"}
              </button>
              <Link
                href={`/v/${v.id}`}
                className="inline-flex items-center justify-center gap-1.5 text-sm bg-rose-50/80 text-rose-500 hover:bg-rose-100/80 px-4 py-2.5 rounded-xl transition-all font-medium border border-rose-100/50"
                target="_blank"
              >
                <EyeIcon />
                View
              </Link>
            </>
          )}
          {status === "payment_pending" && (
            <Link
              href={`/preview/${v.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-amber-400 to-orange-400 text-white py-2.5 rounded-xl font-semibold shadow-lg shadow-amber-200/30 hover:shadow-xl hover:shadow-amber-200/40 transition-all hover:-translate-y-0.5"
            >
              <CreditCardIcon className="w-3.5 h-3.5" />
              Complete Payment
            </Link>
          )}
          {status === "expired" && (
            <div className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-rose-300/60 py-2.5 italic">
              <LockIcon className="w-3.5 h-3.5" />
              This love letter has been sealed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
