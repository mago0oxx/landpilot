import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Know If Land Is Buildable Before You Buy",
  description: "A step-by-step checklist for confirming a vacant lot is actually buildable before you make an offer.",
};

export default function IsLandBuildablePage() {
  return (
    <GuideLayout
      slug="is-land-buildable"
      title="How to Know If Land Is Buildable Before You Buy"
      dek="Vacant land isn't automatically buildable land. Here's the checklist to run before you make an offer."
    >
      <section>
        <p>
          A listing that says &quot;buildable lot&quot; is a marketing claim, not a guarantee. The seller
          or agent may not have checked any of the things below — and in many states, they&apos;re not
          required to. The burden of confirming a lot is actually buildable falls on the buyer. Here&apos;s
          the order to check things in, cheapest and fastest first.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">1. Confirm the zoning designation</h2>
        <p className="mt-2">
          Call or check the county planning/zoning department&apos;s website for the parcel&apos;s zoning
          code (e.g. &quot;R-1,&quot; &quot;Agricultural,&quot; &quot;RM-2&quot;). Zoning determines what you&apos;re
          legally allowed to build — a single-family home, multiple units, or nothing residential at all.
          Ask specifically whether a residential dwelling is a permitted use on that parcel, not just
          whether the zoning &quot;sounds&quot; residential.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">2. Confirm legal road access</h2>
        <p className="mt-2">
          A lot with no recorded legal access to a public road — a landlocked parcel — usually can&apos;t
          get a building permit, no matter how good everything else looks. See our{" "}
          <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light underline">
            guide to checking for landlocked land
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">3. Confirm wastewater disposal is possible</h2>
        <p className="mt-2">
          If the lot isn&apos;t on public sewer, you&apos;ll need a septic system — and that requires soil
          that passes a percolation test. This is one of the most common reasons a &quot;buildable&quot;
          rural lot turns out not to be. See our{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light underline">
            perc test guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">4. Check floodplain and wetlands status</h2>
        <p className="mt-2">
          FEMA flood zone maps and federal/state wetlands maps are both public and free to check. A lot
          sitting mostly in a mapped wetland may have very limited buildable area even if the deed says
          five acres. A lot in a high-risk flood zone (AE, VE) isn&apos;t necessarily off-limits, but it
          changes your insurance costs and construction requirements — see our{" "}
          <Link href="/guides/fema-flood-zone-ae" className="font-medium text-lp-forest-light underline">
            flood zone AE guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">5. Confirm utilities reach the lot</h2>
        <p className="mt-2">
          &quot;Electric available at the street&quot; in a listing means someone believes a utility pole is
          nearby — not that hookup is free or guaranteed. Get an actual quote from the utility company
          before you close. See our{" "}
          <Link href="/guides/utility-costs" className="font-medium text-lp-forest-light underline">
            utility cost guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">6. Check for easements, deed restrictions, and HOA rules</h2>
        <p className="mt-2">
          A title search (usually done by a title company as part of closing, but you can request one
          earlier) will surface recorded easements, deed restrictions, or HOA covenants that can limit
          what you build, where, or how large. Ask for this before you&apos;re under contract if you can —
          not after.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">None of this replaces a professional</h2>
        <p className="mt-2">
          A licensed surveyor, engineer, or real estate attorney should still verify anything that&apos;s
          going to affect a six-figure decision. What this checklist does is tell you which lots are
          worth paying a professional to look at closer — and which ones you can rule out in an
          afternoon, before spending anything.
        </p>
      </section>
    </GuideLayout>
  );
}
