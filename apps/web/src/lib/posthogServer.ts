import { PostHog } from "posthog-node";

let client: PostHog | null = null;

/** Lazily constructed, same graceful-degradation pattern as getStripe()/getResend() — server-side
 * event capture (signup, analysis run, checkout started/completed) is a no-op until
 * NEXT_PUBLIC_POSTHOG_KEY is set. Node client batches + flushes on its own; no manual shutdown
 * needed for the short-lived serverless functions this app runs in. */
export function getPostHogServer(): PostHog | null {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) return null;

  if (!client) {
    client = new PostHog(apiKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return client;
}
