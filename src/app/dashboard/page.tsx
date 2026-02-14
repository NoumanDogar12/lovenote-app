import Link from "next/link";
import { getMyValentines } from "@/actions/valentines";
import DashboardCard from "@/components/DashboardCard";

export default async function DashboardPage() {
  let valentines;
  try {
    valentines = await getMyValentines();
  } catch {
    valentines = [];
  }

  return (
    <div className="min-h-screen bg-premium relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-[var(--font-playfair)] mb-1 inline-block"
            >
              LoveNote
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 font-[var(--font-playfair)]">
              Your Valentines
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Manage and track your love notes
            </p>
          </div>
          <Link
            href="/create"
            className="btn-premium text-white px-6 py-2.5 rounded-xl font-medium text-sm"
          >
            + Create New
          </Link>
        </div>

        {/* Empty state */}
        {valentines.length === 0 && (
          <div className="glass-card-strong rounded-3xl p-16 text-center">
            <div className="text-6xl mb-5 opacity-60">{"\u{1F48C}"}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-[var(--font-playfair)]">
              No valentines yet
            </h2>
            <p className="text-gray-400 mb-8 text-sm max-w-sm mx-auto">
              Create your first valentine and make someone&apos;s day special
            </p>
            <Link
              href="/create"
              className="btn-premium inline-block text-white px-8 py-3.5 rounded-xl font-semibold"
            >
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
