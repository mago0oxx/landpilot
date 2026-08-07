import { LabelHTMLAttributes } from "react";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function FormLabel({
  className = "",
  ...props
}: FormLabelProps) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-stone-600 ${className}`}
    />
  );
}