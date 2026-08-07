import { Star, TrendingDown, TrendingUp } from "lucide-react";
import EmptyState from "@/features/dashboard/components/EmptyState";
import MetricCard from "@/features/dashboard/components/MetricCard";
import EngineStatsGrid from "@/features/intelligence/components/EngineStatsGrid";
import { computeEngineStats } from "@/features/intelligence/computeEngineStats";
import { EngineResult, Recommendation } from "@/features/analyze/types/scoring";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function IntelligencePage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const analyses = await prisma.landAnalysis.findMany({
    where: { property: { userId } },
    select: { engineResults: true, recommendation: true },
  });

  if (analyses.length === 0) {
    return <EmptyState />;
  }

  const stats = computeEngineStats(analyses.map((a) => a.engineResults as unknown as EngineResult[]));
  const strongest = stats[stats.length - 1];
  const weakest = stats[0];

  const recommendationCounts = analyses.reduce(
    (acc, a) => {
      const rec = a.recommendation as Recommendation;
      acc[rec] = (acc[rec] ?? 0) + 1;
      return acc;
    },
    {} as Record<Recommendation, number>
  );
  const buyLike = (recommendationCounts["Strong Buy"] ?? 0) + (recommendationCounts["Buy"] ?? 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Strongest engine"
          value={strongest?.label ?? "—"}
          subtitle={strongest ? `${strongest.avgScore}/100 average` : undefined}
          icon={<TrendingUp size={20} className="text-lp-forest-light" />}
        />
        <MetricCard
          title="Weakest engine"
          value={weakest?.label ?? "—"}
          subtitle={weakest ? `${weakest.avgScore}/100 average` : undefined}
          icon={<TrendingDown size={20} className="text-lp-forest-light" />}
        />
        <MetricCard
          title="Buy-rated properties"
          value={`${buyLike}/${analyses.length}`}
          subtitle="Strong Buy or Buy recommendation"
          icon={<Star size={20} className="text-lp-forest-light" />}
        />
      </section>

      <EngineStatsGrid stats={stats} totalAnalyses={analyses.length} />
    </div>
  );
}
