import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/** Lazily constructed — Stripe's constructor throws immediately on an empty key, which would
 * otherwise break every route that imports this module (including at build time) whenever
 * STRIPE_SECRET_KEY isn't set. Returns null instead, same graceful-degradation pattern as the
 * other optional integrations (Kimi/Claude, Census, etc.) — callers check for null and return
 * a friendly "billing not configured" response. */
export function getStripe(): Stripe | null {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) return null;

  if (!stripeInstance) {
    stripeInstance = new Stripe(apiKey, { apiVersion: "2026-07-29.dahlia" });
  }
  return stripeInstance;
}
