/** The domain the site is actually served on. Previews and localhost are never this. */
const CANONICAL_URL = "https://uselandpilot.com";

/**
 * Canonical public origin — used by the sitemap, robots, and the `metadataBase` that
 * resolves every relative Open Graph / canonical URL.
 *
 * The production check deliberately does NOT compare hostnames. On Vercel, VERCEL_URL is
 * always the generated *.vercel.app hostname even on production deploys serving a custom
 * domain, so matching against it reports "not production" in production — which made
 * robots.txt serve `Disallow: /` and blocked Googlebot entirely. VERCEL_ENV is the only
 * value that actually distinguishes a production deploy from a preview.
 */
function resolveSite(): { url: string; isProduction: boolean } {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return { url: explicit, isProduction: explicit === CANONICAL_URL };

  if (process.env.VERCEL_ENV === "production") return { url: CANONICAL_URL, isProduction: true };

  // Preview and branch deploys: advertise themselves, and stay out of the index.
  const vercelUrl = process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) return { url: `https://${vercelUrl}`, isProduction: false };

  // Local development.
  return { url: CANONICAL_URL, isProduction: false };
}

const site = resolveSite();

export const SITE_URL = site.url;

/** True only on the real production deploy — previews must never be indexed. */
export const IS_PRODUCTION_HOST = site.isProduction;
