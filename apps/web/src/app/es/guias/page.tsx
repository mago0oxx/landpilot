import Link from "next/link";
import type { Metadata } from "next";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import { GUIDES_ES } from "@/features/marketing/data/guides.es";

export const metadata: Metadata = {
  title: "Guías para comprar terreno en Estados Unidos",
  description:
    "Respuestas directas a lo que de verdad sale mal al comprar un terreno en EE.UU. — construibilidad, perc test, acceso legal, servicios y zonas de inundación.",
  alternates: { canonical: "/es/guias", languages: { en: "/guides", "es-US": "/es/guias" } },
};

export default function GuiasIndexPage() {
  return (
    <div className="bg-lp-cream">
      <MarketingNav locale="es" altHref="/guides" />
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">
          Guías para comprar terreno en EE.UU.
        </h1>
        <p className="mt-3 text-lg text-stone-600">
          Escritas para alguien que compra terreno en Estados Unidos por primera vez. Sin rodeos y
          sin vender nada.
        </p>

        <div className="mt-10 space-y-4">
          {GUIDES_ES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/es/guias/${guide.slug}`}
              className="block rounded-2xl border border-lp-border bg-white p-6 transition hover:border-lp-forest/40"
            >
              <h2 className="text-lg font-semibold text-lp-ink">{guide.title}</h2>
              <p className="mt-1.5 text-sm text-stone-600">{guide.dek}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 rounded-2xl border border-lp-border bg-white/60 p-5 text-sm text-stone-600">
          Tenemos más guías en inglés — perc test, servidumbres, humedales, financiamiento, título
          y costos de pozo y séptico. Las vamos pasando al español.{" "}
          <Link href="/guides" className="font-medium text-lp-forest-light hover:underline">
            Verlas en inglés →
          </Link>
        </p>
      </div>
      <MarketingFooter locale="es" />
    </div>
  );
}
