import AnalyzeForm from "@/features/analyze/components/AnalyzeForm";
import { auth } from "@/auth";
import { isPlanId, PlanId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AnalizePage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { plan: true } });
  const plan: PlanId = isPlanId(user.plan) ? user.plan : "free";

  return <AnalyzeForm plan={plan} />;
}
