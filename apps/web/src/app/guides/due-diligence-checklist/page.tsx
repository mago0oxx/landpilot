import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "Land Buying Due Diligence Checklist",
  description: "Everything to verify before you close on a vacant lot — zoning, access, utilities, environmental risk, title, and more.",
};

const ITEMS: { title: string; body: ReactNode }[] = [
  {
    title: "Zoning & permitted use",
    body: "Confirm with the county that a residential dwelling is a permitted use on this specific parcel — not just that the zoning \"sounds\" residential.",
  },
  {
    title: "Legal road access",
    body: (
      <>
        Confirm recorded access to a public road.{" "}
        <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light underline">
          Landlocked lots
        </Link>{" "}
        often can&apos;t get a building permit.
      </>
    ),
  },
  {
    title: "Wastewater disposal",
    body: (
      <>
        If there&apos;s no public sewer, confirm a{" "}
        <Link href="/guides/perc-test" className="font-medium text-lp-forest-light underline">
          perc test
        </Link>{" "}
        has passed (or will) for septic.
      </>
    ),
  },
  {
    title: "Utilities",
    body: (
      <>
        Get written quotes from the electric and water/sewer providers to hook up this specific
        parcel.{" "}
        <Link href="/guides/utility-costs" className="font-medium text-lp-forest-light underline">
          Costs can be substantial
        </Link>
        .
      </>
    ),
  },
  {
    title: "Flood zone & wetlands",
    body: (
      <>
        Check FEMA flood maps and federal/state wetlands maps for the parcel. A{" "}
        <Link href="/guides/fema-flood-zone-ae" className="font-medium text-lp-forest-light underline">
          high-risk flood zone
        </Link>{" "}
        changes insurance and construction requirements.
      </>
    ),
  },
  {
    title: "Title",
    body: "Get a title search for liens, judgments, unresolved ownership disputes, or recorded easements that could limit use.",
  },
  {
    title: "Deed restrictions & HOA rules",
    body: "Some rural parcels still carry HOA membership, deed covenants, or shared-road maintenance agreements — get the actual documents, not a verbal summary.",
  },
  {
    title: "Survey / boundary confirmation",
    body: "A recent survey confirms the actual boundaries and flags any encroachments — from a fence, a structure, or a neighbor's driveway.",
  },
  {
    title: "Property taxes & assessments",
    body: "Check current tax amount and whether any special assessments (road, utility district) are attached to the parcel.",
  },
  {
    title: "Financing",
    body: "Land loans generally have shorter terms, higher down payments, and higher rates than a home mortgage — confirm financing is realistic before you're under contract.",
  },
];

export default function DueDiligenceChecklistPage() {
  return (
    <GuideLayout
      slug="due-diligence-checklist"
      title="Land Buying Due Diligence Checklist"
      dek="Everything to verify before you close on a vacant lot, in one place."
    >
      <section>
        <p>
          This is the full list — most of the individual guides linked below go deeper on the items
          that trip people up most. LandPilot checks flood zone, wetlands, and several access/utility
          signals automatically from government data sources; it doesn&apos;t replace a survey, title
          search, or perc test, and it says so on every report rather than guessing.
        </p>
      </section>

      <section>
        <ol className="space-y-4">
          {ITEMS.map((item, i) => (
            <li key={item.title} className="rounded-xl border border-lp-border bg-white p-4">
              <p className="font-semibold text-lp-ink">
                {i + 1}. {item.title}
              </p>
              <p className="mt-1 text-sm text-stone-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </GuideLayout>
  );
}
