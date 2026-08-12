import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "Well Water and Septic on Raw Land: What to Budget",
  description:
    "How to find out whether you can get water on a parcel, what a well and septic system realistically cost, and the questions the county can answer for free.",
};

export default function WellSepticPage() {
  return (
    <GuideLayout
      slug="well-water-and-septic-costs"
      title="Well Water and Septic on Raw Land: What to Budget"
      dek="On rural land these two line items routinely add up to more than buyers expect — and on some parcels, water simply isn't available at any price."
    >
      <section>
        <p>
          If a parcel isn&apos;t on municipal water and sewer, you&apos;re providing both yourself. Most
          first-time buyers price the land and the house and treat water and waste as details. On rural
          land they&apos;re frequently the difference between a project that works and one that
          doesn&apos;t.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">First question: is there water at all?</h2>
        <p className="mt-2">
          Drilling a well is not guaranteed to find usable water. Depth to the aquifer varies
          enormously — a well might be 100 feet in one region and 800 in another — and drillers
          generally charge by the foot whether or not they hit anything productive.
        </p>
        <p className="mt-3">How to find out before you buy, mostly for free:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Call two local well drillers</strong> and give them the parcel location. They drill
            that ground every week and will usually tell you typical depth, typical cost, and whether
            there are known dry areas. This single phone call is the most informative thing you can do.
          </li>
          <li>
            <strong>Check your state&apos;s well log database.</strong> Many states publish records of
            existing wells with depth and yield, so you can see what neighbors actually hit.
          </li>
          <li>
            <strong>Ask the county health department</strong> whether a well permit is issuable on that
            parcel. In some areas it isn&apos;t.
          </li>
          <li>
            <strong>In western states, check water rights separately.</strong> Owning the land does not
            always grant the right to pump groundwater, and some basins are closed to new wells.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What drives the cost</h2>
        <p className="mt-2">
          Costs vary too much by region to quote a single number honestly, but the variables are
          consistent, and knowing them lets you ask a driller the right questions:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li><strong>Depth</strong> — usually priced per foot, and it&apos;s the dominant factor</li>
          <li><strong>Rock</strong> — drilling through bedrock costs more than through soil</li>
          <li><strong>Casing, pump, pressure tank and wiring</strong> — often a substantial share on top of the drilling itself</li>
          <li><strong>Distance from the well to the house</strong> — trenching and line</li>
          <li><strong>Water quality treatment</strong> — sulfur, iron, or hardness can require a filtration system</li>
          <li><strong>Access for the rig</strong> — if a drilling truck can&apos;t reach the site, that&apos;s clearing and road work first</li>
        </ul>
        <p className="mt-3">
          Get written quotes rather than working from an internet average. The spread between regions is
          large enough that national figures are close to meaningless for your specific parcel.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Septic: the permit comes before the price</h2>
        <p className="mt-2">
          A conventional septic system needs soil that drains at an acceptable rate, verified by a{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light hover:underline">perc test</Link>,
          plus enough area for a drain field with required setbacks from wells, property lines, water
          bodies and wetlands.
        </p>
        <p className="mt-3">
          If the soil fails, engineered alternatives exist — mound systems, aerobic treatment units —
          but they cost substantially more to install, cost money to maintain every year, and
          aren&apos;t permitted everywhere. Ask the county health department specifically which
          alternative systems they approve <em>before</em> you assume one is a fallback.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Well and septic constrain each other</h2>
        <p className="mt-2">
          They can&apos;t go just anywhere, and they can&apos;t go near each other. Regulations require
          minimum separation between a well and a drain field, and both need separation from property
          lines and surface water. On a small parcel — or one where{" "}
          <Link href="/guides/wetlands-on-land" className="font-medium text-lp-forest-light hover:underline">wetlands</Link>{" "}
          eat into the usable area — it&apos;s entirely possible to have room for a house but not room
          for a legal well-and-septic layout.
        </p>
        <p className="mt-3">
          This is why the buildable-area question is about the whole system, not the house footprint.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What to do before you make an offer</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Confirm with the county whether the parcel is on, or can connect to, municipal water or sewer — if so, most of this goes away</li>
          <li>Call two local well drillers for typical depth and a ballpark quote</li>
          <li>Ask the health department whether well and septic permits are issuable on this parcel</li>
          <li>Make the offer contingent on a passing perc test if there&apos;s no sewer</li>
          <li>Add well, septic, and utility runs to your budget as line items before deciding what you can pay for the land itself</li>
        </ul>
        <p className="mt-3">
          Together with the cost of{" "}
          <Link href="/guides/utility-costs" className="font-medium text-lp-forest-light hover:underline">
            running power to the parcel
          </Link>
          , this is the number that decides whether cheap land is actually cheap.
        </p>
      </section>
    </GuideLayout>
  );
}
