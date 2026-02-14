"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublishButton({
  valentineId,
}: {
  valentineId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valentineId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      if (data.url) {
        router.push(data.url);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      disabled={loading}
      className="btn-premium text-white px-6 py-2 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Redirecting...
        </span>
      ) : (
        "Publish & Share"
      )}
    </button>
  );
}
