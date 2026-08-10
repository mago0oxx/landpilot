import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t border-lp-border px-6 py-8 text-sm text-stone-500 sm:flex-row">
      <p>
        Land<span className="font-medium text-lp-forest">Pilot</span> — Analyze. Invest. Grow.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/guides" className="hover:text-lp-ink">
          Guides
        </Link>
        <Link href="/pricing" className="hover:text-lp-ink">
          Pricing
        </Link>
        <Link href="/terms" className="hover:text-lp-ink">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-lp-ink">
          Privacy
        </Link>
        <p>&copy; {new Date().getFullYear()} LandPilot.</p>
      </div>
    </footer>
  );
}
