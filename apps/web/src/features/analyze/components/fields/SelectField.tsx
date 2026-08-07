"use client";

import { FieldPath, useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import Select from "@/components/ui/Select";
import { AnalysisFormInput } from "../../schemas/analysisSchema";

interface SelectFieldProps {
  name: FieldPath<AnalysisFormInput>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function SelectField({ name, label, options, placeholder }: SelectFieldProps) {
  const { register } = useFormContext<AnalysisFormInput>();

  return (
    <FormField label={label} htmlFor={name}>
      <Select id={name} options={options} placeholder={placeholder} defaultValue="" {...register(name)} />
    </FormField>
  );
}
