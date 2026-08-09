/**
 * Single source of truth for the 3 plans — pricing copy, monthly analysis caps, and which
 * Pro-only features are entitled. Referenced by the pricing UI, /settings, the analyses
 * gating logic, and the Stripe checkout/webhook routes (so "which plan did they buy" is
 * always derived from the actual Stripe Price ID, never trusted from the client).
 */

export type PlanId = "free" | "starter" | "pro";

export interface PlanConfig {
  id: PlanId;
  label: string;
  priceLabel: string;
  /** null = unlimited. */
  monthlyAnalysisLimit: number | null;
  features: string[];
  hasScenarioComparison: boolean;
  hasAiResearch: boolean;
  hasPortfolio: boolean;
  recommended?: boolean;
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: "free",
    label: "Free",
    priceLabel: "$0",
    monthlyAnalysisLimit: 3,
    features: ["3 analyses per month", "All 7 Intelligence Engines", "Real government data sources", "AI-generated summary"],
    hasScenarioComparison: false,
    hasAiResearch: false,
    hasPortfolio: false,
  },
  starter: {
    id: "starter",
    label: "Starter",
    priceLabel: "$9.99/mo",
    monthlyAnalysisLimit: 15,
    features: ["15 analyses per month", "Everything in Free", "More room to compare properties"],
    hasScenarioComparison: false,
    hasAiResearch: false,
    hasPortfolio: false,
  },
  pro: {
    id: "pro",
    label: "Pro",
    priceLabel: "$29.99/mo",
    monthlyAnalysisLimit: null,
    features: ["Unlimited analyses", "Everything in Starter", "Strategy comparison (build/sell/rent)", "AI market research", "Portfolio tracking"],
    hasScenarioComparison: true,
    hasAiResearch: true,
    hasPortfolio: true,
    recommended: true,
  },
};

export const PAID_PLAN_IDS: Exclude<PlanId, "free">[] = ["starter", "pro"];

export function isPlanId(value: string): value is PlanId {
  return value === "free" || value === "starter" || value === "pro";
}

/** Env var holding the Stripe Price ID for a paid plan — e.g. STRIPE_PRICE_ID_STARTER. */
export function getPriceIdForPlan(plan: Exclude<PlanId, "free">): string | undefined {
  return plan === "starter" ? process.env.STRIPE_PRICE_ID_STARTER : process.env.STRIPE_PRICE_ID_PRO;
}

/** Reverse lookup — which plan a given Stripe Price ID corresponds to, used by the webhook
 * so the plan we store is always derived from what was actually purchased, not a client claim. */
export function getPlanForPriceId(priceId: string): Exclude<PlanId, "free"> | null {
  if (priceId === process.env.STRIPE_PRICE_ID_STARTER) return "starter";
  if (priceId === process.env.STRIPE_PRICE_ID_PRO) return "pro";
  return null;
}
