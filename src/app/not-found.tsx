import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-premium px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-16 left-[20%] w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,63,94,0.3) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 right-[15%] w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,113,133,0.3) 0%, transparent 70%)" }}
      />

      <div className="text-center max-w-md relative z-10">
        <div className="text-7xl mb-6 opacity-60">{"\u{1F494}"}</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 font-[var(--font-playfair)]">
          This valentine doesn&apos;t exist... yet
        </h1>
        <p className="text-gray-400 mb-10 text-sm leading-relaxed">
          Maybe it&apos;s time to create one for someone special?
        </p>
        <Link
          href="/create"
          className="btn-premium inline-block text-white px-10 py-3.5 rounded-xl font-semibold"
        >
          Create a Valentine
        </Link>
        <div className="mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-rose-400 text-sm transition-colors font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
