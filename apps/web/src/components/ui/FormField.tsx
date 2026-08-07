import { ReactNode } from "react";
import FormLabel from "./FormLabel";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <FormLabel htmlFor={htmlFor}>
        {label}
      </FormLabel>

      {children}
    </div>
  );
}