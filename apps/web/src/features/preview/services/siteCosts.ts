import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";

/**
 * What this specific parcel will cost before any house exists.
 *
 * The house itself is the part buyers already research — dollars per square foot is a search
 * away. What blindsides them is site cost: the septic system this soil forces, the elevated
 * foundation this flood zone forces, the well, the power run. Those are driven by exactly the
 * data we already pulled, which is why we can name them per parcel instead of generically.
 *
 * Two honesty constraints shape everything here:
 *
 * 1. These are ballpark ranges from industry cost guides, not quotes. They sit in their own
 *    block, visually separate from the government findings, and every line names who gives the
 *    real number. The findings say "public records, not estimates" — this must not blur that.
 *
 * 2. The sourced figures are Florida-specific. Showing them for a parcel in Colorado would be
 *    inventing data, so outside Florida the same drivers are listed without dollar amounts.
 */

export type CostConfidence = "range" | "unpriced";

export interface CostLine {
  id: string;
  label: string;
  /** Why this parcel triggers this line — tied back to a finding wherever possible. */
  reason: string;
  /** Who can turn this into a real number. */
  whoQuotes: string;
  low?: number;
  high?: number;
  confidence: CostConfidence;
}

export interface SiteCostEstimate {
  lines: CostLine[];
  /** Sum of the priced lines only. Null when nothing could be priced. */
  totalLow: number | null;
  totalHigh: number | null;
  /** True when we have state-specific figures; drives whether amounts render at all. */
  priced: boolean;
}

const T = {
  en: {
    percTest: "Perc test",
    percReason: "Required before the county will issue a septic permit.",
    percWho: "County health department or a licensed soil scientist",

    septic: "Septic system",
    septicVeryLimited:
      "USDA rates this soil very limited for drain fields, so a conventional system likely won't pass. Engineered alternatives (aerobic treatment or mound) cost several times more.",
    septicSomewhat:
      "USDA rates this soil somewhat limited, so expect the design to compensate — often a larger or elevated drain field.",
    septicNotLimited: "USDA rates this soil favourable for a conventional drain field.",
    septicUnknown: "No soil rating available here, so this could be a conventional system or an engineered one.",
    septicWho: "Local septic contractor, after a perc test",

    well: "Water well",
    wellReason: "Assumed if the parcel isn't on municipal water — confirm with the county or utility first.",
    wellWho: "Two local well drillers",

    elevated: "Elevated foundation and flood insurance",
    elevatedReason:
      "The parcel is in a high-risk FEMA flood zone, so the structure will likely need to be built above base flood elevation, and insurance is required with a federally backed mortgage.",
    elevatedWho: "A local builder and an insurance agent",

    wetlands: "Wetland delineation and permitting",
    wetlandsReason:
      "Mapped wetlands touch this parcel. A delineation establishes the real boundary, and building near or on it needs federal permitting.",
    wetlandsWho: "Environmental consultant",

    power: "Running power to the parcel",
    powerReason:
      "Cost depends entirely on how far the nearest service is, which no public dataset gives us.",
    powerWho: "The electric utility, with the parcel number",

    driveway: "Driveway, clearing and site prep",
    drivewayReason: "Varies with distance from the road, tree cover and slope.",
    drivewayWho: "A local excavation contractor",
  },
  es: {
    percTest: "Perc test",
    percReason: "Requerido antes de que el condado emita el permiso de séptico.",
    percWho: "Departamento de salud del condado o un científico de suelos con licencia",

    septic: "Sistema séptico",
    septicVeryLimited:
      "El USDA califica este suelo como muy limitado para campos de drenaje, así que un sistema convencional probablemente no pase. Las alternativas de ingeniería (tratamiento aeróbico o montículo) cuestan varias veces más.",
    septicSomewhat:
      "El USDA califica este suelo como algo limitado, así que el diseño tendrá que compensarlo — normalmente un campo de drenaje más grande o elevado.",
    septicNotLimited: "El USDA califica este suelo como favorable para un campo de drenaje convencional.",
    septicUnknown: "No hay calificación de suelo aquí, así que podría ser un sistema convencional o uno de ingeniería.",
    septicWho: "Contratista de sépticos local, después del perc test",

    well: "Pozo de agua",
    wellReason: "Se asume si la parcela no tiene agua municipal — confírmalo antes con el condado o el proveedor.",
    wellWho: "Dos perforadores de pozos locales",

    elevated: "Cimentación elevada y seguro de inundación",
    elevatedReason:
      "La parcela está en zona FEMA de alto riesgo, así que lo más probable es que haya que construir por encima de la elevación base, y con hipoteca federal el seguro es obligatorio.",
    elevatedWho: "Un constructor local y un agente de seguros",

    wetlands: "Delineación de humedales y permisos",
    wetlandsReason:
      "Hay humedales mapeados tocando esta parcela. Una delineación establece el lindero real, y construir sobre o cerca requiere permiso federal.",
    wetlandsWho: "Consultor ambiental",

    power: "Llevar electricidad a la parcela",
    powerReason:
      "El costo depende por completo de qué tan lejos está el servicio más cercano, y eso no lo da ninguna base pública.",
    powerWho: "La compañía eléctrica, con el número de parcela",

    driveway: "Entrada, desmonte y preparación del sitio",
    drivewayReason: "Varía según la distancia a la vía, la vegetación y la pendiente.",
    drivewayWho: "Contratista de excavación local",
  },
} as const;

/**
 * Ranges are Florida figures from 2026 industry cost guides. Deliberately not extended to other
 * states: septic and well costs swing enormously with water table, bedrock and county rules,
 * and a Florida number shown for a Colorado parcel would be worse than no number.
 */
const FL_RANGES = {
  percTest: [150, 800],
  septicVeryLimited: [15000, 40000],
  septicSomewhat: [6000, 15000],
  septicConventional: [5000, 9000],
  septicUnknown: [5000, 35000],
  well: [3000, 15000],
} as const;

export function buildSiteCostEstimate(
  lookup: PropertyLookupResult,
  locale: Locale
): SiteCostEstimate {
  const t = T[locale];
  const priced = lookup.state === "FL";
  const lines: CostLine[] = [];

  const push = (line: Omit<CostLine, "confidence">, range?: readonly [number, number]) => {
    lines.push({
      ...line,
      low: priced && range ? range[0] : undefined,
      high: priced && range ? range[1] : undefined,
      confidence: priced && range ? "range" : "unpriced",
    });
  };

  push(
    { id: "perc", label: t.percTest, reason: t.percReason, whoQuotes: t.percWho },
    FL_RANGES.percTest
  );

  const rating = lookup.septicSoil?.rating;
  const septicReason =
    rating === "very limited"
      ? t.septicVeryLimited
      : rating === "somewhat limited"
        ? t.septicSomewhat
        : rating === "not limited"
          ? t.septicNotLimited
          : t.septicUnknown;
  const septicRange =
    rating === "very limited"
      ? FL_RANGES.septicVeryLimited
      : rating === "somewhat limited"
        ? FL_RANGES.septicSomewhat
        : rating === "not limited"
          ? FL_RANGES.septicConventional
          : FL_RANGES.septicUnknown;

  push({ id: "septic", label: t.septic, reason: septicReason, whoQuotes: t.septicWho }, septicRange);
  push({ id: "well", label: t.well, reason: t.wellReason, whoQuotes: t.wellWho }, FL_RANGES.well);

  if (lookup.femaFloodZone === "AE" || lookup.femaFloodZone === "VE") {
    // Elevated construction cost varies too much with design to quote responsibly, so it's
    // named as a driver without a number rather than guessed at.
    push({ id: "elevated", label: t.elevated, reason: t.elevatedReason, whoQuotes: t.elevatedWho });
  }

  if (lookup.wetlandsPresent === true) {
    push({ id: "wetlands", label: t.wetlands, reason: t.wetlandsReason, whoQuotes: t.wetlandsWho });
  }

  push({ id: "power", label: t.power, reason: t.powerReason, whoQuotes: t.powerWho });
  push({ id: "driveway", label: t.driveway, reason: t.drivewayReason, whoQuotes: t.drivewayWho });

  const pricedLines = lines.filter((l) => l.low !== undefined && l.high !== undefined);
  const totalLow = pricedLines.length ? pricedLines.reduce((s, l) => s + (l.low ?? 0), 0) : null;
  const totalHigh = pricedLines.length ? pricedLines.reduce((s, l) => s + (l.high ?? 0), 0) : null;

  return { lines, totalLow, totalHigh, priced: pricedLines.length > 0 };
}
