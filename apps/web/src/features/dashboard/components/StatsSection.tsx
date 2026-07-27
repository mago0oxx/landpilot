import {
  BarChart3,
  DollarSign,
  MapPinned,
  Star,
} from "lucide-react";

import MetricCard from "./MetricCard";

export default function StatsSection() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Average ROI"
        value="18.4%"
        subtitle="Target: 15%+"
        icon={<DollarSign size={20} className="text-green-500" />}
      />

      <MetricCard
        title="Properties Analyzed"
        value="0"
        subtitle="Let's find the first one"
        icon={<MapPinned size={20} className="text-green-500" />}
      />

      <MetricCard
        title="Average LPS"
        value="--"
        subtitle="No analyses yet"
        icon={<Star size={20} className="text-green-500" />}
      />

      <MetricCard
        title="Portfolio"
        value="$0"
        subtitle="Future investments"
        icon={<BarChart3 size={20} className="text-green-500" />}
      />
    </section>)
}