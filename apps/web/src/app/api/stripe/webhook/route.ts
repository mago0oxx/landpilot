import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { applySubscriptionToUser, customerIdOf, periodEndFromSubscription, planFromSubscription } from "@/lib/stripeSync";

/** Verified, unauthenticated — Stripe calls this directly. Signature check is the auth. */
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();
  if (!signature || !webhookSecret || !stripe) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const customerId = session.customer ? customerIdOf(session.customer) : null;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

      if (userId && customerId && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        await applySubscriptionToUser(userId, subscription);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const isActive = subscription.status === "active" || subscription.status === "trialing";
      const plan = isActive ? planFromSubscription(subscription) : "free";
      if (plan) {
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerIdOf(subscription.customer) },
          data: {
            plan,
            stripeCurrentPeriodEnd: periodEndFromSubscription(subscription),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerIdOf(subscription.customer) },
        data: { plan: "free", stripeSubscriptionId: null, stripeCurrentPeriodEnd: null },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
