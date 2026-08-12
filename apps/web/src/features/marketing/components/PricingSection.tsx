import Link from "next/link";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";
import PricingCards from "./PricingCards";

export default function PricingSection({ locale = "en" }: { locale?: Locale }) {
  const t = getMarketingDictionary(locale).pricing;

  return (
    <section id="pricing" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-lp-ink">{t.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-600">{t.subtitle}</p>
        </div>

        <div className="mt-12">
          <PricingCards
            locale={locale}
            ctaFor={() => (
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-3 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
              >
                {t.cta}
              </Link>
            )}
          />
        </div>
      </div>
    </section>
  );
}
