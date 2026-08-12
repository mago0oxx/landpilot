import Link from "next/link";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";

export default function MarketingFooter({ locale = "en" }: { locale?: Locale }) {
  const dict = getMarketingDictionary(locale);
  const t = dict.footer;

  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t border-lp-border px-6 py-8 text-sm text-stone-500 sm:flex-row">
      <p>
        Land<span className="font-medium text-lp-forest">Pilot</span> — {t.tagline}
      </p>
      <div className="flex items-center gap-4">
        <Link href={dict.nav.guidesHref} className="hover:text-lp-ink">
          {t.guides}
        </Link>
        <Link href={dict.nav.pricingHref} className="hover:text-lp-ink">
          {t.pricing}
        </Link>
        <Link href="/terms" className="hover:text-lp-ink">
          {t.terms}
        </Link>
        <Link href="/privacy" className="hover:text-lp-ink">
          {t.privacy}
        </Link>
        <p>&copy; {new Date().getFullYear()} LandPilot.</p>
      </div>
    </footer>
  );
}
