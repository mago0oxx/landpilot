import Link from "next/link";
import { AlertTriangle, Check, Database, LockOpen, Wallet } from "lucide-react";
import TopoPattern from "@/components/shared/TopoPattern";
import AddressCheckForm from "@/features/preview/components/AddressCheckForm";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";

export default function Hero({ locale = "en" }: { locale?: Locale }) {
  const t = getMarketingDictionary(locale).hero;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-20">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-lp-forest/15 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-lp-forest-light uppercase">
            {t.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-lp-ink sm:text-5xl">
            {t.headline}
          </h1>

          <p className="mt-5 max-w-xl text-lg text-stone-600">{t.subhead}</p>

          <div className="mt-8">
            <AddressCheckForm locale={locale} />
          </div>

          <p className="mt-4 text-sm text-stone-500">
            {t.builtFor}{" "}
            <Link href="/login" className="font-medium text-lp-forest-light hover:underline">
              {t.signIn}
            </Link>
          </p>

          {/* These describe the free check sitting directly above them. Engine count and the
              1000-point score belong to the paid analysis, further down the page. */}
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-lp-border pt-6">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Wallet size={14} /> {t.stats.cost}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">{t.stats.costValue}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <LockOpen size={14} /> {t.stats.account}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">{t.stats.accountValue}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Database size={14} /> {t.stats.sources}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">{t.stats.sourcesValue}</dd>
            </div>
          </dl>
        </div>

        {/* Mirrors exactly what a free check returns — real findings, no score. The score is
            the paid product, and putting it here made the hero promise something the address
            field below it doesn't deliver. */}
        <div className="relative overflow-hidden rounded-3xl bg-lp-forest p-8 text-lp-cream shadow-xl">
          <TopoPattern />
          <div className="relative z-10">
            <p className="text-xs font-medium tracking-wide text-lp-mint/70 uppercase">{t.sampleLabel}</p>
            <p className="mt-1 text-sm text-lp-mint/60">{t.sampleAddress}</p>

            <div className="mt-6 space-y-4">
              {t.findings.map((finding) => (
                <div key={finding.label} className="flex items-start gap-3">
                  {finding.tone === "alert" ? (
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-lp-gold" />
                  ) : (
                    <Check size={16} className="mt-0.5 shrink-0 text-lp-mint" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{finding.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-lp-mint/60">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs text-lp-mint/50">{t.stillNeedsHuman}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
