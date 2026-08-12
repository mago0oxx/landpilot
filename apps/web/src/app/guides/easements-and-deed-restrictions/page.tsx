import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "Easements and Deed Restrictions on Vacant Land",
  description:
    "The private rules that ride along with a parcel — who can cross it, what you can build, and how to find them before closing rather than after.",
};

export default function EasementsPage() {
  return (
    <GuideLayout
      slug="easements-and-deed-restrictions"
      title="Easements and Deed Restrictions on Vacant Land"
      dek="Zoning is the county's rules. These are the private ones — and they're often stricter, invisible on a map, and legally binding on you."
    >
      <section>
        <p>
          Two parcels can sit side by side with identical zoning and identical soil, and one can be
          worth substantially less because of paperwork recorded decades ago. Easements and deed
          restrictions travel with the land, not with the person who agreed to them, so they become
          yours the moment you close.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Easements: someone else&apos;s right to use your land</h2>
        <p className="mt-2">
          An easement gives a party the legal right to use a defined part of your property for a
          specific purpose. You still own the land; you just can&apos;t block that use. The common ones:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Utility easements</strong> — the power, water, or gas company&apos;s right to run and
            maintain lines across a strip of the parcel. You generally can&apos;t build on that strip,
            which can shrink where a house can physically go.
          </li>
          <li>
            <strong>Access easements</strong> — a neighbor&apos;s recorded right to cross your land to
            reach theirs. If your parcel is the one being crossed, expect traffic. If your parcel is the
            one doing the crossing, you want that easement to exist — see{" "}
            <Link href="/guides/landlocked-land" className="font-medium text-lp-forest-light hover:underline">landlocked land</Link>.
          </li>
          <li>
            <strong>Drainage easements</strong> — the right for water to flow across or collect on part
            of the parcel. Often overlaps with the least buildable ground.
          </li>
          <li>
            <strong>Conservation easements</strong> — a permanent restriction on developing some or all
            of the parcel, usually held by a land trust or government body. These can be very
            restrictive and are effectively impossible to undo.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Deed restrictions and covenants</h2>
        <p className="mt-2">
          These are private rules written into the chain of title, usually by whoever originally
          subdivided the land. They can be far stricter than zoning, and the county has nothing to do
          with enforcing them — neighbors and HOAs do, in civil court.
        </p>
        <p className="mt-3">Typical restrictions on rural and subdivision land:</p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Minimum home square footage — a common reason a cabin or tiny home plan dies</li>
          <li>No manufactured, modular, or mobile homes</li>
          <li>No RVs or camping on the parcel while you build</li>
          <li>No subdividing the parcel further</li>
          <li>Required architectural review or approved exterior materials</li>
          <li>Limits on livestock, outbuildings, or running a business</li>
          <li>Mandatory HOA membership and dues, even on vacant land</li>
        </ul>
        <p className="mt-3">
          Note that last one. Buying an empty lot in a platted subdivision can come with HOA dues you
          pay every year while nothing is built.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Mineral and water rights may not come with the land</h2>
        <p className="mt-2">
          In much of the US, mineral rights can be severed from surface rights and sold separately. If
          someone else owns the minerals under your parcel, they may have the legal right to access the
          surface to get to them. Water rights work similarly in many western states, where owning land
          near water does not automatically grant the right to use it.
        </p>
        <p className="mt-3">
          Ask explicitly whether mineral and water rights convey with the sale. Don&apos;t assume.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">How to find all of this</h2>
        <p className="mt-2">
          None of it lives in a public map or dataset you can query. It lives in recorded documents in
          the county land records, and finding it reliably means asking someone to look:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Order a title search early</strong> — before you&apos;re under contract if you can,
            not during the final week of closing. A title company will pull recorded easements,
            restrictions, liens, and the chain of ownership.
          </li>
          <li>
            <strong>Ask for the recorded plat</strong> of the subdivision, which usually shows platted
            easements graphically.
          </li>
          <li>
            <strong>Ask the seller in writing</strong> for any CC&amp;Rs, HOA documents, and known
            easements. Get it in writing so it&apos;s a representation, not a memory.
          </li>
          <li>
            <strong>Read the title commitment&apos;s exceptions.</strong> This is the section people skip.
            Schedule B lists exactly what the title insurance will <em>not</em> cover, and that list is a
            precise inventory of what&apos;s recorded against the parcel.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Why an address check can&apos;t tell you this</h2>
        <p className="mt-2">
          Flood zones, wetlands and hazard ratings are published as machine-readable government layers,
          so software can check them from an address in seconds. Easements and deed restrictions are
          scanned documents filed in a county courthouse, indexed by name and book-and-page. No tool can
          reliably read them from an address — including ours. This is the part you pay a title company
          for, and it&apos;s worth every dollar.
        </p>
      </section>
    </GuideLayout>
  );
}
