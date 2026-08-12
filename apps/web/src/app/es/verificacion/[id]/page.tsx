import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckResult from "@/features/preview/components/CheckResult";
import { getPreview } from "@/features/preview/services/previewStore";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const preview = await getPreview(id);

  return {
    title: preview ? `Verificación — ${preview.address}` : "Verificación de terreno",
    description: preview
      ? `Zona de inundación, humedales y datos del condado para ${preview.address}, sacados de registros públicos de FEMA, USFWS y el Census.`
      : undefined,
    // Same reasoning as the English route: these are per-address pages meant to be shared,
    // not a crawlable content surface.
    robots: { index: false, follow: true },
  };
}

export default async function VerificacionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const preview = await getPreview(id);
  if (!preview) notFound();

  return <CheckResult preview={preview} locale="es" altHref={`/check/${preview.id}`} />;
}
