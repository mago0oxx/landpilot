import Link from "next/link";
import type { Metadata } from "next";
import BillingButton from "@/features/settings/components/BillingButton";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import PricingCards from "@/features/marketing/components/PricingCards";
import { auth } from "@/auth";
import { getMarketingDictionary } from "@/i18n/marketing";
import { isPlanId, PlanId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "La verificación de dirección siempre es gratis. Los planes son para el análisis completo de un terreno en Estados Unidos.",
  alternates: { canonical: "/es/precios", languages: { en: "/pricing", "es-US": "/es/precios" } },
};
export const dynamic = "force-dynamic";

export default async function PreciosPage() {
  const t = getMarketingDictionary("es").pricing;
  const session = await auth();
  let currentPlan: PlanId | null = null;

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } });
    currentPlan = isPlanId(user?.plan ?? "") ? (user!.plan as PlanId) : "free";
  }

  function ctaFor(planId: PlanId) {
    if (currentPlan === planId) {
      return <p className="text-sm font-medium text-lp-forest-light">Tu plan actual ✓</p>;
    }
    if (!session?.user) {
      return (
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-3 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
        >
          {t.cta}
        </Link>
      );
    }
    if (planId === "free") {
      return <p className="text-sm text-stone-500">Se administra desde tu portal de facturación</p>;
    }
    // The checkout itself is Stripe-hosted and follows the browser's language, not ours.
    return <BillingButton mode="checkout" plan={planId} label={`Pasar a ${t.plans[planId].label}`} />;
  }

  return (
    <div className="bg-lp-cream">
      <MarketingNav locale="es" altHref="/pricing" />
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-stone-600">{t.subtitle}</p>
        </div>

        <div className="mt-12">
          <PricingCards locale="es" ctaFor={ctaFor} />
        </div>
      </div>
      <MarketingFooter locale="es" />
    </div>
  );
}
