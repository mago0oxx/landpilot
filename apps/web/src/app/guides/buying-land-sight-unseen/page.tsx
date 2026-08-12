import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "Buying Land Sight Unseen: What Goes Wrong",
  description:
    "Cheap rural lots sold online to out-of-state buyers are cheap for reasons that don't show up in the listing photos. Here's what to verify remotely.",
};

export default function SightUnseenPage() {
  return (
    <GuideLayout
      slug="buying-land-sight-unseen"
      title="Buying Land Sight Unseen: What Goes Wrong"
      dek="A $6,000 lot with an owner-financing offer and drone footage is a specific business model. Here's what it usually leaves out."
    >
      <section>
        <p>
          There is a whole industry selling inexpensive rural parcels online to buyers in other states.
          Some of it is legitimate. Some of it consists of land that&apos;s cheap precisely because
          nobody local will buy it, marketed with photos of a nice view and terms that make the price
          feel irrelevant.
        </p>
        <p className="mt-3">
          The pattern is recognizable, and almost all of it is checkable from your desk.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What makes cheap land cheap</h2>
        <p className="mt-2">
          Land has a market. When a parcel sells far below the area&apos;s going rate, there&apos;s
          usually a reason, and it&apos;s usually one of these:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>No legal access.</strong> It looks reachable on a map, but there&apos;s no recorded
            easement. See{" "}
            <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light hover:underline">landlocked land</Link>.
          </li>
          <li>
            <strong>No water.</strong> In much of the arid West, drilling a well can be extremely deep,
            extremely expensive, or not permitted at all. Some parcels simply have no realistic water
            source.
          </li>
          <li>
            <strong>Utilities are miles away.</strong> &quot;Power nearby&quot; can mean the nearest pole
            is two miles off, at tens of thousands of dollars per mile to extend.
          </li>
          <li>
            <strong>Soil won&apos;t support septic.</strong> No{" "}
            <Link href="/guides/perc-test" className="font-medium text-lp-forest-light hover:underline">passing perc test</Link>,
            no septic permit, no building permit.
          </li>
          <li>
            <strong>Zoning doesn&apos;t allow a home,</strong> or the minimum parcel size is larger than
            what you&apos;re buying.
          </li>
          <li>
            <strong>It&apos;s wetland, floodplain, or a steep unbuildable slope.</strong>
          </li>
          <li>
            <strong>Back taxes, liens, or a clouded title.</strong>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Sales tactics worth recognizing</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Owner financing with a low monthly payment</strong> that reframes the decision from
            &quot;is this land worth $8,000&quot; to &quot;can I afford $99 a month.&quot; Those are very
            different questions.
          </li>
          <li>
            <strong>Urgency.</strong> Another buyer is interested, the price goes up Monday. Land has
            sat there for ten thousand years; it can wait a week.
          </li>
          <li>
            <strong>Vague geography.</strong> &quot;Near&quot; a national park can mean a two-hour drive.
            Ask for the parcel number, not the marketing description.
          </li>
          <li>
            <strong>Photos that never show the access road</strong>, or drone shots taken high enough
            that you can&apos;t tell what&apos;s actually there.
          </li>
          <li>
            <strong>Contract for deed / land contract</strong> where you don&apos;t get the deed until
            it&apos;s fully paid. Understand what happens if you miss a payment — in some structures you
            can lose both the land and everything you&apos;ve paid.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What you can verify without traveling</h2>
        <p className="mt-2">
          Quite a lot, actually. Get the <strong>parcel number (APN/folio)</strong> first — refusal to
          provide it is itself an answer. Then:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>County property appraiser</strong> — confirms the real owner, assessed value, acreage
            and tax status. Check that the seller actually owns it and that taxes are current.
          </li>
          <li>
            <strong>County GIS parcel viewer</strong> — shows boundaries against roads, and lets you see
            whether the parcel touches a public right-of-way.
          </li>
          <li>
            <strong>Recent comparable sales</strong> in the same county. If everything else sells for ten
            times as much per acre, ask why this one doesn&apos;t.
          </li>
          <li>
            <strong>FEMA flood maps and the National Wetlands Inventory</strong> — both free and public.
          </li>
          <li>
            <strong>Call the county planning and health departments</strong> and ask, with the parcel
            number: is a home permitted here, and is a septic permit realistic on this parcel?
          </li>
          <li>
            <strong>Satellite and street-level imagery</strong>, plus historical imagery if available —
            look for whether a road actually reaches it.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Two things to do regardless</h2>
        <p className="mt-2">
          <strong>Get a title search and title insurance</strong>, even on a cheap parcel. Especially on
          a cheap parcel — bargain land is disproportionately land with title problems.
        </p>
        <p className="mt-3">
          <strong>Pay someone local to walk it</strong> if you truly can&apos;t go. A local surveyor,
          home inspector, or land agent will do this for a modest fee. Ask them to photograph the access
          road, the terrain, and the boundaries. A few hundred dollars against a five-figure purchase is
          not a close call.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">And then go see it</h2>
        <p className="mt-2">
          If at all possible, visit before closing. Photographs don&apos;t convey slope, road quality,
          noise, smell, how far the nearest services really are, or what the neighbors are doing. Buyers
          who regret a land purchase overwhelmingly say the same thing: it looked different in person.
        </p>
      </section>
    </GuideLayout>
  );
}
