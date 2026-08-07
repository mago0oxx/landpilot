import DashboardHero from "@/features/dashboard/components/DashboardHero";
import EmptyState from "@/features/dashboard/components/EmptyState";
import RecentAnalyses from "@/features/dashboard/components/RecentAnalyses";
import StatsSection from "@/features/dashboard/components/StatsSection";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Always reflects the latest saved analyses — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const [analyses, aggregates, portfolio] = await Promise.all([
    prisma.landAnalysis.findMany({
      where: { property: { userId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { property: true },
    }),
    prisma.landAnalysis.aggregate({
      where: { property: { userId } },
      _avg: { lpsScore: true, estimatedRoi: true },
      _count: true,
    }),
    // Portfolio value only counts properties the investor has actually committed to —
    // not every property they've merely analyzed (see MetricCard "Portfolio" below).
    prisma.property.aggregate({
      where: { userId, inPortfolio: true },
      _sum: { askingPrice: true },
      _count: true,
    }),
  ]);

  return (
    <>
      <DashboardHero userName={session!.user!.name ?? "there"} />
      <StatsSection
        averageRoi={aggregates._avg.estimatedRoi}
        propertiesAnalyzed={aggregates._count}
        averageLps={aggregates._avg.lpsScore}
        portfolioValue={portfolio._sum.askingPrice ?? 0}
        portfolioCount={portfolio._count}
      />
      {analyses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <RecentAnalyses
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
        </div>
      )}
    </>
  );
}
