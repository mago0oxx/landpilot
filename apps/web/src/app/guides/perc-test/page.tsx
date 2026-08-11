import type { Metadata } from "next";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "What Is a Perc Test — and Why It Can Kill Your Purchase",
  description: "What a percolation test measures, why it matters for septic-dependent lots, and what a failed perc test means for your purchase.",
};

export default function PercTestPage() {
  return (
    <GuideLayout
      slug="perc-test"
      title="What Is a Perc Test — and Why It Can Kill Your Purchase"
      dek="If the lot isn't on public sewer, a failed percolation test can mean you legally can't build there."
    >
      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What a perc test actually measures</h2>
        <p className="mt-2">
          A percolation (&quot;perc&quot;) test measures how quickly water drains through the soil at a
          specific spot on the property. A hole is dug to a set depth, filled with water, and the drop
          rate is timed. That rate tells the county whether the soil can safely absorb and filter
          wastewater from a septic system — and if so, how large that system needs to be.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Why it matters so much</h2>
        <p className="mt-2">
          If a lot isn&apos;t connected to a municipal sewer line, a septic system is usually the only
          legal way to handle wastewater — and most counties won&apos;t issue a building permit for a
          residence without an approved septic (or equivalent) system. No passing perc test generally
          means no septic permit, which generally means no building permit. This is one of the most
          common reasons a cheap rural lot turns out to be unbuildable.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Who orders it, and what it costs</h2>
        <p className="mt-2">
          Typically a licensed soil scientist, engineer, or the county health/environmental department
          performs or supervises the test. Costs vary widely by region and lot conditions, but a rough
          range is $150–$800. It&apos;s a small cost relative to the purchase price — which is exactly why
          skipping it before you buy is a bad trade.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What causes a lot to fail</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>High clay content — water drains too slowly</li>
          <li>A high water table — not enough separation between the drain field and groundwater</li>
          <li>Shallow bedrock</li>
          <li>Lot too small to fit the required drain field size for the soil type</li>
          <li>Steep slope or proximity to a well, water body, or wetland</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">A failed test isn&apos;t always the end</h2>
        <p className="mt-2">
          Some lots that fail a standard perc test can still use an engineered alternative septic
          system (mound systems, aerobic treatment units) — but these cost significantly more to
          install and maintain, and aren&apos;t permitted everywhere. If a lot fails, ask specifically
          whether any alternative system is approved in that county before writing it off completely.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">When you don&apos;t need to worry about this</h2>
        <p className="mt-2">
          If the lot is already connected to (or can easily connect to) a municipal sewer line, a perc
          test is irrelevant to buildability — confirm sewer availability with the county or utility
          provider directly instead.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">The practical rule</h2>
        <p className="mt-2">
          If a lot depends on septic and hasn&apos;t already passed a perc test, make your offer
          contingent on one passing — or budget for the real chance that it never will.
        </p>
      </section>
    </GuideLayout>
  );
}
