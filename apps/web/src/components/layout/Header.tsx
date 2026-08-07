"use client";

import { LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ROUTE_TITLES: { match: string; title: string; subtitle: string }[] = [
  { match: "/dashboard", title: "Dashboard", subtitle: "" },
  {
    match: "/analize",
    title: "Analyze a Property",
    subtitle: "Run the LPS Engine against a new land investment opportunity.",
  },
  {
    match: "/analyses",
    title: "Analysis Result",
    subtitle: "Full breakdown across the 7 Intelligence Engines.",
  },
  {
    match: "/portfolio",
    title: "Portfolio",
    subtitle: "Properties you've committed to, not just analyzed.",
  },
  {
    match: "/settings",
    title: "Settings",
    subtitle: "Manage your plan and billing.",
  },
  {
    match: "/properties",
    title: "Properties",
    subtitle: "Every property you've analyzed, searchable and filterable.",
  },
  {
    match: "/intelligence",
    title: "Intelligence",
    subtitle: "How each engine performs across everything you've analyzed.",
  },
];

const DEFAULT_ROUTE_TITLE = { title: "LandPilot", subtitle: "" };

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const initial = (user?.name ?? user?.email ?? "?").charAt(0).toUpperCase();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const { title, subtitle: defaultSubtitle } = ROUTE_TITLES.find((r) => pathname.startsWith(r.match)) ?? DEFAULT_ROUTE_TITLE;
  const subtitle = pathname.startsWith("/dashboard") && user ? `Welcome back, ${user.name ?? user.email} 👋` : defaultSubtitle;

  return (
    <header className="flex h-20 items-center justify-between border-b border-lp-border px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-lp-ink">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-stone-500">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Account menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-lp-forest text-lg font-bold text-lp-cream transition hover:brightness-110"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-lp-border bg-white py-1 shadow-lg">
              {user && (
                <div className="border-b border-lp-border px-4 py-3">
                  <p className="truncate text-sm font-medium text-lp-ink">{user.name ?? "Account"}</p>
                  <p className="truncate text-xs text-stone-500">{user.email}</p>
                </div>
              )}
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-lp-ink transition hover:bg-stone-50"
              >
                <Settings size={16} /> Settings
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-700 transition hover:bg-red-50"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
