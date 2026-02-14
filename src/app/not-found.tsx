import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-valentine px-4 relative overflow-hidden">
      <div className="text-center max-w-md relative z-10">
        <div className="text-7xl mb-6 opacity-60">{"\u{1F494}"}</div>
        <h1 className="text-4xl font-bold text-rose-900 mb-4 font-[var(--font-playfair)]">
          This valentine doesn&apos;t exist... yet
        </h1>
        <p className="text-rose-700/50 mb-10 text-sm leading-relaxed">
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
            className="text-rose-700/50 hover:text-rose-500 text-sm transition-colors font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
