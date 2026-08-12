import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckResult from "@/features/preview/components/CheckResult";
import { getPreview } from "@/features/preview/services/previewStore";

export const dynamic = "force-dynamic";

/**
 * Titled with the actual address so a shared link reads as the lot it's about, rather than the
 * generic site title. Still noindex: these are generated from whatever address a visitor types,
 * so at scale they'd be thin, near-duplicate pages. They exist to be *shared*, not crawled —
 * the guides are the indexable surface.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const preview = await getPreview(id);

  return {
    title: preview ? `Land check — ${preview.address}` : "Land check",
    description: preview
      ? `Flood zone, wetlands and county data for ${preview.address}, pulled from public FEMA, USFWS and Census records.`
      : undefined,
    robots: { index: false, follow: true },
  };
}

export default async function CheckResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const preview = await getPreview(id);
  if (!preview) notFound();

  return <CheckResult preview={preview} locale="en" altHref={`/es/verificacion/${preview.id}`} />;
}
