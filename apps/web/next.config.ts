import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Source map uploads are skipped entirely (silent, no error) when SENTRY_AUTH_TOKEN
  // isn't set — same graceful-degradation pattern as the other optional integrations.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
});
