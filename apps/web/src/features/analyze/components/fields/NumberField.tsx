"use client";

import { FieldPath, useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { AnalysisFormInput } from "../../schemas/analysisSchema";
import { getFieldError } from "./fieldError";

interface NumberFieldProps {
  name: FieldPath<AnalysisFormInput>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function NumberField({ name, label, placeholder, required }: NumberFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AnalysisFormInput>();
  const error = getFieldError(errors, name);

  return (
    <FormField label={required ? `${label} *` : label} htmlFor={name}>
      <TextInput
        id={name}
        type="number"
        step="any"
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </FormField>
  );
}
