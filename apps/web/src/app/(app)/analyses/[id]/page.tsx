import { notFound } from "next/navigation";
import AnalysisResult from "@/features/analyze/components/AnalysisResult";
import { LPSResult } from "@/features/analyze/types/scoring";
import { ScenarioResult } from "@/features/analyze/types/scenario";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface AnalysisPageProps {
  params: Promise<{ id: string }>;
}

// Each analysis is looked up by id at request time — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const { id } = await params;
  const session = await auth();

  const analysis = await prisma.landAnalysis.findUnique({
    where: { id },
    include: { property: true },
  });

  // Same 404 whether the analysis doesn't exist or belongs to someone else —
  // don't leak which analysis IDs are real to a user who isn't the owner.
  if (!analysis || analysis.property.userId !== session!.user!.id) {
    notFound();
  }

  const result: LPSResult = {
    score: analysis.lpsScore,
    confidenceLevel: analysis.confidenceLevel as LPSResult["confidenceLevel"],
    riskLevel: analysis.riskLevel as LPSResult["riskLevel"],
    recommendation: analysis.recommendation as LPSResult["recommendation"],
    explanation: analysis.explanation,
    engines: analysis.engineResults as unknown as LPSResult["engines"],
  };

  return (
    <AnalysisResult
      analysisId={analysis.id}
      result={result}
      aiSummary={analysis.aiSummary}
      aiResearchedFields={analysis.aiResearchedFields as string[]}
      scenarios={analysis.scenarios as unknown as ScenarioResult[] | null}
      inPortfolio={analysis.property.inPortfolio}
      property={{
        address: analysis.property.address,
        county: analysis.property.county,
        state: analysis.property.state,
        lotSizeSqft: analysis.property.lotSizeSqft,
        askingPrice: analysis.property.askingPrice,
        listingUrl: analysis.property.listingUrl,
      }}
    />
  );
}
