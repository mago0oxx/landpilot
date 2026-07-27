import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}