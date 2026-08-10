import Link from "next/link";

export default function MarketingNav() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex select-none items-center gap-2.5 transition hover:opacity-80">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lp-forest">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="#A8D4BA" strokeWidth="1.4" fill="none" />
            <circle cx="7" cy="7" r="2" fill="#A8D4BA" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-lp-ink">
          Land<span className="text-lp-gold">Pilot</span>
        </h1>
      </Link>

      <nav className="flex items-center gap-3">
        <Link
          href="/guides"
          className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest sm:inline-flex"
        >
          Guides
        </Link>
        <Link
          href="/pricing"
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-2.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
        >
          Get started
        </Link>
      </nav>
    </header>
  );
}
