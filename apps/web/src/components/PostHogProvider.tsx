"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useSession } from "next-auth/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== "undefined" && apiKey) {
  posthog.init(apiKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    // App Router has no router-change events to hook into — pageviews are
    // captured manually by PostHogPageView below instead.
    capture_pageview: false,
    capture_pageleave: true,
  });
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!apiKey || !pathname) return;
    const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

/** Ties the anonymous PostHog visitor to our DB user id once a session exists, so
 * pre-signup and post-signup events merge into one person's timeline. */
function IdentifyUser() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!apiKey || !session?.user?.id) return;
    posthog.identify(session.user.id, { email: session.user.email ?? undefined });
  }, [session?.user?.id, session?.user?.email]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!apiKey) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <IdentifyUser />
      {children}
    </PHProvider>
  );
}
