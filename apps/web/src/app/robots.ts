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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
