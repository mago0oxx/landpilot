/**
 * Canonical public origin for the marketing site — used by the sitemap, robots, and the
 * `metadataBase` that resolves every relative Open Graph / canonical URL.
 *
 * Vercel sets NEXT_PUBLIC_VERCEL_URL on preview deploys, so previews advertise themselves
 * rather than pointing crawlers and social scrapers at production.
 */
export const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://uselandpilot.com";
})();

/** True only on the real production domain — previews must never be indexed. */
export const IS_PRODUCTION_HOST = SITE_URL === "https://uselandpilot.com";
