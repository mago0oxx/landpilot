import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import Hero from "@/features/marketing/components/Hero";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import EnginesGrid from "@/features/marketing/components/EnginesGrid";
import PricingSection from "@/features/marketing/components/PricingSection";
import CTAFooter from "@/features/marketing/components/CTAFooter";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";

export const metadata: Metadata = {
  // `absolute` skips the root layout's "%s — LandPilot" template, which would otherwise
  // append a second "— LandPilot" to a title that already names the product.
  title: { absolute: "LandPilot — Revisa un terreno en EE.UU. antes de comprarlo" },
  description:
    "Pega la dirección de un lote en Estados Unidos y consulta gratis su zona de inundación FEMA, humedales y datos del condado. Sin cuenta.",
  alternates: {
    canonical: "/es",
    languages: { en: "/", "es-US": "/es" },
  },
  openGraph: {
    title: "LandPilot — Revisa un terreno en EE.UU. antes de comprarlo",
    description:
      "Pega la dirección de un lote en Estados Unidos y consulta gratis su zona de inundación FEMA, humedales y datos del condado.",
    url: "/es",
    locale: "es_US",
  },
};

export default async function SpanishHomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="bg-lp-cream">
      <MarketingNav locale="es" altHref="/" />
      <Hero locale="es" />
      <HowItWorks locale="es" />
      <EnginesGrid locale="es" />
      <PricingSection locale="es" />
      <CTAFooter locale="es" />
      <MarketingFooter locale="es" />
    </div>
  );
}
