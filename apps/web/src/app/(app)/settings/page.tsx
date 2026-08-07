import { CheckCircle2, XCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionCard from "@/components/ui/SectionCard";
import BillingButton from "@/features/settings/components/BillingButton";
import ProfileForm from "@/features/settings/components/ProfileForm";
import PasswordForm from "@/features/settings/components/PasswordForm";
import DeleteAccountButton from "@/features/settings/components/DeleteAccountButton";
import { auth } from "@/auth";
import { isPlanId, PLANS, PlanId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { applySubscriptionToUser } from "@/lib/stripeSync";

interface SettingsPageProps {
  searchParams: Promise<{ checkout?: string; session_id?: string }>;
}

export const dynamic = "force-dynamic";

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const { checkout, session_id: checkoutSessionId } = await searchParams;
  const session = await auth();
  const userId = session!.user!.id!;

  // The Stripe webhook is the authoritative plan sync, but it can land a few seconds after the
  // browser is redirected back here — without this, a user who just paid would land on
  // /settings and briefly see their old (pre-upgrade) plan. Best-effort, synchronous fallback.
  if (checkout === "success" && checkoutSessionId) {
    const stripe = getStripe();
    if (stripe) {
      try {
        const checkoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId, {
          expand: ["subscription"],
        });
        if (
          checkoutSession.client_reference_id === userId &&
          checkoutSession.subscription &&
          typeof checkoutSession.subscription !== "string"
        ) {
          await applySubscriptionToUser(userId, checkoutSession.subscription);
        }
      } catch {
        // Non-fatal — the webhook will still correct the plan shortly.
      }
    }
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { name: true, email: true, plan: true, stripeCurrentPeriodEnd: true, passwordHash: true },
  });

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const analysesThisMonth = await prisma.landAnalysis.count({
    where: { property: { userId }, createdAt: { gte: startOfMonth } },
  });

  const planId: PlanId = isPlanId(user.plan) ? user.plan : "free";
  const plan = PLANS[planId];
  const isPro = planId === "pro";
  const nextPlan = planId === "free" ? "starter" : planId === "starter" ? "pro" : null;

  return (
    <div className="max-w-2xl space-y-6">
      {checkout === "success" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 size={18} /> Payment successful — your plan has been upgraded!
        </div>
      )}
      {checkout === "cancelled" && (
        <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
          <XCircle size={18} /> Checkout cancelled — no charge was made.
        </div>
      )}

      <SectionCard title="Plan & Billing" description="Manage your LandPilot subscription.">
        <div className="flex items-center justify-between rounded-xl border border-lp-border bg-stone-50 p-4">
          <div>
            <p className="text-sm font-medium text-lp-ink">Current plan</p>
            <p className="mt-1 text-xs text-stone-500">
              {plan.monthlyAnalysisLimit === null
                ? `${plan.label} — unlimited analyses${user.stripeCurrentPeriodEnd ? `, renews ${user.stripeCurrentPeriodEnd.toLocaleDateString()}` : ""}.`
                : `${plan.label} — ${analysesThisMonth}/${plan.monthlyAnalysisLimit} analyses used this month.`}
            </p>
          </div>
          <Badge variant={isPro ? "success" : "neutral"}>{plan.label}</Badge>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {nextPlan && (
            <BillingButton mode="checkout" plan={nextPlan} label={`Upgrade to ${PLANS[nextPlan].label}`} />
          )}
          {(planId !== "free" || user.stripeCurrentPeriodEnd) && <BillingButton mode="portal" />}
        </div>
      </SectionCard>

      <SectionCard title="Profile" description={user.email ?? undefined}>
        <ProfileForm initialName={user.name ?? ""} />
      </SectionCard>

      {user.passwordHash && (
        <SectionCard title="Password" description="Change your account password.">
          <PasswordForm />
        </SectionCard>
      )}

      <SectionCard title="Danger zone" description="Permanently delete your account and all your data.">
        <DeleteAccountButton />
      </SectionCard>
    </div>
  );
}
