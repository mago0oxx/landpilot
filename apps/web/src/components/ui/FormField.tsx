import { ReactNode } from "react";
import FormLabel from "./FormLabel";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  labelExtra?: ReactNode;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  labelExtra,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      {labelExtra ? (
        <div className="flex items-center justify-between">
          <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
          {labelExtra}
        </div>
      ) : (
        <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
      )}

      {children}
    </div>
  );
}