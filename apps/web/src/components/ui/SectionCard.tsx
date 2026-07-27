import { ReactNode } from "react";
import Card from "./Card";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <Card>
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-zinc-400">
          {description}
        </p>
      )}

      <div className="mt-8">
        {children}
      </div>
    </Card>
  );
}