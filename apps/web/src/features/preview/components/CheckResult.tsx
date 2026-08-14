import Link from "next/link";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import { EN_TO_ES_GUIDE } from "@/features/marketing/data/guides.es";
import FindingRow from "@/features/preview/components/FindingRow";
import DensityOutlook from "@/features/preview/components/DensityOutlook";
import ParcelImagery from "@/features/preview/components/ParcelImagery";
import SiteCostEstimate from "@/features/preview/components/SiteCostEstimate";
import { buildFindings, headlineFor, notCheckedItems } from "@/features/preview/services/findings";
import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";

const TONE_RING: Record<string, string> = {
  alert: "border-red-200 bg-red-50",
  caution: "border-amber-200 bg-amber-50",
  clear: "border-emerald-200 bg-emerald-50",
  unknown: "border-lp-border bg-white",
};

const COPY = {
  en: {
    eyebrow: "Free address check",
    sourceNote:
      "Everything below comes from FEMA, the USDA soil survey, the US Fish & Wildlife Service, and the US Census Bureau — public records for this parcel, not estimates.",
    parcelFolio: "County parcel folio",
    onRecord: "sqft on record",
    cantTellTitle: "What this check can't tell you",
    cantTellIntro:
      "These aren't in any public dataset. Anyone claiming to check them from an address alone is guessing — here's who can actually answer each one.",
    readGuide: "Read the guide →",
    upsellTitle: "Is the price actually fair?",
    upsellBody:
      "That's the part this free check can't answer, because it depends on your numbers — the asking price, the lot size, and what you plan to build. Add those and LandPilot runs all 7 engines for the full 1000-point LPS Score, with the risk flags and a Strong Buy / Buy / Consider / Pass call.",
    upsellCta: "Get the full analysis",
    upsellNote:
      "Free plan includes 3 analyses a month. We'll carry this address over — you won't retype anything.",
    disclaimer:
      "This is informational only — not investment advice, a property appraisal, a survey, or a title opinion. Public datasets can be out of date or imprecise at the parcel level. Confirm anything that affects your decision with the county and a licensed professional before you buy.",
    county: (county: string) => `${county} County`,
  },
  es: {
    eyebrow: "Verificación gratis de dirección",
    sourceNote:
      "Todo lo de abajo viene de FEMA, el estudio de suelos del USDA, el US Fish & Wildlife Service y el US Census Bureau — registros públicos de esta parcela, no estimaciones.",
    parcelFolio: "Folio de la parcela en el condado",
    onRecord: "sqft en el registro",
    cantTellTitle: "Lo que esta verificación no te puede decir",
    cantTellIntro:
      "Nada de esto está en una base de datos pública. Quien diga que lo revisa solo con una dirección está adivinando. Aquí va quién sí puede responder cada punto.",
    readGuide: "Leer la guía →",
    upsellTitle: "¿El precio es justo de verdad?",
    upsellBody:
      "Esa es la parte que la verificación gratis no puede responder, porque depende de tus números: el precio que piden, el tamaño del lote y qué piensas construir. Agrégalos y LandPilot corre los 7 motores para el puntaje LPS completo de 1000 puntos, con las alertas de riesgo y una recomendación de Strong Buy / Buy / Consider / Pass.",
    upsellCta: "Ver el análisis completo",
    upsellNote:
      "El plan gratis incluye 3 análisis al mes. Nos llevamos esta dirección — no vas a reescribir nada.",
    disclaimer:
      "Esto es solo informativo. No es asesoría de inversión, ni un avalúo, ni un levantamiento topográfico, ni una opinión de título. Los datos públicos pueden estar desactualizados o ser imprecisos a nivel de parcela. Confirma con el condado y con un profesional con licencia cualquier cosa que afecte tu decisión antes de comprar.",
    county: (county: string) => `Condado de ${county}`,
  },
} as const;

interface CheckResultProps {
  preview: { id: string; address: string; county: string | null; state: string | null; lookup: PropertyLookupResult };
  locale: Locale;
  /** Where the language toggle in the nav should point for this specific result. */
  altHref: string;
}

export default function CheckResult({ preview, locale, altHref }: CheckResultProps) {
  const t = COPY[locale];
  const findings = buildFindings(preview.lookup, locale);
  const headline = headlineFor(findings, locale);
  const location = [preview.county && t.county(preview.county), preview.state].filter(Boolean).join(", ");

  // Findings reference English guide slugs. In Spanish, link only where a Spanish guide
  // actually exists — otherwise render no link rather than sending the reader to English.
  const guideHrefFor = (slug: string) => {
    if (locale !== "es") return `/guides/${slug}`;
    const esSlug = EN_TO_ES_GUIDE[slug];
    return esSlug ? `/es/guias/${esSlug}` : null;
  };

  return (
    <div className="bg-lp-cream">
      <MarketingNav locale={locale} altHref={altHref} />

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <p className="text-xs font-medium tracking-wide text-lp-forest-light uppercase">{t.eyebrow}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-lp-ink sm:text-3xl">{preview.address}</h1>
        {location && <p className="mt-1 text-sm text-stone-500">{location}</p>}

        <div className={`mt-6 rounded-2xl border p-5 ${TONE_RING[headline.tone] ?? TONE_RING.unknown}`}>
          <p className="text-lg font-semibold text-lp-ink">{headline.title}</p>
          <p className="mt-1 text-sm text-stone-600">{t.sourceNote}</p>
        </div>

        <div className="mt-6 space-y-3">
          {findings.map((finding) => (
            <FindingRow key={finding.id} finding={finding} locale={locale} guideHrefFor={guideHrefFor} />
          ))}
        </div>

        {preview.lookup.parcelId && (
          <p className="mt-4 text-sm text-stone-500">
            {t.parcelFolio} <span className="font-medium text-lp-ink">{preview.lookup.parcelId}</span>
            {preview.lookup.lotSizeSqft
              ? ` · ${preview.lookup.lotSizeSqft.toLocaleString()} ${t.onRecord}`
              : ""}
          </p>
        )}

        {/* Sits after the findings so the flood polygon lands on someone who has just read
            what "Zone AE" means, rather than before they have any context for it. */}
        <ParcelImagery
          latitude={preview.lookup.latitude}
          longitude={preview.lookup.longitude}
          lotSizeSqft={preview.lookup.lotSizeSqft}
          locale={locale}
        />

        {/* Density before cost: how many homes the ground can carry changes which cost lines
            even apply, so answering "what can I build" first makes the money section land. */}
        <DensityOutlook lookup={preview.lookup} locale={locale} />

        <SiteCostEstimate lookup={preview.lookup} locale={locale} />

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-lp-ink">{t.cantTellTitle}</h2>
          <p className="mt-1 text-sm text-stone-600">{t.cantTellIntro}</p>
          <dl className="mt-5 space-y-4">
            {notCheckedItems(locale).map((item) => {
              const href = item.guideSlug ? guideHrefFor(item.guideSlug) : null;
              return (
                <div key={item.label} className="border-l-2 border-lp-border pl-4">
                  <dt className="text-sm font-semibold text-lp-ink">{item.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-stone-600">
                    {item.detail}{" "}
                    {href && (
                      <Link href={href} className="font-medium text-lp-forest-light hover:underline">
                        {t.readGuide}
                      </Link>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section className="mt-12 rounded-2xl border border-lp-gold/25 bg-lp-gold/5 p-6">
          <h2 className="text-lg font-semibold text-lp-ink">{t.upsellTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{t.upsellBody}</p>
          <Link
            href={`/register?preview=${preview.id}`}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-lp-gold px-6 py-3.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
          >
            {t.upsellCta}
          </Link>
          <p className="mt-3 text-xs text-stone-500">{t.upsellNote}</p>
        </section>

        <p className="mt-10 border-t border-lp-border pt-6 text-xs leading-relaxed text-stone-500">
          {t.disclaimer}
        </p>
      </main>

      <MarketingFooter locale={locale} />
    </div>
  );
}
