import Link from "next/link";
import { ReactNode } from "react";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import AddressCheckForm from "@/features/preview/components/AddressCheckForm";
import { SITE_URL } from "@/lib/siteUrl";

interface GuideLayoutEsProps {
  slug: string;
  title: string;
  dek: string;
  children: ReactNode;
}

export default function GuideLayoutEs({ slug, title, dek, children }: GuideLayoutEsProps) {
  const url = `${SITE_URL}/es/guias/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: dek,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    publisher: { "@type": "Organization", name: "LandPilot", url: SITE_URL },
    inLanguage: "es-US",
  };

  return (
    <div className="bg-lp-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <MarketingNav locale="es" altHref="/guides" />
      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <Link href="/es/guias" className="text-sm font-medium text-lp-forest-light hover:underline">
          ← Todas las guías
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-stone-600">{dek}</p>

        <div className="prose-guide mt-8 space-y-6 text-sm leading-relaxed text-stone-600">{children}</div>

        <div className="mt-12 rounded-2xl border border-lp-gold/25 bg-lp-gold/5 p-6">
          <p className="font-semibold text-lp-ink">¿Ya tienes un lote en la mira?</p>
          <p className="mt-1 mb-4 text-sm text-stone-600">
            Pega la dirección y sacamos ahora mismo su zona de inundación, humedales y datos del
            condado. Sin cuenta.
          </p>
          <AddressCheckForm locale="es" variant="inline" buttonLabel="Verificar gratis" />
        </div>
      </article>
      <MarketingFooter locale="es" />
    </div>
  );
}
