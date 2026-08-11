import AnalyzeForm from "@/features/analyze/components/AnalyzeForm";
import { getPreview } from "@/features/preview/services/previewStore";
import { auth } from "@/auth";
import { isPlanId, PlanId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AnalizePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const session = await auth();
  const userId = session!.user!.id!;

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { plan: true } });
  const plan: PlanId = isPlanId(user.plan) ? user.plan : "free";

  // Carried over from a free address check so the buyer doesn't retype the address they
  // already gave us. Only the address is passed — the form re-runs the same lookup on
  // mount, which keeps one source of truth for the auto-filled fields.
  const { preview: previewId } = await searchParams;
  const preview = previewId ? await getPreview(previewId) : null;

  return <AnalyzeForm plan={plan} initialAddress={preview?.address} />;
}
