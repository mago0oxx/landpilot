import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "Do You Need a Survey and Title Insurance on Vacant Land?",
  description:
    "What a land survey actually establishes, why title issues are more common on vacant land than on houses, and where it's reasonable to economize.",
};

export default function SurveyTitlePage() {
  return (
    <GuideLayout
      slug="survey-and-title-insurance"
      title="Do You Need a Survey and Title Insurance on Vacant Land?"
      dek="Short answer: yes to both, and more so than when buying a house. Here's what each one actually protects you from."
    >
      <section>
        <p>
          Buying a house comes with guardrails — a lender who requires an appraisal, an inspection
          everyone expects, a closing process that&apos;s been repeated a million times. Cash land
          purchases skip most of that, which means nobody is checking anything on your behalf unless
          you hire them to.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What a survey establishes</h2>
        <p className="mt-2">
          A licensed surveyor physically locates the parcel&apos;s legal boundaries and marks the
          corners. On vacant land this answers questions that genuinely can&apos;t be answered any other
          way:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Where the property actually is.</strong> County GIS maps are not survey-grade and can
            be off by a meaningful margin. The fence is very often not the line.
          </li>
          <li>
            <strong>Whether the acreage is real.</strong> Deeds from older subdivisions sometimes
            describe more or less than what&apos;s there.
          </li>
          <li>
            <strong>Encroachments.</strong> A neighbor&apos;s shed, driveway, or fence sitting on your
            parcel is far easier to resolve before closing than after.
          </li>
          <li>
            <strong>Where you can actually build,</strong> once setbacks, easements and topography are
            drawn on the same page.
          </li>
        </ul>
        <p className="mt-3">
          Ask specifically what type you&apos;re getting. A boundary survey is the baseline; a mortgage
          location survey is cheaper and less thorough; an ALTA survey is the most detailed and usually
          overkill for a residential lot.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">If there&apos;s a recent survey, you may not need a new one</h2>
        <p className="mt-2">
          Ask the seller whether one exists and when it was done. A survey from a few years ago on a
          parcel where nothing has changed may be perfectly adequate. An old one where corners have gone
          missing, or where neighboring parcels have been split, usually isn&apos;t. Your title company
          can advise on whether they&apos;ll rely on it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Why title problems cluster on vacant land</h2>
        <p className="mt-2">
          Land often changes hands rarely, sits in estates, gets split informally among heirs, or passes
          through tax sales. Each of those is a chance for a defect to enter the chain of title and stay
          there. Common ones:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Heirs who were never properly bought out and still hold a fractional interest</li>
          <li>Old mortgages or liens that were paid but never formally released</li>
          <li>Unpaid property taxes, or a prior tax deed with a clouded chain</li>
          <li>Boundary descriptions that don&apos;t close or that conflict with the neighbor&apos;s deed</li>
          <li>Severed mineral rights nobody mentioned</li>
        </ul>
        <p className="mt-3">
          A title search finds these. Title insurance covers you if one surfaces later that the search
          missed.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Read Schedule B — this is the important part</h2>
        <p className="mt-2">
          When the title commitment arrives, most buyers skim it. Schedule B lists the <em>exceptions</em>{" "}
          — everything the policy will not cover. That list is effectively a complete inventory of every
          easement, restriction and encumbrance recorded against the parcel.
        </p>
        <p className="mt-3">
          Read every line and ask what each one means in practice. If something is unclear, ask before
          closing, not after. This document is where{" "}
          <Link href="/guides/easements-and-deed-restrictions" className="font-medium text-lp-forest-light hover:underline">
            easements and deed restrictions
          </Link>{" "}
          become visible, and it&apos;s the cheapest hour of due diligence you&apos;ll do.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Owner&apos;s policy vs. lender&apos;s policy</h2>
        <p className="mt-2">
          If you finance, the lender will require a lender&apos;s policy — which protects the lender, not
          you. The owner&apos;s policy is the one that protects your equity, and it&apos;s usually a
          one-time premium at closing. Buying land in cash means nobody requires either one, which is
          exactly why cash land buyers are the ones who most often skip it and most often regret it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Where it&apos;s reasonable to economize</h2>
        <p className="mt-2">
          Due diligence costs money, and on a cheap parcel the costs can feel disproportionate. A
          sensible order: do the free checks first — zoning, flood zone, wetlands, county records — and
          only spend real money once a parcel survives them. Then title search, then perc test, then
          survey. That way you&apos;re paying for depth only on parcels that have already cleared the
          cheap filters. The full sequence is in the{" "}
          <Link href="/guides/due-diligence-checklist" className="font-medium text-lp-forest-light hover:underline">
            due diligence checklist
          </Link>.
        </p>
      </section>
    </GuideLayout>
  );
}
