"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { getMissingFieldsForEngine } from "../services/engines/factorFields";
import { recalculateAnalysis } from "../services/analysisApi";
import { LandAnalysisInput } from "../types/property";
import { EngineResult } from "../types/scoring";
import EngineCard from "./EngineCard";

interface EngineCardWithRecalculateProps {
  analysisId: string;
  engine: EngineResult;
  aiResearched?: boolean;
  inputs: LandAnalysisInput;
}

export default function EngineCardWithRecalculate({
  analysisId,
  engine,
  aiResearched,
  inputs,
}: EngineCardWithRecalculateProps) {
  const router = useRouter();
  const missingFields = getMissingFieldsForEngine(engine.engine, inputs);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  if (missingFields.length === 0) {
    return <EngineCard engine={engine} aiResearched={aiResearched} />;
  }

  async function handleSubmit() {
    const updates: Record<string, unknown> = {};
    for (const field of missingFields) {
      const value = values[field.path];
      if (field.type === "number") {
        if (typeof value === "string" && value.trim() !== "") updates[field.path] = Number(value);
      } else if (value !== undefined) {
        updates[field.path] = value;
      }
    }

    if (Object.keys(updates).length === 0) {
      setError("Fill in at least one field before recalculating.");
      return;
    }

    setIsSubmitting(true);
    setError(undefined);
    try {
      await recalculateAnalysis(analysisId, updates);
      setOpen(false);
      setValues({});
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to recalculate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <EngineCard engine={engine} aiResearched={aiResearched} onClick={() => setOpen(true)} />
      {open && (
        <Modal
          title={`Add missing ${engine.label} data`}
          description="Recalculating updates this analysis in place — it doesn't use another one of your monthly analyses."
          onClose={() => setOpen(false)}
        >
          <div className="space-y-4">
            {missingFields.map((field) => (
              <FormField key={field.path} label={field.suffix ? `${field.label} (${field.suffix})` : field.label} htmlFor={field.path}>
                {field.type === "number" && (
                  <TextInput
                    id={field.path}
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step ?? "any"}
                    value={typeof values[field.path] === "string" ? (values[field.path] as string) : ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.path]: e.target.value }))}
                  />
                )}
                {field.type === "boolean" && (
                  <div className="flex gap-2">
                    {[
                      { value: true, label: "Yes" },
                      { value: false, label: "No" },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => setValues((v) => ({ ...v, [field.path]: opt.value }))}
                        className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                          values[field.path] === opt.value
                            ? "border-lp-forest bg-lp-forest/5 text-lp-ink"
                            : "border-lp-border text-stone-500 hover:border-lp-forest/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
                {field.type === "enum" && (
                  <Select
                    id={field.path}
                    options={field.options ?? []}
                    placeholder="Select..."
                    value={typeof values[field.path] === "string" ? (values[field.path] as string) : ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.path]: e.target.value }))}
                  />
                )}
              </FormField>
            ))}

            {error && <p className="text-sm text-red-700">{error}</p>}

            <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Recalculating..." : "Recalculate"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
