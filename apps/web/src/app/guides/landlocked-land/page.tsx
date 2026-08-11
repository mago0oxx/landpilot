import type { Metadata } from "next";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "How to Check If a Lot Has Legal Access (Landlocked Land)",
  description: "The difference between physical access and legal access to a parcel, and how to confirm a lot isn't landlocked before you buy.",
};

export default function LandlockedLandPage() {
  return (
    <GuideLayout
      slug="landlocked-land"
      title="How to Check If a Lot Has Legal Access (Landlocked Land)"
      dek="A dirt path to the road isn't the same as a legal right to use it. Here's how to tell the difference."
    >
      <section>
        <p>
          A landlocked parcel has no direct legal access to a public road — it&apos;s surrounded by other
          privately owned land. This is a bigger problem than it sounds: without legal access, you can
          often struggle to get a building permit, get utilities run, get a mortgage, or even legally
          reach the property without technically trespassing.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Physical access vs. legal access</h2>
        <p className="mt-2">
          These are not the same thing. A dirt trail might physically connect a lot to the road — maybe
          the current owner, or the neighbor before them, has been driving over a corner of a
          neighboring property for years. That doesn&apos;t mean there&apos;s a legal right to keep doing it.
          If that access was never formally recorded, a future owner of the neighboring land can legally
          block it — fence it off, gate it, or sue for trespass.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What a recorded easement is</h2>
        <p className="mt-2">
          An easement is a legal right, recorded in the county land records, that lets a parcel&apos;s
          owner (and their successors) use a defined strip of a neighboring property for access
          (&quot;ingress and egress&quot;). A recorded easement runs with the land — it survives a change of
          ownership on either side. A handshake agreement or an unrecorded verbal understanding does
          not.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">How to check before you buy</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Look at the recorded plat or survey for the parcel — does it show frontage on a public road?</li>
          <li>Check the county GIS/property appraiser map for the parcel&apos;s boundaries relative to mapped roads</li>
          <li>Ask a title company to search for any recorded ingress/egress easement benefiting the parcel</li>
          <li>Ask the seller directly, in writing, how they currently access the property — and get it confirmed by title, not just their word</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">If a lot is landlocked, it&apos;s not automatically dead</h2>
        <p className="mt-2">
          It&apos;s sometimes possible to purchase or negotiate an easement from the neighboring landowner,
          or in some states, pursue a legal &quot;easement by necessity.&quot; Both can be slow, uncertain, and
          expensive — and there&apos;s no guarantee a neighbor agrees. Treat a landlocked lot as a real risk
          to price in, not a minor paperwork issue to sort out after closing.
        </p>
      </section>
    </GuideLayout>
  );
}
