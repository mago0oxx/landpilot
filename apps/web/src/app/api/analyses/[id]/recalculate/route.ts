import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { analysisSchema } from "@/features/analyze/schemas/analysisSchema";
import { ALL_FIELD_PATHS, findFieldDef } from "@/features/analyze/services/engines/factorFields";
import { generateAiSummary } from "@/features/analyze/services/aiSummary";
import { computeScenarios } from "@/features/analyze/services/scenarioComparator";
import { LandAnalysisInput } from "@/features/analyze/types/property";
import { auth } from "@/auth";
import { isPlanId, PLANS } from "@/lib/plans";
import { getPostHogServer } from "@/lib/posthogServer";
import { prisma } from "@/lib/prisma";
import { calculateLPS } from "@/utils/calculateLPS";
import { calculateROI, roiInputsFromAnalysis } from "@/utils/calculateROI";

/** Sets a dot-path (e.g. "location.populationGrowthRatePercent") on a shallow clone of the object. */
function setByPath(input: LandAnalysisInput, path: string, value: unknown): LandAnalysisInput {
  const [section, key] = path.split(".");
  return {
    ...input,
    [section]: { ...(input as unknown as Record<string, object>)[section], [key]: value },
  };
}

/** Validates a single update value against its field's declared type — rejects anything that
 * doesn't match rather than silently coercing, since this data feeds directly into the score. */
function coerceValue(path: string, raw: unknown): { ok: true; value: unknown } | { ok: false } {
  const field = findFieldDef(path);
  if (!field) return { ok: false };

  if (field.type === "number") {
    const num = typeof raw === "number" ? raw : Number(raw);
    return Number.isFinite(num) ? { ok: true, value: num } : { ok: false };
  }
  if (field.type === "boolean") {
    return typeof raw === "boolean" ? { ok: true, value: raw } : { ok: false };
  }
  // enum
  const isValidOption = field.options?.some((o) => o.value === raw);
  return isValidOption ? { ok: true, value: raw } : { ok: false };
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const updates = body?.updates;
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return NextResponse.json({ error: "updates (object) is required." }, { status: 400 });
  }

  const analysis = await prisma.landAnalysis.findUnique({ where: { id }, include: { property: true } });
  if (!analysis || analysis.property.userId !== session.user.id) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  let input = analysis.inputs as unknown as LandAnalysisInput;
  const appliedPaths: string[] = [];

  for (const [path, rawValue] of Object.entries(updates)) {
    if (!ALL_FIELD_PATHS.has(path)) {
      return NextResponse.json({ error: `Unknown field: ${path}` }, { status: 400 });
    }
    const coerced = coerceValue(path, rawValue);
    if (!coerced.ok) {
      return NextResponse.json({ error: `Invalid value for ${path}.` }, { status: 400 });
    }
    input = setByPath(input, path, coerced.value);
    appliedPaths.push(path);
  }

  if (appliedPaths.length === 0) {
    return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
  }

  const parsed = analysisSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: "Updated data is invalid.", issues: parsed.error.flatten() }, { status: 400 });
  }
  input = parsed.data;

  const dbUser = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } });
  const plan = PLANS[isPlanId(dbUser?.plan ?? "") ? (dbUser!.plan as keyof typeof PLANS) : "free"];

  const result = calculateLPS(input);
  // A field manually filled in here is real data, not AI-researched — drop it from that badge
  // list even if it happened to also be one of the AI-researchable fields.
  const existingResearchedFields = (analysis.aiResearchedFields as string[]) ?? [];
  const remainingResearchedFields = existingResearchedFields.filter((f) => !appliedPaths.includes(f));
  if (remainingResearchedFields.length > 0 && result.confidenceLevel === "High") {
    result.confidenceLevel = "Medium";
  }

  const estimatedRoi = calculateROI(roiInputsFromAnalysis(input));
  const asJson = <T>(value: T) => JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;

  const scenarios =
    analysis.intent === "investment" && plan.hasScenarioComparison ? computeScenarios(input) : null;

  const aiSummary = await generateAiSummary(
    result,
    {
      address: input.property.address,
      county: input.property.county || "Unknown",
      state: input.property.state,
      askingPrice: input.property.askingPrice,
    },
    analysis.intent as "investment" | "residence",
    scenarios
  );

  await prisma.landAnalysis.update({
    where: { id },
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
      aiResearchedFields: asJson(remainingResearchedFields),
      scenarios: scenarios ? asJson(scenarios) : undefined,
    },
  });

  await getPostHogServer()?.captureImmediate({
    distinctId: session.user.id,
    event: "analysis_recalculated",
    properties: { fieldsUpdated: appliedPaths.length, lpsScore: result.score },
  });

  return NextResponse.json({ id });
}
