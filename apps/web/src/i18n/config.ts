/**
 * English lives at the root (`/`, `/guides/...`) rather than `/en/...` on purpose — those URLs
 * are already submitted to Search Console, and moving them would throw away the indexing work.
 * Spanish is additive, under `/es`.
 */
export const LOCALES = ["en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Prefix to prepend to an app-relative path for a given locale. Empty for the default. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Builds a locale-aware href: localeHref("es", "/pricing") -> "/es/precios" is NOT this —
 * paths differ per locale by design, so callers pass the already-localised path. This only
 * handles the prefix. */
export function localeHref(locale: Locale, path: string): string {
  return `${localePrefix(locale)}${path}`;
}

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es-US",
};

/**
 * Spanish targets Spanish speakers *buying land in the United States* — the product only works
 * on US parcels (FEMA, Census, county GIS). Generic Spanish real-estate queries are dominated
 * by Spain, whose readers can't use any of this, so Spanish routes and copy stay explicitly
 * anchored to the US.
 */
export const SPANISH_AUDIENCE_NOTE =
  "es-US — Spanish speakers buying land in the United States, not Spain or Latin America.";
