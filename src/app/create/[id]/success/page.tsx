"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import SharePanel from "@/components/SharePanel";

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
    let attempts = 0;
    const maxAttempts = 60; // 3 minutes at 3s intervals

    const poll = setInterval(async () => {
      attempts++;

      try {
        const res = await fetch(`/api/valentine-status/${id}`);
        const data = await res.json();

        if (data.status === "published") {
          setStatus("published");
          setShareLink(data.share_link || `${window.location.origin}/v/${id}`);
          clearInterval(poll);
        }
      } catch {
        // Keep polling on fetch error
      }

      if (attempts >= maxAttempts) {
        setStatus("failed");
        clearInterval(poll);
      }
    }, 3000);

    return () => clearInterval(poll);
  }, [id]);

  if (status === "polling") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
        <div
          className="absolute top-20 right-[20%] w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)" }}
        />
        <div className="text-center max-w-md relative z-10">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-[var(--font-playfair)]">
            Publishing your Valentine...
          </h1>
          <p className="text-gray-400 text-sm">
            Hang tight while we make it beautiful.
          </p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
        <div
          className="absolute bottom-20 left-[15%] w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)" }}
        />
        <div className="text-center max-w-md relative z-10">
          <div className="text-5xl mb-6 opacity-70">{"\u{1F61F}"}</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-[var(--font-playfair)]">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Your payment was processed but publishing took longer than expected.
            Check your dashboard &mdash; it may be published already.
          </p>
          <Link
            href="/dashboard"
            className="btn-premium inline-block text-white px-8 py-3 rounded-xl font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-16 right-[10%] w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)" }}
      />

      <div className="text-center max-w-lg relative z-10">
        <div className="text-7xl mb-6">{"\u{1F48C}"}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-[var(--font-playfair)]">
          Your Valentine is live!
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          Share this link with your special someone. They have 30 days to
          experience it.
        </p>

        {/* Share panel with link, QR code, share buttons */}
        <div className="glass-card-strong rounded-2xl p-6 shadow-lg shadow-rose-50/50 mb-8 text-left">
          <SharePanel shareLink={shareLink} recipientName="" />
        </div>

        <Link
          href="/dashboard"
          className="text-gray-400 hover:text-rose-400 text-sm transition-colors font-medium"
        >
          Go to Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
}
