import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  className = "",
  ...props
}: TextInputProps) {
  return (
    <input
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
        placeholder:text-stone-400
        outline-none
        transition
        focus:border-lp-forest
        ${className}
      `}
    />
  );
}