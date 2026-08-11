import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "How Much It Costs to Bring Power and Water to Land With No Utilities",
  description: "Realistic cost ranges for extending electricity, drilling a well, and installing septic on undeveloped land.",
};

export default function UtilityCostsPage() {
  return (
    <GuideLayout
      slug="utility-costs"
      title="How Much It Costs to Bring Power and Water to Land With No Utilities"
      dek={`"Utilities available at the street" isn't a guarantee. Here's what running power, water, and septic actually costs.`}
    >
      <section>
        <p>
          Raw or rural land often looks cheap until you price out getting it livable. Utility costs are
          the most common budget surprise for first-time land buyers — and listings routinely use vague
          language (&quot;utilities nearby,&quot; &quot;electric available&quot;) that isn&apos;t a commitment from
          anyone. Get real quotes before you close, not after.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Electricity</h2>
        <p className="mt-2">
          If a utility pole is already at the property line, hookup can be a few hundred dollars. If the
          nearest line is a quarter-mile away, extending it can run into the tens of thousands — rough
          ranges are roughly $10–$50+ per linear foot depending on overhead vs. underground and terrain.
          Call the utility company directly for a written quote to your specific parcel; don&apos;t rely on
          the listing&apos;s description.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Water — well vs. public connection</h2>
        <p className="mt-2">
          Connecting to an existing public water main, if one is close by, is usually the cheapest
          option (hookup/tap fees, often a few thousand dollars). Drilling a private well is more
          expensive and depends heavily on local depth-to-water — rough ranges are $15–$30+ per foot
          drilled, plus casing, pump, and permitting, often landing well into five figures total in
          harder-drilling regions.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Wastewater — septic vs. sewer</h2>
        <p className="mt-2">
          Connecting to public sewer, where available, is typically a one-time tap fee. Installing a
          septic system (only possible if the lot passes a{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light underline">
            perc test
          </Link>
          ) commonly runs from several thousand dollars for a standard system up to well over $20,000
          for an engineered alternative system on difficult soil.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Access and driveway</h2>
        <p className="mt-2">
          If the lot doesn&apos;t already have a graded, maintained driveway connecting to the road, clearing
          and grading can add a real cost too — more if the terrain is steep, wooded, or requires a
          culvert for drainage.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">The practical rule</h2>
        <p className="mt-2">
          Before you make an offer on a lot with no confirmed utilities, call the electric utility, the
          water/sewer authority, and a local septic installer for actual estimates to that specific
          address. A $25,000 lot with $60,000 in utility costs isn&apos;t a $25,000 decision.
        </p>
      </section>
    </GuideLayout>
  );
}
