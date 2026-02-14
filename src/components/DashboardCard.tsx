"use client";

import Link from "next/link";
import { getTemplate } from "@/lib/templates";
import SharePanel from "./SharePanel";
import { useState } from "react";

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

export default function DashboardCard({ valentine: v }: DashboardCardProps) {
  const [showShare, setShowShare] = useState(false);
  const template = getTemplate(v.template_id);
  const response = v.valentine_responses?.[0];
  const isExpired = v.expires_at && new Date(v.expires_at) < new Date();
  const status = isExpired ? "expired" : response ? "responded" : v.status;

  const statusConfig: Record<string, { bg: string; label: string }> = {
    draft: { bg: "bg-gray-100 text-gray-600", label: "Draft" },
    payment_pending: {
      bg: "bg-yellow-100 text-yellow-700",
      label: "Payment Pending",
    },
    published: { bg: "bg-green-100 text-green-700", label: "Published" },
    responded: { bg: "bg-rose-100 text-rose-700", label: "They said YES!" },
    expired: { bg: "bg-gray-100 text-gray-400", label: "Expired" },
  };

  const { bg, label } = statusConfig[status] || statusConfig.draft;

  const daysLeft =
    v.expires_at && !isExpired
      ? Math.ceil(
          (new Date(v.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      : null;

  return (
    <div
      className={`glass-card-strong rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-rose-100/30 hover:-translate-y-1 ${
        isExpired ? "opacity-60" : ""
      }`}
    >
      {/* Template preview stripe */}
      <div
        className="h-1.5"
        style={{
          background: template?.previewGradient || "linear-gradient(to right, #F43F5E, #EC4899)",
        }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 truncate">
              {v.recipient_name || "Unnamed Valentine"}
            </h3>
            {v.sender_name && (
              <p className="text-xs text-gray-400 font-medium">from {v.sender_name}</p>
            )}
          </div>
          <span
            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ml-2 ${bg}`}
          >
            {label}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-gray-300 font-medium mt-2 mb-4">
          <span>
            {template?.name || "Unknown template"}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-200" />
          <span>
            {new Date(v.created_at).toLocaleDateString()}
          </span>
          {daysLeft !== null && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-200" />
              <span className="text-orange-400">
                {daysLeft}d left
              </span>
            </>
          )}
        </div>

        {/* Response info */}
        {status === "responded" && response && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-3 mb-4 text-center border border-rose-100/50">
            <span className="text-rose-500 font-semibold text-sm">
              {"\u2764\uFE0F"} They said {response.answer.toUpperCase()}!
            </span>
            <p className="text-[10px] text-rose-300 mt-1 font-medium">
              {new Date(response.responded_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* Share panel (toggled) */}
        {showShare && v.share_link && (
          <div className="mb-4 p-3 bg-white/60 rounded-xl border border-rose-100/30">
            <SharePanel
              shareLink={v.share_link}
              recipientName={v.recipient_name}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {status === "draft" && (
            <>
              <Link
                href={`/create/${v.id}`}
                className="flex-1 text-center text-sm bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 hover:from-rose-100 hover:to-pink-100 py-2.5 rounded-xl transition-all font-semibold border border-rose-100/50"
              >
                Continue Editing
              </Link>
              <Link
                href={`/preview/${v.id}`}
                className="text-center text-sm bg-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-700 px-4 py-2.5 rounded-xl transition-all font-medium border border-gray-100/50"
              >
                Preview
              </Link>
            </>
          )}
          {(status === "published" || status === "responded") && (
            <>
              <button
                onClick={() => setShowShare(!showShare)}
                className="flex-1 text-center text-sm bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 hover:from-rose-100 hover:to-pink-100 py-2.5 rounded-xl transition-all font-semibold border border-rose-100/50"
              >
                {showShare ? "Hide" : "Share"}
              </button>
              <Link
                href={`/v/${v.id}`}
                className="text-center text-sm bg-white/60 text-gray-500 hover:bg-white/80 hover:text-gray-700 px-4 py-2.5 rounded-xl transition-all font-medium border border-gray-100/50"
                target="_blank"
              >
                View
              </Link>
            </>
          )}
          {status === "payment_pending" && (
            <Link
              href={`/preview/${v.id}`}
              className="flex-1 text-center text-sm bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 hover:from-amber-100 hover:to-yellow-100 py-2.5 rounded-xl transition-all font-semibold border border-amber-100/50"
            >
              Complete Payment
            </Link>
          )}
          {status === "expired" && (
            <span className="flex-1 text-center text-sm text-gray-300 py-2.5 italic">
              This love letter has been sealed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
