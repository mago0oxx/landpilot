import Link from "next/link";
import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";
import { assessDensity } from "../services/density";

const COPY: Record<
  Locale,
  { eyebrow: string; askLabel: string; guideCta: string; guideHref: string; upsell: string }
> = {
  en: {
    eyebrow: "Single home, duplex, or more?",
    askLabel: "Ask the county this",
    guideCta: "How to read a lot's zoning →",
    guideHref: "/guides/zoning-explained",
    upsell:
      "Once you know what the county allows, the full analysis compares building one home, a duplex or a triplex on this lot — and whether selling or renting returns more.",
  },
  es: {
    eyebrow: "¿Una casa, un dúplex, o más?",
    askLabel: "Pregúntale esto al condado",
    guideCta: "Cómo saber si un terreno es construible →",
    guideHref: "/es/guias/terreno-construible-estados-unidos",
    upsell:
      "Cuando sepas qué permite el condado, el análisis completo compara construir una casa, un dúplex o un tríplex en este lote — y si conviene más vender o rentar.",
  },
};

interface DensityOutlookProps {
  lookup: PropertyLookupResult;
  locale: Locale;
}

export default function DensityOutlook({ lookup, locale }: DensityOutlookProps) {
  const t = COPY[locale];
  const d = assessDensity(lookup, locale);

  return (
    <section className="mt-12 rounded-2xl border border-lp-border bg-white p-6">
      <p className="text-xs font-medium tracking-wide text-lp-forest-light uppercase">{t.eyebrow}</p>
      <h2 className="mt-2 text-lg font-semibold text-lp-ink">{d.headline}</h2>

      <p className="mt-3 text-sm leading-relaxed text-stone-600">{d.body}</p>
      {d.lotNote && <p className="mt-2 text-xs text-stone-500">{d.lotNote}</p>}

      {/* The specific words to say on the phone. Buyers stall on this call because they don't
          know the vocabulary — "minimum lot area per dwelling unit" is the phrase that gets a
          straight answer instead of a shrug. */}
      <div className="mt-5 rounded-xl border-l-2 border-lp-forest/40 bg-lp-cream/60 p-4">
        <p className="text-xs font-semibold tracking-wide text-lp-forest-light uppercase">
          {t.askLabel}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">{d.askTheCounty}</p>
        <Link
          href={t.guideHref}
          className="mt-3 inline-block text-sm font-medium text-lp-forest-light hover:underline"
        >
          {t.guideCta}
        </Link>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-stone-500">{t.upsell}</p>
    </section>
  );
}
