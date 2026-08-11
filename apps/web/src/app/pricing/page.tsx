import Link from "next/link";
import type { Metadata } from "next";
import BillingButton from "@/features/settings/components/BillingButton";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import PricingCards from "@/features/marketing/components/PricingCards";
import { auth } from "@/auth";
import { isPlanId, PLANS, PlanId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Pricing" };
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const session = await auth();
  let currentPlan: PlanId | null = null;

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true } });
    currentPlan = isPlanId(user?.plan ?? "") ? (user!.plan as PlanId) : "free";
  }

  function ctaFor(planId: PlanId) {
    if (currentPlan === planId) {
      return <p className="text-sm font-medium text-lp-forest-light">Your current plan ✓</p>;
    }
    if (!session?.user) {
      return (
        <Link
          href="/register"
          className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-3 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
        >
          Get started
        </Link>
      );
    }
    if (planId === "free") {
      return <p className="text-sm text-stone-500">Manage from your billing portal</p>;
    }
    return <BillingButton mode="checkout" plan={planId} label={`Upgrade to ${PLANS[planId].label}`} />;
  }

  return (
    <div className="bg-lp-cream">
      <MarketingNav />
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">Simple pricing</h1>
          <p className="mt-3 text-stone-600">Start free. Upgrade as your portfolio grows.</p>
        </div>

        <div className="mt-12">
          <PricingCards ctaFor={ctaFor} />
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
