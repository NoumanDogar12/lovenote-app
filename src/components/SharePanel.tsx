"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { generateQRDataURL } from "@/lib/qr";

export default function SharePanel({
  shareLink,
  recipientName,
}: {
  shareLink: string;
  recipientName: string;
}) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    generateQRDataURL(shareLink).then(setQrDataUrl);
  }, [shareLink]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `I made something special for you 💕 ${shareLink}`;

  return (
    <div className="space-y-4">
      {/* Copy link */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={shareLink}
          className="flex-1 bg-white/60 border border-rose-100/30 px-3 py-2.5 rounded-xl text-xs text-gray-600 font-mono truncate focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className="btn-premium text-white px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
        >
          {copied ? "\u2713 Copied!" : "Copy"}
        </button>
      </div>

      {/* Share buttons */}
      <div className="flex gap-2">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-semibold transition-all hover:shadow-md hover:shadow-emerald-100/50 text-center"
        >
          WhatsApp
        </a>
        <a
          href={`sms:?&body=${encodeURIComponent(shareText)}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold transition-all hover:shadow-md hover:shadow-blue-100/50 text-center"
        >
          iMessage
        </a>
      </div>

      {/* QR Code */}
      {qrDataUrl && (
        <div className="text-center pt-1">
          <Image
            src={qrDataUrl}
            alt={`QR code for ${recipientName}'s Valentine`}
            width={150}
            height={150}
            className="mx-auto rounded-xl shadow-sm"
          />
          <a
            href={qrDataUrl}
            download={`lovenote-qr-${recipientName || "valentine"}.png`}
            className="text-xs text-rose-400 hover:text-rose-500 mt-2 inline-block font-medium transition-colors"
          >
            Download QR
          </a>
        </div>
      )}
    </div>
  );
}
