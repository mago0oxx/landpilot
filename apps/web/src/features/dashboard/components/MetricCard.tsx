import { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-green-500">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400">
          {title}
        </span>

        {icon}
      </div>

      <h3 className="mt-4 text-3xl font-bold">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-zinc-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}