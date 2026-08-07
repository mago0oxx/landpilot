import EmptyState from "@/features/dashboard/components/EmptyState";
import PropertiesList from "@/features/properties/components/PropertiesList";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Always reflects the latest saved analyses — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const analyses = await prisma.landAnalysis.findMany({
    where: { property: { userId } },
    orderBy: { createdAt: "desc" },
    include: { property: true },
  });

  if (analyses.length === 0) {
    return <EmptyState />;
  }

  return (
    <PropertiesList
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
  );
}
