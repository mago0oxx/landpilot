"use client";

import Link from "next/link";
import { useFormContext } from "react-hook-form";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import { AnalysisFormInput } from "../../schemas/analysisSchema";

interface ReviewSectionProps {
  isSubmitting: boolean;
  submitError?: string;
  planLimitReached?: boolean;
}

export default function ReviewSection({ isSubmitting, submitError, planLimitReached }: ReviewSectionProps) {
  const { watch } = useFormContext<AnalysisFormInput>();
  const property = watch("property");

  return (
    <SectionCard title="✅ Review & Run Analysis" description="Run the LPS Engine across the seven Intelligence Engines.">
      <div className="space-y-6">
        <div className="rounded-xl border border-lp-border bg-stone-50 p-4 text-sm text-stone-500">
          <p className="text-lp-ink">{property?.address || "Address not set"}</p>
          <p>
            {(property?.county as string | undefined) || "County auto-detected at submission"}, {property?.state || "FL"}
          </p>
          <p>
            Lot size: {property?.lotSizeSqft != null ? String(property.lotSizeSqft) : "—"} sqft · Asking price: $
            {property?.askingPrice != null ? String(property.askingPrice) : "—"}
          </p>
        </div>

        {submitError && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {submitError}
            {planLimitReached && (
              <>
                {" "}
                <Link href="/pricing" className="font-medium underline hover:text-red-300">
                  View plans →
                </Link>
              </>
            )}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Running LPS Engine..." : "Run LPS Analysis"}
        </Button>
      </div>
    </SectionCard>
  );
}
