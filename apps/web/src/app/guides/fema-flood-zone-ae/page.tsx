import type { Metadata } from "next";
import GuideLayout from "@/features/marketing/components/GuideLayout";

export const metadata: Metadata = {
  title: "What FEMA Flood Zone AE Means for Your Land — LandPilot",
  description: "What FEMA Flood Zone AE means, how it differs from other flood zones, and how it affects insurance and construction.",
};

export default function FemaFloodZoneAePage() {
  return (
    <GuideLayout
      title="What FEMA Flood Zone AE Means for Your Land"
      dek="It doesn't automatically mean don't buy — but it changes your insurance costs and how you'll need to build."
    >
      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What FEMA flood zones are</h2>
        <p className="mt-2">
          FEMA maps the country into flood zones based on modeled flood risk. The zone a parcel falls
          in determines whether federally-backed mortgage lenders require flood insurance, and often
          affects how (or whether) you&apos;re allowed to build.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Zone AE specifically</h2>
        <p className="mt-2">
          Zone AE is part of the &quot;Special Flood Hazard Area&quot; — land with at least a 1% annual chance
          of flooding (commonly called the &quot;100-year floodplain&quot;) — and unlike Zone A, it has a
          determined Base Flood Elevation (BFE): the height floodwater is expected to reach in that
          1%-annual-chance event. That BFE number is what drives insurance rates and construction
          requirements.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">How it compares to other zones</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li><strong>Zone X:</strong> minimal flood risk — no flood insurance requirement from lenders</li>
          <li><strong>Zone A:</strong> same 1% annual risk as AE, but no BFE has been calculated</li>
          <li><strong>Zone AE:</strong> 1% annual risk, with a determined BFE</li>
          <li><strong>Zone VE:</strong> coastal high-hazard area — wave action in addition to flooding, the strictest building requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">What it means if you build here</h2>
        <p className="mt-2">
          Most jurisdictions require any new structure in Zone AE to have its lowest floor built at or
          above the BFE, often with an added freeboard margin — which can mean building on fill, piers,
          or an elevated foundation. That adds real construction cost. Flood insurance is typically
          required if you finance with a federally-backed loan, and premiums can be significant
          depending on the elevation relative to the BFE.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Does it mean don&apos;t buy?</h2>
        <p className="mt-2">
          Not automatically. Plenty of homes are built and insured in AE zones every year. What it
          means is you need to budget for elevated construction and ongoing insurance cost, and
          understand exactly where the parcel sits relative to the BFE before you commit. An elevation
          certificate — a surveyed measurement of the parcel&apos;s actual elevation — is worth getting if
          you&apos;re seriously considering building here.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">How to check a specific parcel</h2>
        <p className="mt-2">
          FEMA&apos;s Flood Map Service Center is free and public. LandPilot also pulls this automatically
          as part of every analysis, so you can see it alongside everything else before you dig further.
        </p>
      </section>
    </GuideLayout>
  );
}
