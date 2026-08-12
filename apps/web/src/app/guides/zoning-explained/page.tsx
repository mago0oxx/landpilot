import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Read a Lot's Zoning Before You Buy",
  description:
    "What a zoning code actually controls, the questions to ask the county planning office, and why 'residential' doesn't mean you can build what you're picturing.",
};

export default function ZoningExplainedPage() {
  return (
    <GuideLayout
      slug="zoning-explained"
      title="How to Read a Lot's Zoning Before You Buy"
      dek="Zoning decides what you're allowed to build, how big, how many, and how far from the property line. It's free to check and it rules out lots fast."
    >
      <section>
        <p>
          Zoning is the county or city&apos;s rulebook for what can happen on a given piece of land.
          Every parcel sits in a zoning district with a code — R-1, AG, RR-5, RM-2 — and that code
          points to a section of the local land development code that spells out what&apos;s permitted.
        </p>
        <p className="mt-3">
          It&apos;s public, it&apos;s free, and it&apos;s the cheapest way to eliminate a lot that was
          never going to work. It&apos;s also the thing listings are most often wrong about.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What zoning actually controls</h2>
        <p className="mt-2">People assume zoning is just &quot;residential or commercial.&quot; It&apos;s considerably more specific:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Permitted uses</strong> — whether a single-family home is allowed at all, and
            whether things like a workshop, a second dwelling, or short-term rental are.
          </li>
          <li>
            <strong>Minimum lot area per dwelling unit</strong> — the rule that decides how many homes
            the parcel can hold. This is what kills &quot;let&apos;s put two houses on it&quot; plans.
          </li>
          <li>
            <strong>Setbacks</strong> — how far a structure must sit from the front, rear, and side
            property lines. On a narrow lot, setbacks can leave a buildable envelope far smaller than
            the lot looks.
          </li>
          <li>
            <strong>Maximum height and lot coverage</strong> — how tall, and what percentage of the lot
            can be under roof or impervious surface.
          </li>
          <li>
            <strong>Minimum square footage</strong> — some districts set a floor on home size, which can
            rule out a small cabin or tiny home.
          </li>
          <li>
            <strong>Road frontage requirements</strong> — a minimum number of feet fronting a public
            road, separate from whether you have legal access at all.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">&quot;Agricultural&quot; is where people get caught</h2>
        <p className="mt-2">
          Agricultural and rural districts often <em>do</em> allow a single-family home, which is why
          buyers relax when they see them. What varies enormously is everything else: minimum parcel
          size (10, 20, 40 acres in some places), whether a second dwelling for family is allowed,
          whether you can run a business, and whether the district is subject to right-to-farm rules
          that let a neighbor do things you may not enjoy living next to.
        </p>
        <p className="mt-3">
          Never infer from the district&apos;s name. Read the actual use table.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">How to check it, in about 20 minutes</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Find the parcel on the county <strong>property appraiser</strong> or <strong>GIS parcel
            viewer</strong>. Both are free and public, and both usually show the zoning designation.
          </li>
          <li>
            Look up that code in the county&apos;s <strong>land development code</strong> (often on
            Municode or the county website). Find the use table and the dimensional standards.
          </li>
          <li>
            <strong>Then call the planning department.</strong> This is the step people skip and it&apos;s
            the one that matters. Give them the parcel ID and ask specifically: &quot;Is a single-family
            dwelling a permitted use by right on this parcel, and what are the setbacks and minimum lot
            area per unit?&quot;
          </li>
        </ul>
        <p className="mt-3">
          Ask for the answer in writing, or at minimum note the name of the person you spoke to and the
          date. Verbal guidance from a counter clerk is not binding on the county.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">&quot;We can just get it rezoned&quot;</h2>
        <p className="mt-2">
          Sometimes true, often expensive, never fast, and never guaranteed. A rezoning is a political
          process with public hearings and neighbors who get to object. Treat any parcel whose plan
          depends on a rezoning as speculative, and price it that way.
        </p>
        <p className="mt-3">
          If you&apos;re seriously considering it, most jurisdictions offer a <strong>pre-application
          meeting</strong> with planning staff, often free or nearly free. Staff will usually tell you
          candidly whether they&apos;d support it. That&apos;s a much cheaper way to find out than filing.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Zoning is necessary but not sufficient</h2>
        <p className="mt-2">
          Zoning permission doesn&apos;t mean you can build. A lot can be zoned perfectly for a house
          and still be unbuildable because the soil won&apos;t pass a{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light hover:underline">perc test</Link>,
          because there&apos;s no{" "}
          <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light hover:underline">recorded legal access</Link>,
          or because a private deed restriction is stricter than the county code. Zoning is one gate of
          several — see the full{" "}
          <Link href="/guides/due-diligence-checklist" className="font-medium text-lp-forest-light hover:underline">due diligence checklist</Link>.
        </p>
      </section>
    </GuideLayout>
  );
}
