import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPriceIdForPlan, PAID_PLAN_IDS } from "@/lib/plans";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { applySubscriptionToUser } from "@/lib/stripeSync";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const plan = body?.plan;
  if (!PAID_PLAN_IDS.includes(plan)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const priceId = getPriceIdForPlan(plan);
  const stripe = getStripe();
  if (!priceId || !stripe) {
    return NextResponse.json({ error: "Billing is not configured yet." }, { status: 500 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const origin = request.nextUrl.origin;

  // Already has an active subscription (e.g. Starter -> Pro) — change its price in place rather
  // than starting a second Checkout Session, which would leave the customer with two concurrent
  // subscriptions (and two charges) instead of one upgraded one.
  if (user.stripeSubscriptionId) {
    const currentSubscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
    const currentItem = currentSubscription.items.data[0];
    if (!currentItem) {
      return NextResponse.json({ error: "Could not find your current subscription item." }, { status: 500 });
    }

    const updatedSubscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
      items: [{ id: currentItem.id, price: priceId }],
      proration_behavior: "create_prorations",
    });
    await applySubscriptionToUser(user.id, updatedSubscription);

    return NextResponse.json({ url: `${origin}/settings?checkout=success` });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: user.id,
    customer_email: user.stripeCustomerId ? undefined : user.email,
    customer: user.stripeCustomerId ?? undefined,
    success_url: `${origin}/settings?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/settings?checkout=cancelled`,
  });

  if (!checkoutSession.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }

  return NextResponse.json({ url: checkoutSession.url });
}
