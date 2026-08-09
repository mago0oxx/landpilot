"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { PLANS, PlanId } from "@/lib/plans";
import { analysisSchema, AnalysisFormInput, AnalysisFormValues } from "../schemas/analysisSchema";
import { AnalysisApiError, createAnalysis } from "../services/analysisApi";
import AiResearchToggle from "./AiResearchToggle";
import AnalyzingOverlay from "./AnalyzingOverlay";
import IntentSelector from "./IntentSelector";
import PropertyInformationSection from "./sections/PropertyInformationSection";
import ReviewSection from "./sections/ReviewSection";

interface AnalyzeFormProps {
  plan: PlanId;
}

export default function AnalyzeForm({ plan }: AnalyzeFormProps) {
  const planConfig = PLANS[plan];
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [planLimitReached, setPlanLimitReached] = useState(false);
  const [useAiResearch, setUseAiResearch] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

  const methods = useForm<AnalysisFormInput, unknown, AnalysisFormValues>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      intent: "investment",
      property: { state: "FL" },
      // These sections no longer have their own form UI (see the removed *Section
      // components), but analysisSchema still requires each key to be present — react-hook-form
      // never registers a field under them now, so without this the submitted value is
      // `undefined` and zod rejects it before onSubmit ever runs.
      location: {},
      development: {},
      financial: {},
      environmental: {},
      market: {},
      legal: {},
      infrastructure: {},
    },
  });

  const address = useWatch({ control: methods.control, name: "property.address" });

  async function onSubmit(values: AnalysisFormValues) {
    setIsSubmitting(true);
    setResponseReceived(false);
    setSubmitError(undefined);
    setPlanLimitReached(false);
    try {
      const { id } = await createAnalysis(values, useAiResearch);
      setResponseReceived(true);
      router.push(`/analyses/${id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unexpected error running the analysis.");
      setPlanLimitReached(error instanceof AnalysisApiError && error.code === "PLAN_LIMIT_REACHED");
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <IntentSelector />
        <PropertyInformationSection />
        {planConfig.hasAiResearch ? (
          <AiResearchToggle checked={useAiResearch} onChange={setUseAiResearch} />
        ) : (
          <div className="flex items-start gap-3 rounded-xl border border-lp-border bg-stone-50 p-4">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-stone-400" />
            <div>
              <p className="text-sm font-medium text-lp-ink">AI research and strategy comparison</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                Available on the Pro plan.{" "}
                <Link href="/pricing" className="font-medium text-lp-forest-light underline">
                  View plans
                </Link>
              </p>
            </div>
          </div>
        )}
        <ReviewSection isSubmitting={isSubmitting} submitError={submitError} planLimitReached={planLimitReached} />
      </form>

      {isSubmitting && (
        <AnalyzingOverlay address={address ?? ""} aiResearchEnabled={useAiResearch} done={responseReceived} />
      )}
    </FormProvider>
  );
}
