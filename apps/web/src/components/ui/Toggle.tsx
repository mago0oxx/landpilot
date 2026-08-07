import { InputHTMLAttributes, forwardRef } from "react";

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, className = "", ...props },
  ref
) {
  return (
    <label className="flex items-center gap-3 text-sm text-zinc-300">
      <input
        ref={ref}
        type="checkbox"
        {...props}
        className={`
          h-5
          w-5
          rounded
          border
          border-zinc-700
          bg-zinc-950
          accent-emerald-500
          ${className}
        `}
      />
      {label}
    </label>
  );
});

export default Toggle;
