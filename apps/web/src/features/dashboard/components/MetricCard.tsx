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
    <div className="rounded-2xl border border-lp-border bg-white p-6 shadow-sm transition hover:border-lp-forest-light">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-500">
          {title}
        </span>

        {icon}
      </div>

      <h3 className="mt-4 font-mono text-3xl font-bold text-lp-ink">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-stone-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}