import type { MetadataRoute } from "next";
import { GUIDES } from "@/features/marketing/data/guides";
import { SITE_URL } from "@/lib/siteUrl";

/**
 * Only public marketing routes belong here. Authenticated app routes (/dashboard,
 * /analyses/*) and auth routes (/login, /register, /reset-password) are deliberately
 * excluded — they're either gated or have no standalone search value.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/guides`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
