import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import FindingRow from "@/features/preview/components/FindingRow";
import { buildFindings, headlineFor, NOT_CHECKED } from "@/features/preview/services/findings";
import { getPreview } from "@/features/preview/services/previewStore";

export const dynamic = "force-dynamic";

/**
 * Titled with the actual address so a shared link reads as the lot it's about, rather than the
 * generic site title. Still noindex: these are generated from whatever address a visitor types,
 * so at scale they'd be thin, near-duplicate pages. They exist to be *shared*, not crawled —
 * the guides are the indexable surface.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const preview = await getPreview(id);

  return {
    title: preview ? `Land check — ${preview.address}` : "Land check",
    description: preview
      ? `Flood zone, wetlands and county data for ${preview.address}, pulled from public FEMA, USFWS and Census records.`
      : undefined,
    robots: { index: false, follow: true },
  };
}

const TONE_RING: Record<string, string> = {
  alert: "border-red-200 bg-red-50",
  caution: "border-amber-200 bg-amber-50",
  clear: "border-emerald-200 bg-emerald-50",
  unknown: "border-lp-border bg-white",
};

export default async function CheckResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const preview = await getPreview(id);
  if (!preview) notFound();

  const findings = buildFindings(preview.lookup);
  const headline = headlineFor(findings);
  const location = [preview.county && `${preview.county} County`, preview.state].filter(Boolean).join(", ");

  return (
    <div className="bg-lp-cream">
      <MarketingNav />

      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <p className="text-xs font-medium tracking-wide text-lp-forest-light uppercase">Free address check</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-lp-ink sm:text-3xl">{preview.address}</h1>
        {location && <p className="mt-1 text-sm text-stone-500">{location}</p>}

        <div className={`mt-6 rounded-2xl border p-5 ${TONE_RING[headline.tone] ?? TONE_RING.unknown}`}>
          <p className="text-lg font-semibold text-lp-ink">{headline.title}</p>
          <p className="mt-1 text-sm text-stone-600">
            Everything below comes from FEMA, the US Fish &amp; Wildlife Service, and the US Census
            Bureau — public records for this parcel, not estimates.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {findings.map((finding) => (
            <FindingRow key={finding.id} finding={finding} />
          ))}
        </div>

        {preview.lookup.parcelId && (
          <p className="mt-4 text-sm text-stone-500">
            County parcel folio <span className="font-medium text-lp-ink">{preview.lookup.parcelId}</span>
            {preview.lookup.lotSizeSqft
              ? ` · ${preview.lookup.lotSizeSqft.toLocaleString()} sqft on record`
              : ""}
          </p>
        )}

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-lp-ink">What this check can&apos;t tell you</h2>
          <p className="mt-1 text-sm text-stone-600">
            These aren&apos;t in any public dataset. Anyone claiming to check them from an address
            alone is guessing — here&apos;s who can actually answer each one.
          </p>
          <dl className="mt-5 space-y-4">
            {NOT_CHECKED.map((item) => (
              <div key={item.label} className="border-l-2 border-lp-border pl-4">
                <dt className="text-sm font-semibold text-lp-ink">{item.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-stone-600">
                  {item.detail}{" "}
                  {item.guideSlug && (
                    <Link href={`/guides/${item.guideSlug}`} className="font-medium text-lp-forest-light hover:underline">
                      Read the guide →
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-2xl border border-lp-gold/25 bg-lp-gold/5 p-6">
          <h2 className="text-lg font-semibold text-lp-ink">Is the price actually fair?</h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            That&apos;s the part this free check can&apos;t answer, because it depends on your
            numbers — the asking price, the lot size, and what you plan to build. Add those and
            LandPilot runs all 7 engines for the full 1000-point LPS Score, with the risk flags and
            a Strong Buy / Buy / Consider / Pass call.
          </p>
          <Link
            href={`/register?preview=${preview.id}`}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-lp-gold px-6 py-3.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
          >
            Get the full analysis
          </Link>
          <p className="mt-3 text-xs text-stone-500">
            Free plan includes 3 analyses a month. We&apos;ll carry this address over — you
            won&apos;t retype anything.
          </p>
        </section>

        <p className="mt-10 border-t border-lp-border pt-6 text-xs leading-relaxed text-stone-500">
          This is informational only — not investment advice, a property appraisal, a survey, or a
          title opinion. Public datasets can be out of date or imprecise at the parcel level.
          Confirm anything that affects your decision with the county and a licensed professional
          before you buy.
        </p>
      </main>

      <MarketingFooter />
    </div>
  );
}
