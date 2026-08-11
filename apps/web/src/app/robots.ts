import type { MetadataRoute } from "next";
import { IS_PRODUCTION_HOST, SITE_URL } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  // Preview deploys share the same code but must never compete with production in the index.
  if (!IS_PRODUCTION_HOST) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Gated or single-use routes — no search value, and crawling them wastes budget.
        disallow: ["/api/", "/dashboard", "/analyses/", "/portfolio", "/properties", "/settings", "/intelligence", "/reset-password", "/forgot-password"],
      },
    ],
    // No `host` directive on purpose — it's a Yandex extension that Google reports as an
    // unrecognised line, and the canonical domain is already declared via metadata.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
