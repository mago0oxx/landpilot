"use client";

import { FieldPath, useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import Select from "@/components/ui/Select";
import { AnalysisFormInput } from "../../schemas/analysisSchema";

interface BooleanSelectFieldProps {
  name: FieldPath<AnalysisFormInput>;
  label: string;
}

const OPTIONS = [
  { value: "unknown", label: "Unknown / Not researched" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/**
 * Renders a tri-state (Unknown/Yes/No) select for boolean fields instead of a checkbox,
 * so "not researched yet" stays distinguishable from an explicit "No" — this preserves
 * the Decision Intelligence confidence calculation (docs/engines/decision-intelligence.md).
 */
export default function BooleanSelectField({ name, label }: BooleanSelectFieldProps) {
  const { register } = useFormContext<AnalysisFormInput>();

  return (
    <FormField label={label} htmlFor={name}>
      <Select
        id={name}
        options={OPTIONS}
        defaultValue="unknown"
        {...register(name, {
          setValueAs: (value) => (value === "unknown" ? undefined : value === "yes"),
        })}
      />
    </FormField>
  );
}
