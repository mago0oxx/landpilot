"use client";

import { FieldPath, useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";
import { AnalysisFormInput } from "../../schemas/analysisSchema";
import { getFieldError } from "./fieldError";

interface TextFieldProps {
  name: FieldPath<AnalysisFormInput>;
  label: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: () => void;
}

export default function TextField({ name, label, placeholder, required, onBlur }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AnalysisFormInput>();
  const error = getFieldError(errors, name);
  const { onBlur: rhfOnBlur, ...registration } = register(name);

  return (
    <FormField label={required ? `${label} *` : label} htmlFor={name}>
      <TextInput
        id={name}
        type="text"
        placeholder={placeholder}
        {...registration}
        onBlur={(event) => {
          rhfOnBlur(event);
          onBlur?.();
        }}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </FormField>
  );
}
