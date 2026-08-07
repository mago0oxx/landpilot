import { BarChart3, DollarSign, MapPinned, Star } from "lucide-react";

import MetricCard from "./MetricCard";

interface StatsSectionProps {
  averageRoi: number | null;
  propertiesAnalyzed: number;
  averageLps: number | null;
  portfolioValue: number;
  portfolioCount: number;
}

export default function StatsSection({
  averageRoi,
  propertiesAnalyzed,
  averageLps,
  portfolioValue,
  portfolioCount,
}: StatsSectionProps) {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Average ROI"
        value={averageRoi !== null ? `${averageRoi.toFixed(1)}%` : "--"}
        subtitle={averageRoi !== null ? "Target: 15%+" : "No analyses yet"}
        icon={<DollarSign size={20} className="text-lp-forest-light" />}
      />

      <MetricCard
        title="Properties Analyzed"
        value={String(propertiesAnalyzed)}
        subtitle={propertiesAnalyzed === 0 ? "Let's find the first one" : "Total analyzed"}
        icon={<MapPinned size={20} className="text-lp-forest-light" />}
      />

      <MetricCard
        title="Average LPS"
        value={averageLps !== null ? averageLps.toFixed(0) : "--"}
        subtitle={averageLps !== null ? "Out of 1000" : "No analyses yet"}
        icon={<Star size={20} className="text-lp-forest-light" />}
      />

      <MetricCard
        title="Portfolio"
        value={`$${portfolioValue.toLocaleString()}`}
        subtitle={portfolioCount === 0 ? "Nothing added yet" : `${portfolioCount} propert${portfolioCount === 1 ? "y" : "ies"} committed`}
        icon={<BarChart3 size={20} className="text-lp-forest-light" />}
      />
    </section>
  );
}
