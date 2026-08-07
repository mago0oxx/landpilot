import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { analysisSchema } from "@/features/analyze/schemas/analysisSchema";
import { DEFAULT_LOT_SIZE_SQFT } from "@/features/analyze/services/engines/defaults";
import { generateAiSummary } from "@/features/analyze/services/aiSummary";
import { buildKnownMap, mergeResearchedValues, researchMissingFields } from "@/features/analyze/services/aiResearch";
import { computeScenarios } from "@/features/analyze/services/scenarioComparator";
import { auth } from "@/auth";
import { isPlanId, PLANS } from "@/lib/plans";
import { prisma } from "@/lib/prisma";
import { calculateLPS } from "@/utils/calculateLPS";
import { calculateROI, roiInputsFromAnalysis } from "@/utils/calculateROI";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in to run an analysis." }, { status: 401 });
  }

  // Re-read the plan from the DB rather than trusting the session JWT — a Stripe webhook
  // can change it mid-session and JWT sessions don't automatically pick that up.
  const dbUser = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } });
  const plan = PLANS[isPlanId(dbUser?.plan ?? "") ? (dbUser!.plan as keyof typeof PLANS) : "free"];

  if (plan.monthlyAnalysisLimit !== null) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const analysesThisMonth = await prisma.landAnalysis.count({
      where: { property: { userId: session.user.id }, createdAt: { gte: startOfMonth } },
    });

    if (analysesThisMonth >= plan.monthlyAnalysisLimit) {
      return NextResponse.json(
        {
          error: `You've used all ${plan.monthlyAnalysisLimit} ${plan.label} analyses this month. Upgrade for more.`,
          code: "PLAN_LIMIT_REACHED",
        },
        { status: 402 }
      );
    }
  }

  const body = await request.json();
  const parsed = analysisSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid analysis input.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  let input = parsed.data;
  const intent = parsed.data.intent;
  let aiResearchedFields: string[] = [];

  if (body?.useAiResearch === true && plan.hasAiResearch) {
    const research = await researchMissingFields({
      address: input.property.address,
      county: input.property.county || "Unknown",
      state: input.property.state,
      known: buildKnownMap(input),
    });
    if (research.fieldsUsed.length > 0) {
      input = { ...mergeResearchedValues(input, research.values), intent };
      aiResearchedFields = research.fieldsUsed;
    }
  }

  const result = calculateLPS(input);
  // Don't let AI-researched (vs. verified) figures push the overall confidence to "High" —
  // web-search synthesis is still a step below a structured government/GIS data source.
  if (aiResearchedFields.length > 0 && result.confidenceLevel === "High") {
    result.confidenceLevel = "Medium";
  }
  const estimatedRoi = calculateROI(roiInputsFromAnalysis(input));
  const asJson = <T>(value: T) => JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;

  const scenarios = intent === "investment" && plan.hasScenarioComparison ? computeScenarios(input) : null;

  const aiSummary = await generateAiSummary(
    result,
    {
      address: input.property.address,
      county: input.property.county || "Unknown",
      state: input.property.state,
      askingPrice: input.property.askingPrice,
    },
    intent,
    scenarios
  );

  const analysis = await prisma.landAnalysis.create({
    data: {
      inputs: asJson(input),
      lpsScore: result.score,
      estimatedRoi,
      confidenceLevel: result.confidenceLevel,
      riskLevel: result.riskLevel,
      recommendation: result.recommendation,
      explanation: result.explanation,
      engineResults: asJson(result.engines),
      aiSummary,
      aiResearchedFields: asJson(aiResearchedFields),
      intent,
      scenarios: scenarios ? asJson(scenarios) : undefined,
      property: {
        create: {
          userId: session.user.id,
          address: input.property.address,
          county: input.property.county || "Unknown",
          state: input.property.state,
          parcelId: input.property.parcelId || null,
          listingUrl: input.property.listingUrl || null,
          lotSizeSqft: input.property.lotSizeSqft ?? DEFAULT_LOT_SIZE_SQFT,
          askingPrice: input.property.askingPrice,
        },
      },
    },
  });

  return NextResponse.json({ id: analysis.id }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const analyses = await prisma.landAnalysis.findMany({
    where: { property: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
    include: { property: true },
  });

  return NextResponse.json(
    analyses.map((analysis) => ({
      id: analysis.id,
      address: analysis.property.address,
      lpsScore: analysis.lpsScore,
      riskLevel: analysis.riskLevel,
      recommendation: analysis.recommendation,
      createdAt: analysis.createdAt,
    }))
  );
}
