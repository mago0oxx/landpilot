/**
 * County population and employment growth via the Census Bureau's ACS 5-year estimates —
 * requires a free API key (api.census.gov/data/key_signup.html, no cost, instant signup).
 * Set CENSUS_API_KEY to enable; these lookups are skipped (return null) until it's set, so
 * they degrade to the manual/default LI-01/LI-02 flow with no code changes needed later.
 */

const TOTAL_POPULATION_VARIABLE = "B01003_001E";
const EMPLOYED_LABOR_FORCE_VARIABLE = "B23025_004E";
const RECENT_VINTAGE = 2022;
const BASELINE_VINTAGE = 2018;

async function fetchAcsVariable(
  variable: string,
  vintage: number,
  stateFips: string,
  countyFips: string,
  apiKey: string
): Promise<number | null> {
  const url = new URL(`https://api.census.gov/data/${vintage}/acs/acs5`);
  url.searchParams.set("get", `NAME,${variable}`);
  url.searchParams.set("for", `county:${countyFips}`);
  url.searchParams.set("in", `state:${stateFips}`);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) return null;

  const rows = (await response.json()) as string[][];
  const value = rows?.[1]?.[1];
  return value ? Number(value) : null;
}

async function lookupAnnualizedGrowthPercent(
  variable: string,
  stateFips: string,
  countyFips: string
): Promise<number | null> {
  const apiKey = process.env.CENSUS_API_KEY;
  if (!apiKey) return null;

  try {
    const [recent, baseline] = await Promise.all([
      fetchAcsVariable(variable, RECENT_VINTAGE, stateFips, countyFips, apiKey),
      fetchAcsVariable(variable, BASELINE_VINTAGE, stateFips, countyFips, apiKey),
    ]);
    if (!recent || !baseline) return null;

    const totalGrowthPercent = ((recent - baseline) / baseline) * 100;
    const years = RECENT_VINTAGE - BASELINE_VINTAGE;
    return Math.round((totalGrowthPercent / years) * 100) / 100;
  } catch {
    return null;
  }
}

/** Returns an approximate annualized population growth rate (%) for LI-01, or null if unavailable. */
export function lookupPopulationGrowthPercent(stateFips: string, countyFips: string): Promise<number | null> {
  return lookupAnnualizedGrowthPercent(TOTAL_POPULATION_VARIABLE, stateFips, countyFips);
}

/** Returns an approximate annualized employed-labor-force growth rate (%) for LI-02, or null. */
export function lookupEmploymentGrowthPercent(stateFips: string, countyFips: string): Promise<number | null> {
  return lookupAnnualizedGrowthPercent(EMPLOYED_LABOR_FORCE_VARIABLE, stateFips, countyFips);
}
