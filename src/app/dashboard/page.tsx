import Link from "next/link";
import { getMyValentines } from "@/actions/valentines";
import DashboardCard from "@/components/DashboardCard";
import Navbar from "@/components/Navbar";
import ValentineDecorations from "@/components/ValentineDecorations";

export default async function DashboardPage() {
  let valentines;
  try {
    valentines = await getMyValentines();
  } catch {
    valentines = [];
  }

  return (
    <div className="min-h-screen bg-valentine relative overflow-hidden">
      {/* Heart balloons background */}
      <ValentineDecorations />

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-rose-900 font-[var(--font-playfair)]">
                Your Valentines
              </h1>
              {valentines.length > 0 && (
                <span className="bg-rose-100/80 text-rose-500 text-xs font-bold px-2.5 py-1 rounded-full">
                  {valentines.length}
                </span>
              )}
            </div>
            <p className="text-rose-700/50 text-sm">
              Manage and track your love notes
            </p>
          </div>
          <Link
            href="/create"
            className="btn-premium text-white px-6 py-2.5 rounded-xl font-medium text-sm inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Create New
          </Link>
        </div>

        {/* Empty state */}
        {valentines.length === 0 && (
          <div className="glass-card-strong rounded-3xl p-16 text-center relative overflow-hidden">
            {/* Decorative background hearts */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
              <svg className="absolute top-8 left-12 w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="absolute bottom-10 right-16 w-16 h-16 rotate-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="absolute top-16 right-[30%] w-10 h-10 -rotate-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Heart envelope icon */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 shadow-xl shadow-rose-300/30 mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="M18 15.28c.37-.42.88-.68 1.44-.7a2.1 2.1 0 0 1 1.56.56c.47.47.56 1.1.56 1.56a2.1 2.1 0 0 1-.7 1.44l-3.36 3.36a.5.5 0 0 1-.7 0l-3.36-3.36a2.1 2.1 0 0 1-.7-1.44c0-.47.09-1.1.56-1.56a2.1 2.1 0 0 1 1.56-.57c.56.03 1.07.29 1.44.7l.35.37.35-.36Z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-rose-900 mb-2 font-[var(--font-playfair)]">
              No valentines yet
            </h2>
            <p className="text-rose-700/50 mb-8 text-sm max-w-sm mx-auto leading-relaxed">
              Create your first valentine and make someone&apos;s day unforgettable with a beautiful animated love story
            </p>
            <Link
              href="/create"
              className="btn-premium inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Create Your First Valentine
            </Link>
          </div>
        )}

        {/* Valentine cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valentines.map((v) => (
            <DashboardCard
              key={v.id}
              valentine={{
                id: v.id,
                recipient_name: v.recipient_name,
                sender_name: v.sender_name,
                template_id: v.template_id,
                status: v.status,
                share_link: v.share_link,
                created_at: v.created_at,
                published_at: v.published_at,
                expires_at: v.expires_at,
                valentine_responses: v.valentine_responses,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
