"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="relative z-20 py-4 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left pill - branding */}
        <div className="bg-white/80 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-sm shadow-rose-100/40 border border-rose-100/30">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-[var(--font-playfair)]"
          >
            <span className="text-rose-500 text-base">{"\u2665"}</span>
            LoveNote
          </Link>
        </div>

        {/* Center pill - navigation */}
        <div className="hidden sm:flex bg-white/80 backdrop-blur-xl rounded-full px-2 py-1.5 shadow-sm shadow-rose-100/40 border border-rose-100/30 items-center gap-1">
          <Link
            href="/dashboard"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === "/dashboard"
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm"
                : "text-rose-900/60 hover:text-rose-700 hover:bg-rose-50/60"
            }`}
          >
            My Valentines
          </Link>
          <Link
            href="/create"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === "/create" || pathname?.startsWith("/create/")
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm"
                : "text-rose-900/60 hover:text-rose-700 hover:bg-rose-50/60"
            }`}
          >
            Create New
          </Link>
        </div>

        {/* Right pill - sign out */}
        <button
          onClick={handleSignOut}
          className="bg-white/80 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-sm shadow-rose-100/40 border border-rose-100/30 text-sm text-rose-900/60 hover:text-rose-600 font-medium transition-all duration-300 hover:border-rose-200/50"
        >
          Sign Out
        </button>

        {/* Mobile nav links */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className={`p-2 rounded-full transition-colors ${
              pathname === "/dashboard" ? "text-rose-500" : "text-rose-900/40"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Link>
          <Link
            href="/create"
            className={`p-2 rounded-full transition-colors ${
              pathname === "/create" ? "text-rose-500" : "text-rose-900/40"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
