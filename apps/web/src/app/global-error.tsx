"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  // Inline styles, not Tailwind classes — this replaces the root layout entirely when
  // *it* is what threw, so the app's compiled globals.css isn't guaranteed to be available.
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#ECEAE3",
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        }}
      >
        <div style={{ maxWidth: "420px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#1C1C1A", margin: "0 0 8px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "14px", color: "#78716c", margin: "0 0 24px" }}>
            We&apos;ve been notified and are looking into it. Try refreshing the page.
          </p>
          {/* Plain <a>, not next/link — the root layout just crashed, so a hard
              navigation is safer than trusting the client router is still intact. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 20px",
              borderRadius: "12px",
              backgroundColor: "#C9943A",
              color: "#1B2A22",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to LandPilot
          </a>
        </div>
      </body>
    </html>
  );
}
