import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Finance Vacant Land (It's Not a Mortgage)",
  description:
    "Why a regular mortgage doesn't apply to raw land, what a land loan actually requires, and which lenders will talk to you.",
};

export default function LandLoansPage() {
  return (
    <GuideLayout
      slug="land-loans"
      title="How to Finance Vacant Land (It's Not a Mortgage)"
      dek="Most people budget for a land purchase assuming mortgage terms. The terms are meaningfully worse, and that changes what you can afford."
    >
      <section>
        <p>
          The single most common surprise for first-time land buyers is discovering that the
          30-year, 5%-down financing they had in mind doesn&apos;t exist for a vacant lot. Raw land
          is a different asset class to a lender: there&apos;s no house to repossess and resell, land
          takes far longer to sell in a downturn, and a borrower who runs into trouble will stop
          paying on empty land long before they stop paying on the home they live in.
        </p>
        <p className="mt-3">
          Lenders price that risk. Knowing the real numbers before you shop changes which parcels
          are actually within reach.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What land loan terms typically look like</h2>
        <p className="mt-2">
          Terms vary a lot by lender, region, and how raw the land is, but the shape is consistent:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Higher down payment.</strong> Commonly 20–50%. Raw, unimproved land sits at the
            higher end; a lot in a platted subdivision with utilities at the street sits at the lower
            end.
          </li>
          <li>
            <strong>Shorter terms.</strong> Often 5–20 years rather than 30, and some are structured
            with a balloon payment after a few years.
          </li>
          <li>
            <strong>Higher interest rates.</strong> Typically above prevailing mortgage rates.
          </li>
          <li>
            <strong>Stricter credit requirements.</strong> Land lending is discretionary for most
            banks, so they can be picky.
          </li>
        </ul>
        <p className="mt-3">
          Run your budget on those assumptions, not on mortgage assumptions. A parcel that looks
          affordable at 5% down can be out of reach at 35%.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">The more raw the land, the harder the loan</h2>
        <p className="mt-2">
          Lenders roughly sort land into tiers, and where your parcel falls drives everything:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Improved lot</strong> — road access, utilities at the street, already platted.
            Easiest to finance.
          </li>
          <li>
            <strong>Unimproved lot</strong> — legal access but no utilities yet. Harder, more down.
          </li>
          <li>
            <strong>Raw land</strong> — no access, no utilities, possibly no survey. Hardest, and some
            lenders simply won&apos;t.
          </li>
        </ul>
        <p className="mt-3">
          This is one more reason the basics matter before you fall in love with a parcel: a lot with
          no <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light hover:underline">recorded legal access</Link>{" "}
          isn&apos;t just a permitting problem, it&apos;s often a financing dead end too.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Who actually lends on land</h2>
        <p className="mt-2">
          Large national banks and online mortgage lenders mostly don&apos;t. The realistic list is
          more local than people expect:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Community banks and credit unions in the county where the land is.</strong> They
            know the local market and hold these loans on their own books. This is usually the best
            starting point.
          </li>
          <li>
            <strong>Farm Credit System institutions.</strong> They specialize in rural land and are
            often the most workable option for acreage.
          </li>
          <li>
            <strong>Seller financing.</strong> Common in rural land sales. Terms are negotiable and it
            can be a good fit — but insist on a title search and a properly recorded deed anyway. Owner
            financing does not make due diligence optional; if anything it raises the stakes.
          </li>
          <li>
            <strong>USDA and state programs</strong> in some areas, if you intend to build a primary
            residence.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Construction loans are a separate conversation</h2>
        <p className="mt-2">
          If your plan is to build, don&apos;t assume the land loan rolls into it. A construction loan
          is a different product with its own approval, and lenders will want to see that the parcel
          can actually be built on — permits, plans, a builder, and often a passing{" "}
          <Link href="/guides/perc-test" className="font-medium text-lp-forest-light hover:underline">
            perc test
          </Link>{" "}
          if the lot is on septic. Some lenders will roll the land purchase into a construction-to-permanent
          loan, which is worth asking about early because it changes how much cash you need up front.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Call lenders before you shop, not after</h2>
        <p className="mt-2">
          Call two or three local banks in the target county and ask plainly: do you lend on vacant
          land here, what&apos;s your minimum down payment, and what would disqualify a parcel? Fifteen
          minutes of that tells you your real budget and rules out parcels you were never going to be
          able to finance — before you spend money on inspections or get emotionally committed.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">A note if you have no credit history</h2>
        <p className="mt-2">
          Paying cash your whole life is admirable and also leaves you with no credit file, which
          lenders read as unknown risk rather than low risk. If financing is anywhere in your plan,
          start building a file well before you need it — that takes months, not days. If you&apos;re
          buying with cash outright, this doesn&apos;t apply, but do budget realistically for the build,
          which is where cash buyers most often come up short.
        </p>
      </section>
    </GuideLayout>
  );
}
