import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "What It Means If Your Lot Has Wetlands",
  description:
    "Why mapped wetlands can shrink your buildable area far below the acreage on the deed, and what the permitting process actually involves.",
};

export default function WetlandsPage() {
  return (
    <GuideLayout
      slug="wetlands-on-land"
      title="What It Means If Your Lot Has Wetlands"
      dek="Five acres on the deed can mean one acre you can build on. Wetlands are the most common reason usable land is smaller than purchased land."
    >
      <section>
        <p>
          Wetlands aren&apos;t necessarily swamp. Legally, a wetland is ground where water is present at
          or near the surface long enough during the growing season to produce wetland soils and
          wetland vegetation. Plenty of parcels that look like ordinary woods qualify, and plenty of
          buyers only discover it after closing.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Why it matters so much</h2>
        <p className="mt-2">
          Building on, filling, draining, or dredging a regulated wetland generally requires a federal
          permit, most often through the US Army Corps of Engineers, and frequently a state permit on
          top of it. That process is slow, uncertain, and can require you to buy mitigation credits to
          offset the impact.
        </p>
        <p className="mt-3">
          The practical effect on most residential buyers isn&apos;t that they can&apos;t build at all —
          it&apos;s that they can only build on the non-wetland portion, and that portion has to be big
          enough for a house, a driveway, and a septic drain field with the required setbacks. On a
          small lot, that math frequently doesn&apos;t work.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Mapped vs. delineated — an important distinction</h2>
        <p className="mt-2">
          The <strong>National Wetlands Inventory</strong> from the US Fish &amp; Wildlife Service is a
          free, public map layer. It&apos;s a screening tool: it&apos;s built from aerial imagery at a
          broad scale, so it can miss small wetlands and can flag areas that turn out not to be
          jurisdictional.
        </p>
        <p className="mt-3">
          A <strong>wetland delineation</strong> is the real answer. An environmental consultant walks
          the parcel, examines soils and vegetation, and flags the actual boundary. That&apos;s what
          regulators and lenders rely on. Costs vary by parcel size and region, but it&apos;s in the
          range of other pre-purchase inspections and it is worth it on any parcel where the map shows
          wetlands or where the ground is visibly wet.
        </p>
        <p className="mt-3">
          A free address check — including ours — tells you what the national map shows. It does not
          substitute for a delineation.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Signs to look for when you walk the lot</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Standing water, or soil that stays soft and springy days after rain</li>
          <li>Water-loving vegetation — cattails, sedges, rushes, willows, cypress</li>
          <li>Water stains or sediment lines on tree trunks</li>
          <li>Dark, mucky soil with a sulfur smell when you dig a few inches</li>
          <li>The parcel sitting noticeably lower than the road or neighboring lots</li>
        </ul>
        <p className="mt-3">
          Visit after heavy rain if you can. A lot toured in August after a dry spell can look
          completely different in March.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Wetlands and septic don&apos;t mix</h2>
        <p className="mt-2">
          Septic drain fields require separation from groundwater and from surface water, so wetlands
          on a parcel compound the septic question rather than sitting beside it. If the lot depends on
          septic and a meaningful share of it is wet, the odds of a workable system drop sharply. Read
          the{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light hover:underline">perc test guide</Link>{" "}
          alongside this one — on wet parcels they&apos;re really the same question.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Wetlands aren&apos;t automatically bad</h2>
        <p className="mt-2">
          If your plan is hunting land, recreational acreage, or a conservation holding, wetlands can be
          a feature rather than a problem — they hold wildlife and often reduce the price per acre. Some
          owners also pursue conservation easements for tax benefits, though that permanently limits
          development.
        </p>
        <p className="mt-3">
          The failure mode isn&apos;t buying land with wetlands. It&apos;s paying buildable-land prices
          for land that isn&apos;t buildable.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What to do before you close</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Check the National Wetlands Inventory map for the parcel</li>
          <li>If anything shows, make your offer contingent on a satisfactory wetland delineation</li>
          <li>Ask the county whether they have local wetland or surface-water rules beyond the federal ones — many do, and some are stricter</li>
          <li>Confirm the non-wetland area is large enough for house, driveway, well and drain field with setbacks — not just large enough for the house</li>
        </ul>
      </section>
    </GuideLayout>
  );
}
