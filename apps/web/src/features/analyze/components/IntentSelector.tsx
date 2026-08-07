"use client";

import { useFormContext } from "react-hook-form";
import { AnalysisFormInput } from "../schemas/analysisSchema";

const OPTIONS = [
  {
    value: "investment" as const,
    icon: "🏗️",
    title: "Inversión",
    description: "Quiero maximizar el retorno — comparar qué construir y si conviene vender o alquilar.",
  },
  {
    value: "residence" as const,
    icon: "🏡",
    title: "Vivienda principal",
    description: "Quiero saber si es un buen lugar para vivir — no me interesa el ROI.",
  },
];

export default function IntentSelector() {
  const { watch, setValue } = useFormContext<AnalysisFormInput>();
  const intent = watch("intent");

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-lp-ink">¿Para qué buscás este terreno?</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const selected = intent === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("intent", option.value, { shouldDirty: true, shouldValidate: true })}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-lp-forest bg-lp-forest/5 ring-1 ring-lp-forest"
                  : "border-lp-border bg-white hover:border-lp-forest/40"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <p className="mt-1 text-sm font-semibold text-lp-ink">{option.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">{option.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
