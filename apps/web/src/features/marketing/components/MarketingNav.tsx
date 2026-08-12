import Link from "next/link";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";

interface MarketingNavProps {
  locale?: Locale;
  /** Where the language toggle should send the visitor. Defaults to the other locale's home,
   * which is the honest fallback when a page has no direct counterpart. */
  altHref?: string;
}

export default function MarketingNav({ locale = "en", altHref }: MarketingNavProps) {
  const t = getMarketingDictionary(locale);
  const isSpanish = locale === "es";
  const switchHref = altHref ?? (isSpanish ? "/" : "/es");

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <Link href={t.nav.homeHref} className="flex select-none items-center gap-2.5 transition hover:opacity-80">
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
          href={t.nav.guidesHref}
          className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest sm:inline-flex"
        >
          {t.nav.guides}
        </Link>
        <Link
          href={t.nav.pricingHref}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest"
        >
          {t.nav.pricing}
        </Link>
        <Link
          href={switchHref}
          hrefLang={isSpanish ? "en" : "es"}
          className="rounded-xl border border-lp-forest/15 px-3 py-2 text-xs font-medium text-stone-600 transition hover:border-lp-forest/40 hover:text-lp-ink"
        >
          {isSpanish ? t.languageSwitch.toEnglish : t.languageSwitch.toSpanish}
        </Link>
        <Link
          href="/login"
          className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-lp-ink transition hover:text-lp-forest sm:inline-flex"
        >
          {t.nav.signIn}
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-2.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
        >
          {t.nav.getStarted}
        </Link>
      </nav>
    </header>
  );
}
