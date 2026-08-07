"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import SectionCard from "@/components/ui/SectionCard";
import { AnalysisFormInput } from "../../schemas/analysisSchema";
import { extractListingData, lookupPropertyData } from "../../services/geocodeApi";
import NumberField from "../fields/NumberField";
import TextField from "../fields/TextField";

export default function PropertyInformationSection() {
  const { getValues, setValue } = useFormContext<AnalysisFormInput>();
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupNote, setLookupNote] = useState<string>();
  const [listingText, setListingText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractNote, setExtractNote] = useState<string>();

  async function handleAddressBlur() {
    const address = getValues("property.address");
    if (!address) return;

    setIsLookingUp(true);
    setLookupNote(undefined);
    try {
      const result = await lookupPropertyData(address);
      const found: string[] = [];

      const county = getValues("property.county") as string | undefined;
      if (result.county && !county?.trim()) {
        setValue("property.county", result.county, { shouldDirty: true });
        found.push("county");
      }
      if (result.state) setValue("property.state", result.state, { shouldDirty: true });

      if (result.femaFloodZone) {
        setValue("environmental.femaFloodZone", result.femaFloodZone, { shouldDirty: true });
        found.push("FEMA flood zone");
      }

      const parcelId = getValues("property.parcelId") as string | undefined;
      if (result.parcelId && !parcelId?.trim()) {
        setValue("property.parcelId", result.parcelId, { shouldDirty: true });
        found.push("parcel folio");
      }

      const lotSizeSqft = getValues("property.lotSizeSqft");
      if (result.lotSizeSqft && !lotSizeSqft) {
        setValue("property.lotSizeSqft", result.lotSizeSqft, { shouldDirty: true });
        found.push("real lot size");
      }

      const populationGrowthRatePercent = getValues("location.populationGrowthRatePercent");
      if (result.populationGrowthRatePercent != null && !populationGrowthRatePercent) {
        setValue("location.populationGrowthRatePercent", result.populationGrowthRatePercent, { shouldDirty: true });
        found.push("population growth");
      }

      const employmentGrowthRatePercent = getValues("location.employmentGrowthRatePercent");
      if (result.employmentGrowthRatePercent != null && !employmentGrowthRatePercent) {
        setValue("location.employmentGrowthRatePercent", result.employmentGrowthRatePercent, { shouldDirty: true });
        found.push("employment growth");
      }

      if (result.wetlandsPresent != null && getValues("environmental.wetlandsPresent") === undefined) {
        setValue("environmental.wetlandsPresent", result.wetlandsPresent, { shouldDirty: true });
        found.push("wetlands check");
      }

      if (result.naturalHazardExposure && !getValues("environmental.naturalHazardExposure")) {
        setValue("environmental.naturalHazardExposure", result.naturalHazardExposure, { shouldDirty: true });
        found.push("natural hazard exposure");
      }

      const nearbyAmenitiesCount = getValues("location.nearbyAmenitiesCount");
      if (result.nearbyAmenitiesCount != null && !nearbyAmenitiesCount) {
        setValue("location.nearbyAmenitiesCount", result.nearbyAmenitiesCount, { shouldDirty: true });
        found.push("nearby amenities");
      }

      if (found.length > 0) {
        setLookupNote(`✓ Found real data: ${found.join(", ")}.`);
      }
    } finally {
      setIsLookingUp(false);
    }
  }

  async function handleExtractListing() {
    if (!listingText.trim()) return;

    setIsExtracting(true);
    setExtractNote(undefined);
    try {
      const result = await extractListingData(listingText);
      const found: string[] = [];

      const askingPrice = getValues("property.askingPrice");
      if (result.askingPrice && !askingPrice) {
        setValue("property.askingPrice", result.askingPrice, { shouldDirty: true });
        found.push("asking price");
      }

      const lotSizeSqft = getValues("property.lotSizeSqft");
      if (result.lotSizeSqft && !lotSizeSqft) {
        setValue("property.lotSizeSqft", result.lotSizeSqft, { shouldDirty: true });
        found.push("lot size");
      }

      const address = getValues("property.address") as string | undefined;
      if (result.address && !address?.trim()) {
        setValue("property.address", result.address, { shouldDirty: true });
        found.push("address");
      }

      setExtractNote(
        found.length > 0
          ? `✓ Extracted: ${found.join(", ")}.`
          : "Didn't find any new fields in that text — try pasting more of the listing (price, lot size)."
      );
    } finally {
      setIsExtracting(false);
    }
  }

  return (
    <SectionCard
      title="📍 Property Information"
      description="Just the address and asking price are required — everything else is optional and defaults to typical Florida assumptions you can refine later."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextField
          name="property.address"
          label="Address"
          placeholder="123 Main St, Tampa, FL"
          required
          onBlur={handleAddressBlur}
        />
        <NumberField name="property.askingPrice" label="Asking Price ($)" required />
        <TextField
          name="property.county"
          label="County"
          placeholder={isLookingUp ? "Looking up..." : "Auto-filled from address"}
        />
        <TextField name="property.state" label="State" placeholder="FL" />
        <TextField name="property.parcelId" label="Parcel ID" placeholder="Auto-filled for Hillsborough County" />
        <TextField name="property.listingUrl" label="Zillow / Realtor URL" placeholder="Optional" />
        <NumberField
          name="property.lotSizeSqft"
          label="Lot Size (sqft)"
          placeholder="Leave blank to use a typical FL lot size"
        />
      </div>
      {lookupNote && <p className="mt-4 text-sm text-emerald-400">{lookupNote}</p>}

      <div className="mt-6 rounded-xl border border-lp-gold/25 bg-lp-gold/5 p-4">
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-lp-gold" />
          <p className="text-sm font-medium text-lp-ink">Paste the listing text (optional)</p>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          Copy the price and lot size from the Zillow/Realtor page and paste it below — Claude
          will fill in the matching fields above. We never fetch the link itself (Zillow/Realtor
          block that), so this only reads text you paste here.
        </p>
        <textarea
          value={listingText}
          onChange={(e) => setListingText(e.target.value)}
          placeholder="e.g. $95,000 · 0.5 acre lot · 18037 Ackerman Ave Lot 13, Port Charlotte, FL 33948..."
          rows={4}
          className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-lp-ink placeholder:text-stone-400 outline-none transition focus:border-lp-forest"
        />
        <button
          type="button"
          onClick={handleExtractListing}
          disabled={isExtracting || !listingText.trim()}
          className="mt-3 inline-flex items-center justify-center rounded-xl border border-lp-forest/20 px-4 py-2 text-sm font-medium text-lp-ink transition hover:border-lp-forest/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isExtracting ? "Extracting..." : "Extract with AI"}
        </button>
        {extractNote && <p className="mt-3 text-sm text-emerald-700">{extractNote}</p>}
      </div>
    </SectionCard>
  );
}
