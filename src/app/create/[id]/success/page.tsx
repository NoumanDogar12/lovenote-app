"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import SharePanel from "@/components/SharePanel";
import Navbar from "@/components/Navbar";

export default function SuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [status, setStatus] = useState<"polling" | "published" | "failed">(
    "polling"
  );
  const [shareLink, setShareLink] = useState("");
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval>;
    let attempts = 0;
    const maxAttempts = 60;

    async function check() {
      attempts++;
      try {
        const res = await fetch(`/api/valentine-status/${id}`);
        const data = await res.json();
        if (!cancelled && data.status === "published") {
          setStatus("published");
          setShareLink(data.share_link || `${window.location.origin}/v/${id}`);
          clearInterval(timer);
          return;
        }
      } catch { /* keep polling */ }
      if (!cancelled && attempts >= maxAttempts) {
        setStatus("failed");
        clearInterval(timer);
      }
    }

    // Check immediately on mount, then poll every 3s
    check();
    timer = setInterval(check, 3000);

    return () => { cancelled = true; clearInterval(timer); };
  }, [id]);

  if (status === "polling") {
    return (
      <div className="min-h-screen bg-valentine relative overflow-hidden">
        <Navbar />
        <div className="flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 60px)" }}>
          <div className="text-center max-w-md relative z-10">
            <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-rose-900 mb-2 font-[var(--font-playfair)]">
              Publishing your Valentine...
            </h1>
            <p className="text-rose-700/50 text-sm">
              Hang tight while we make it beautiful.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-valentine relative overflow-hidden">
        <Navbar />
        <div className="flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 60px)" }}>
          <div className="text-center max-w-md relative z-10">
            <div className="text-5xl mb-6 opacity-70">{"\u{1F61F}"}</div>
            <h1 className="text-2xl font-bold text-rose-900 mb-2 font-[var(--font-playfair)]">
              Something went wrong
            </h1>
            <p className="text-rose-700/50 mb-8 text-sm leading-relaxed">
              Your payment was processed but publishing took longer than expected.
              Check your dashboard &mdash; it may be published already.
            </p>
            <Link
              href="/dashboard"
              className="btn-premium inline-block text-center text-white px-8 py-3 rounded-xl font-semibold w-full sm:w-auto"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-valentine relative overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 60px)" }}>
        <div className="text-center max-w-lg relative z-10">
          <div className="text-7xl mb-6">{"\u{1F48C}"}</div>
          <h1 className="text-3xl font-bold text-rose-900 mb-2 font-[var(--font-playfair)]">
            Your Valentine is live!
          </h1>
          <p className="text-rose-800/50 mb-8 text-sm">
            Share this link with your special someone. They have 30 days to
            experience it.
          </p>

          {/* Share panel with link, QR code, share buttons */}
          <div className="glass-card-strong rounded-2xl p-4 sm:p-6 shadow-lg shadow-rose-100/30 mb-8 text-left">
            <SharePanel shareLink={shareLink} recipientName="" />
          </div>

          <Link
            href="/dashboard"
            className="text-rose-700/60 hover:text-rose-500 text-sm transition-colors font-medium"
          >
            Go to Dashboard &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
