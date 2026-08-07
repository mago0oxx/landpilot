import Stripe from "stripe";
import { getPlanForPriceId } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export function periodEndFromSubscription(subscription: Stripe.Subscription): Date | null {
  // current_period_end moved from the subscription itself to its line item(s) in this API version.
  const seconds = subscription.items.data[0]?.current_period_end;
  return seconds ? new Date(seconds * 1000) : null;
}

/** Which of our plans a subscription's price maps to — the source of truth for "plan", never
 * trusted from client input, so an upgrade/downgrade always lands on the right plan. */
export function planFromSubscription(subscription: Stripe.Subscription): "starter" | "pro" | null {
  const priceId = subscription.items.data[0]?.price?.id;
  return priceId ? getPlanForPriceId(priceId) : null;
}

export function customerIdOf(customer: string | Stripe.Customer | Stripe.DeletedCustomer): string {
  return typeof customer === "string" ? customer : customer.id;
}

/** Idempotently applies a subscription's plan/billing fields to a user. Called from two places:
 * the webhook (async, authoritative) and the checkout success redirect (synchronous fallback,
 * so the plan is never stale right after paying — the webhook can land a few seconds late). */
export async function applySubscriptionToUser(userId: string, subscription: Stripe.Subscription) {
  const plan = planFromSubscription(subscription);
  if (!plan) return;
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan,
      stripeCustomerId: customerIdOf(subscription.customer),
      stripeSubscriptionId: subscription.id,
      stripeCurrentPeriodEnd: periodEndFromSubscription(subscription),
    },
  });
}
