import { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({ className = "", options, placeholder, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-stone-300
        bg-white
        px-4
        py-3
        text-lp-ink
        outline-none
        transition
        focus:border-lp-forest
        ${className}
      `}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
