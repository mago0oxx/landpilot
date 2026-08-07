import SectionCard from "@/components/ui/SectionCard";
import { EngineAggregate } from "../computeEngineStats";

function scoreTone(score: number): string {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export default function EngineStatsGrid({ stats, totalAnalyses }: { stats: EngineAggregate[]; totalAnalyses: number }) {
  const weakest = stats[0];

  return (
    <SectionCard
      title="Engine performance across your analyses"
      description={`Averages across all ${totalAnalyses} propert${totalAnalyses === 1 ? "y" : "ies"} you've analyzed — sorted weakest first.`}
    >
      {weakest && weakest.weakestCount > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>{weakest.label}</strong> is your most common weak spot — it scored lowest in{" "}
          {weakest.weakestCount} of {totalAnalyses} analyses.
        </div>
      )}

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.engine} className="rounded-xl border border-lp-border p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lp-ink">{stat.label}</p>
              <span className="font-mono text-sm text-stone-500">{stat.avgScore}/100 avg</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div className={`h-full rounded-full ${scoreTone(stat.avgScore)}`} style={{ width: `${stat.avgScore}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-stone-500">
              <span>Avg. data confidence: {stat.avgConfidence}%</span>
              <span>Weakest link in {stat.weakestCount}/{totalAnalyses} analyses</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
