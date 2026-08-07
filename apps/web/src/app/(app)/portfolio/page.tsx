import { Landmark, MapPinned, Star, TrendingUp } from "lucide-react";
import RecentAnalyses from "@/features/dashboard/components/RecentAnalyses";
import MetricCard from "@/features/dashboard/components/MetricCard";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Always reflects the latest portfolio state — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const [analyses, aggregates] = await Promise.all([
    prisma.landAnalysis.findMany({
      where: { property: { userId, inPortfolio: true } },
      orderBy: { createdAt: "desc" },
      include: { property: true },
    }),
    prisma.landAnalysis.aggregate({
      where: { property: { userId, inPortfolio: true } },
      _avg: { lpsScore: true, estimatedRoi: true },
      _count: true,
    }),
  ]);

  const totalValue = analyses.reduce((sum, analysis) => sum + analysis.property.askingPrice, 0);

  return (
    <div>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Properties"
          value={String(aggregates._count)}
          subtitle={aggregates._count === 0 ? "Nothing added yet" : "In your portfolio"}
          icon={<MapPinned size={20} className="text-lp-forest-light" />}
        />
        <MetricCard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          subtitle="Sum of asking prices"
          icon={<Landmark size={20} className="text-lp-forest-light" />}
        />
        <MetricCard
          title="Average ROI"
          value={aggregates._avg.estimatedRoi !== null ? `${aggregates._avg.estimatedRoi.toFixed(1)}%` : "--"}
          subtitle="Across portfolio"
          icon={<TrendingUp size={20} className="text-lp-forest-light" />}
        />
        <MetricCard
          title="Average LPS"
          value={aggregates._avg.lpsScore !== null ? aggregates._avg.lpsScore.toFixed(0) : "--"}
          subtitle="Out of 1000"
          icon={<Star size={20} className="text-lp-forest-light" />}
        />
      </section>

      <div className="mt-10">
        {analyses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-lp-forest/25 bg-white/60 p-12 text-center">
            <p className="text-lg font-medium text-lp-ink">Your portfolio is empty</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
              Open any analyzed property and click &quot;Add to Portfolio&quot; to track it here.
            </p>
          </div>
        ) : (
          <RecentAnalyses
            title="Portfolio Properties"
            description="Committed investments, sorted by most recently added."
            analyses={analyses.map((analysis) => ({
              id: analysis.id,
              address: analysis.property.address,
              lpsScore: analysis.lpsScore,
              riskLevel: analysis.riskLevel as "Low" | "Medium" | "High",
              recommendation: analysis.recommendation as "Strong Buy" | "Buy" | "Consider" | "Pass",
              createdAt: analysis.createdAt,
              inPortfolio: analysis.property.inPortfolio,
            }))}
          />
        )}
      </div>
    </div>
  );
}
