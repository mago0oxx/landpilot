import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";
import { buildSiteCostEstimate } from "../services/siteCosts";

const COPY: Record<
  Locale,
  {
    heading: string;
    intro: string;
    estimateBadge: string;
    quotedBy: string;
    notPriced: string;
    totalLabel: string;
    totalNote: string;
    unpricedNote: string;
    disclaimer: string;
  }
> = {
  en: {
    heading: "What the land costs you before the house",
    intro:
      "Buyers budget for the house and get surprised by the site. These are the items this particular parcel triggers, based on the findings above.",
    estimateBadge: "Estimates, not records",
    quotedBy: "Real number from:",
    notPriced: "Too variable to estimate",
    totalLabel: "Site work, before the house",
    totalNote:
      "Only the items above with a range are included. The unpriced ones are real costs we can't responsibly guess at — they go on top.",
    unpricedNote:
      "We only have sourced cost ranges for Florida so far, so this parcel shows the cost drivers without amounts. The list is still the right list — call the people named for each one.",
    disclaimer:
      "Ranges are 2026 Florida figures from industry cost guides, not quotes for your parcel. Actual cost depends on the design, the county and the contractor. Everything above the fold on this page comes from government records; this section does not.",
  },
  es: {
    heading: "Lo que el terreno te cuesta antes de la casa",
    intro:
      "La gente presupuesta la casa y la sorprende el sitio. Estos son los rubros que esta parcela en concreto activa, según los hallazgos de arriba.",
    estimateBadge: "Estimaciones, no registros",
    quotedBy: "El número real lo da:",
    notPriced: "Demasiado variable para estimar",
    totalLabel: "Trabajo de sitio, antes de la casa",
    totalNote:
      "Solo suma los rubros de arriba que tienen rango. Los que no tienen son costos reales que no podemos adivinar con responsabilidad — van encima.",
    unpricedNote:
      "Por ahora solo tenemos rangos con fuente para Florida, así que esta parcela muestra los rubros sin montos. La lista sigue siendo la correcta — llama a quien se indica en cada uno.",
    disclaimer:
      "Los rangos son cifras de Florida 2026 de guías de costos de la industria, no cotizaciones para tu parcela. El costo real depende del diseño, del condado y del contratista. Todo lo de arriba en esta página viene de registros del gobierno; esta sección no.",
  },
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

interface SiteCostEstimateProps {
  lookup: PropertyLookupResult;
  locale: Locale;
}

export default function SiteCostEstimate({ lookup, locale }: SiteCostEstimateProps) {
  const t = COPY[locale];
  const estimate = buildSiteCostEstimate(lookup, locale);

  return (
    // Warm neutral rather than the white of the findings cards — the visual break is doing
    // real work here, separating measured records from estimated costs.
    <section className="mt-12 rounded-2xl border border-stone-300 bg-stone-50 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-lp-ink">{t.heading}</h2>
        <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-medium text-stone-700">
          {t.estimateBadge}
        </span>
      </div>
      <p className="mt-2 text-sm text-stone-600">{t.intro}</p>

      <dl className="mt-6 space-y-4">
        {estimate.lines.map((line) => (
          <div key={line.id} className="border-t border-stone-200 pt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-sm font-semibold text-lp-ink">{line.label}</dt>
              <dd className="text-sm font-medium text-lp-ink">
                {line.low !== undefined && line.high !== undefined ? (
                  `${money(line.low)} – ${money(line.high)}`
                ) : (
                  <span className="text-stone-500">{t.notPriced}</span>
                )}
              </dd>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{line.reason}</p>
            <p className="mt-1 text-xs text-stone-500">
              {t.quotedBy} {line.whoQuotes}
            </p>
          </div>
        ))}
      </dl>

      {estimate.priced && estimate.totalLow !== null && estimate.totalHigh !== null ? (
        <div className="mt-6 rounded-xl border border-lp-forest/20 bg-white p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-lp-ink">{t.totalLabel}</p>
            <p className="text-xl font-bold text-lp-ink">
              {money(estimate.totalLow)} – {money(estimate.totalHigh)}
            </p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-stone-500">{t.totalNote}</p>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-600">
          {t.unpricedNote}
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-stone-500">{t.disclaimer}</p>
    </section>
  );
}
