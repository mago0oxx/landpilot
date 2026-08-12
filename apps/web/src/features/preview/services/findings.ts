import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";

/**
 * `alert`   — a real problem that changes what the lot is worth or whether you can build.
 * `caution` — worth knowing and budgeting for, not a dealbreaker on its own.
 * `clear`   — checked against real data and came back fine.
 * `unknown` — the data source had no answer for this parcel. Deliberately NOT rendered as
 *             "clear"; telling someone a lot is fine when we simply couldn't check is the
 *             one failure mode that could actually cost them money.
 */
export type FindingStatus = "alert" | "caution" | "clear" | "unknown";

export interface Finding {
  id: string;
  label: string;
  status: FindingStatus;
  detail: string;
  /** Guide slug that explains this finding in depth, when one exists. */
  guideSlug?: string;
}

/** A string in both locales. Kept inline next to the logic so a new status can't silently
 * ship in one language only. */
type Bilingual = Record<Locale, string>;

const pick = (value: Bilingual, locale: Locale) => value[locale];

export interface NotCheckedItem {
  label: string;
  detail: string;
  guideSlug?: string;
}

/** What a free address check genuinely cannot answer — stated plainly rather than implied. */
export function notCheckedItems(locale: Locale): NotCheckedItem[] {
  const items: { label: Bilingual; detail: Bilingual; guideSlug?: string }[] = [
    {
      label: { en: "Septic / perc test", es: "Séptico / perc test" },
      detail: {
        en: "Whether the soil will pass a percolation test can only be answered by an actual test on the lot. No public dataset has this.",
        es: "Si el suelo pasa una prueba de percolación solo se sabe haciendo la prueba en el lote. No hay base de datos pública que lo tenga.",
      },
      guideSlug: "perc-test",
    },
    {
      label: { en: "Legal road access", es: "Acceso legal a la vía" },
      detail: {
        en: "Recorded easements and rights-of-way live in county deed records, which aren't machine-readable. A title search is the reliable check.",
        es: "Las servidumbres y derechos de paso registrados viven en los deed records del condado, que no son legibles por máquina. La revisión confiable es una búsqueda de título.",
      },
      guideSlug: "landlocked-land",
    },
    {
      label: { en: "Zoning & permitted use", es: "Zonificación y uso permitido" },
      detail: {
        en: "Zoning codes vary by county and change often. Confirm the parcel's code and whether a home is a permitted use with the county planning office.",
        es: "Los códigos de zonificación cambian de condado a condado y se actualizan seguido. Confirma el código de la parcela y si una vivienda es uso permitido con la oficina de planeación del condado.",
      },
      guideSlug: "is-land-buildable",
    },
    {
      label: { en: "Utility hookup cost", es: "Costo de conectar servicios" },
      detail: {
        en: "Only the utility company can quote what it costs to run power and water to this specific parcel.",
        es: "Solo la compañía de servicios puede cotizar lo que cuesta llevar luz y agua hasta esta parcela en concreto.",
      },
      guideSlug: "utility-costs",
    },
    {
      label: { en: "Title, liens & deed restrictions", es: "Título, gravámenes y restricciones del deed" },
      detail: {
        en: "Surfaced by a title search during closing — not available from any public API.",
        es: "Aparecen en la búsqueda de título durante el cierre. Ninguna API pública los expone.",
      },
    },
  ];

  return items.map((item) => ({
    label: pick(item.label, locale),
    detail: pick(item.detail, locale),
    guideSlug: item.guideSlug,
  }));
}

function floodZoneFinding(zone: PropertyLookupResult["femaFloodZone"], locale: Locale): Finding {
  const base = {
    id: "flood-zone",
    label: pick({ en: "FEMA flood zone", es: "Zona de inundación FEMA" }, locale),
    guideSlug: "fema-flood-zone-ae",
  };

  switch (zone) {
    case "VE":
      return {
        ...base,
        status: "alert",
        detail: pick(
          {
            en: "Zone VE — high-risk coastal zone with wave action. Flood insurance is required with a federally backed mortgage, and construction has to meet elevation requirements that add real cost.",
            es: "Zona VE — zona costera de alto riesgo con oleaje. Con hipoteca respaldada por el gobierno federal el seguro de inundación es obligatorio, y la construcción tiene que cumplir requisitos de elevación que encarecen bastante la obra.",
          },
          locale
        ),
      };
    case "AE":
      return {
        ...base,
        status: "alert",
        detail: pick(
          {
            en: "Zone AE — high-risk flood area with a defined base flood elevation. Flood insurance is required with a federally backed mortgage, and you'll likely have to build elevated.",
            es: "Zona AE — área de alto riesgo de inundación con elevación base definida. Con hipoteca respaldada por el gobierno federal el seguro de inundación es obligatorio, y lo más probable es que tengas que construir elevado.",
          },
          locale
        ),
      };
    case "A":
    case "AO":
      return {
        ...base,
        status: "caution",
        detail: pick(
          {
            en: `Zone ${zone} — mapped as high-risk, but FEMA hasn't published a base flood elevation here. Expect an elevation certificate to be required before you can price insurance.`,
            es: `Zona ${zone} — mapeada como de alto riesgo, pero FEMA no ha publicado una elevación base aquí. Cuenta con que te pidan un certificado de elevación antes de poder cotizar el seguro.`,
          },
          locale
        ),
      };
    case "X":
      return {
        ...base,
        status: "clear",
        detail: pick(
          {
            en: "Zone X — outside the mapped 100-year floodplain. Flood insurance isn't federally required.",
            es: "Zona X — fuera de la llanura de inundación de 100 años mapeada. El gobierno federal no exige seguro de inundación.",
          },
          locale
        ),
      };
    case "OTHER":
      return {
        ...base,
        status: "caution",
        detail: pick(
          {
            en: "FEMA maps this parcel in a zone outside the common categories. Worth confirming with the county floodplain administrator.",
            es: "FEMA ubica esta parcela en una zona fuera de las categorías comunes. Vale la pena confirmarlo con el administrador de llanuras de inundación del condado.",
          },
          locale
        ),
      };
    default:
      return {
        ...base,
        status: "unknown",
        detail: pick(
          {
            en: "FEMA's flood layer returned no zone for this location — often means the address didn't resolve to a mapped parcel.",
            es: "La capa de inundación de FEMA no devolvió zona para esta ubicación. Suele significar que la dirección no coincidió con una parcela mapeada.",
          },
          locale
        ),
      };
  }
}

function wetlandsFinding(present: boolean | null, locale: Locale): Finding {
  const base = { id: "wetlands", label: pick({ en: "Wetlands", es: "Humedales" }, locale) };

  if (present === true) {
    return {
      ...base,
      status: "alert",
      detail: pick(
        {
          en: "The USFWS National Wetlands Inventory maps wetlands on or touching this parcel. Building on or filling wetlands needs a federal permit and can shrink your usable area well below the acreage on the deed.",
          es: "El Inventario Nacional de Humedales del USFWS marca humedales sobre esta parcela o tocándola. Construir sobre humedales o rellenarlos requiere permiso federal, y puede dejar el área utilizable muy por debajo de los acres que dice el deed.",
        },
        locale
      ),
    };
  }
  if (present === false) {
    return {
      ...base,
      status: "clear",
      detail: pick(
        {
          en: "No mapped wetlands on this parcel in the USFWS National Wetlands Inventory.",
          es: "El Inventario Nacional de Humedales del USFWS no marca humedales en esta parcela.",
        },
        locale
      ),
    };
  }
  return {
    ...base,
    status: "unknown",
    detail: pick(
      {
        en: "The wetlands inventory returned no data for this location.",
        es: "El inventario de humedales no devolvió datos para esta ubicación.",
      },
      locale
    ),
  };
}

/**
 * Never escalates past `caution`, even at "high". The National Risk Index is a *county-level*
 * rating, so it says nothing specific about this parcel — and in coastal states it reads high
 * almost everywhere. Rendering that as a red alert would put a warning banner on nearly every
 * Florida result, which trains people to ignore the banner that actually matters.
 */
function hazardFinding(exposure: PropertyLookupResult["naturalHazardExposure"], locale: Locale): Finding {
  const base = {
    id: "hazard",
    label: pick({ en: "County natural hazard rating", es: "Riesgo natural del condado" }, locale),
  };

  switch (exposure) {
    case "high":
      return {
        ...base,
        status: "caution",
        detail: pick(
          {
            en: "FEMA's National Risk Index rates this county high for natural hazard risk. That's a county-wide figure, not a reading on this parcel — but it does tend to show up in insurance pricing.",
            es: "El Índice Nacional de Riesgo de FEMA califica este condado como de riesgo natural alto. Es una cifra de todo el condado, no una lectura de esta parcela, pero suele reflejarse en el precio del seguro.",
          },
          locale
        ),
      };
    case "medium":
      return {
        ...base,
        status: "clear",
        detail: pick(
          {
            en: "FEMA's National Risk Index rates this county medium for natural hazard risk — around the national middle.",
            es: "El Índice Nacional de Riesgo de FEMA califica este condado como de riesgo medio, cerca del promedio nacional.",
          },
          locale
        ),
      };
    case "low":
      return {
        ...base,
        status: "clear",
        detail: pick(
          {
            en: "FEMA's National Risk Index rates this county low for natural hazard risk.",
            es: "El Índice Nacional de Riesgo de FEMA califica este condado como de riesgo natural bajo.",
          },
          locale
        ),
      };
    default:
      return {
        ...base,
        status: "unknown",
        detail: pick(
          {
            en: "No FEMA National Risk Index rating available for this county.",
            es: "No hay calificación del Índice Nacional de Riesgo de FEMA para este condado.",
          },
          locale
        ),
      };
  }
}

function growthFinding(population: number | null, employment: number | null, locale: Locale): Finding {
  const base = {
    id: "growth",
    label: pick({ en: "County population & jobs", es: "Población y empleo del condado" }, locale),
  };

  if (population === null && employment === null) {
    return {
      ...base,
      status: "unknown",
      detail: pick(
        {
          en: "Census ACS growth data isn't available for this county.",
          es: "No hay datos de crecimiento del Census ACS para este condado.",
        },
        locale
      ),
    };
  }

  const parts: string[] = [];
  const popLabel = locale === "es" ? "población" : "population";
  const empLabel = locale === "es" ? "empleo" : "employment";
  if (population !== null) parts.push(`${popLabel} ${population >= 0 ? "+" : ""}${population.toFixed(1)}%`);
  if (employment !== null) parts.push(`${empLabel} ${employment >= 0 ? "+" : ""}${employment.toFixed(1)}%`);
  const summary = `Census ACS: ${parts.join(", ")}.`;

  // Land in a shrinking county is the classic trap — cheap to buy, very hard to resell.
  if ((population ?? 0) < 0) {
    return {
      ...base,
      status: "caution",
      detail: `${summary} ${pick(
        {
          en: "A shrinking county usually means thin resale demand, which matters more for land than for houses.",
          es: "Un condado que se encoge suele significar poca demanda de reventa, y eso pesa más en terrenos que en casas.",
        },
        locale
      )}`,
    };
  }

  return {
    ...base,
    status: "clear",
    detail: `${summary} ${pick(
      { en: "Demand in the area is holding up or growing.", es: "La demanda en la zona se sostiene o va creciendo." },
      locale
    )}`,
  };
}

function amenitiesFinding(count: number | null, locale: Locale): Finding {
  const base = { id: "amenities", label: pick({ en: "Nearby services", es: "Servicios cercanos" }, locale) };

  if (count === null) {
    return {
      ...base,
      status: "unknown",
      detail: pick(
        { en: "Couldn't check what's around this parcel.", es: "No pudimos revisar qué hay alrededor de esta parcela." },
        locale
      ),
    };
  }
  if (count === 0) {
    return {
      ...base,
      status: "caution",
      detail: pick(
        {
          en: "No shops, schools, or services mapped within the search radius. That can be exactly what you want in rural land — just know it going in.",
          es: "No hay comercios, escuelas ni servicios mapeados dentro del radio de búsqueda. En terreno rural eso puede ser justo lo que buscas, solo que lo sepas de antemano.",
        },
        locale
      ),
    };
  }
  return {
    ...base,
    status: "clear",
    detail: pick(
      {
        en: `${count} mapped services (shops, schools, healthcare) within the surrounding area.`,
        es: `${count} servicios mapeados (comercios, escuelas, salud) en los alrededores.`,
      },
      locale
    ),
  };
}

/**
 * Turns a raw lookup into buyer-facing findings. Every finding here is backed by a real
 * government or GIS source — no scoring, no assumptions. The full 1000-point LPS Score
 * needs the buyer's own numbers (asking price, lot size, intent) and lives behind signup.
 */
export function buildFindings(lookup: PropertyLookupResult, locale: Locale = "en"): Finding[] {
  return [
    floodZoneFinding(lookup.femaFloodZone, locale),
    wetlandsFinding(lookup.wetlandsPresent, locale),
    hazardFinding(lookup.naturalHazardExposure, locale),
    growthFinding(lookup.populationGrowthRatePercent, lookup.employmentGrowthRatePercent, locale),
    amenitiesFinding(lookup.nearbyAmenitiesCount, locale),
  ];
}

export function countByStatus(findings: Finding[], status: FindingStatus): number {
  return findings.filter((f) => f.status === status).length;
}

/** One-line verdict for the top of the result page — deliberately not a score. */
export function headlineFor(findings: Finding[], locale: Locale = "en"): { title: string; tone: FindingStatus } {
  const alerts = countByStatus(findings, "alert");
  const cautions = countByStatus(findings, "caution");

  if (alerts > 0) {
    return {
      title:
        locale === "es"
          ? `${alerts} ${alerts === 1 ? "cosa" : "cosas"} que tienes que mirar antes de hacer una oferta`
          : `${alerts} thing${alerts === 1 ? "" : "s"} here you need to look at before you make an offer`,
      tone: "alert",
    };
  }
  if (cautions > 0) {
    return {
      title:
        locale === "es"
          ? `${cautions} ${cautions === 1 ? "cosa" : "cosas"} que conviene presupuestar en este lote`
          : `${cautions} thing${cautions === 1 ? "" : "s"} worth budgeting for on this lot`,
      tone: "caution",
    };
  }
  return {
    title:
      locale === "es"
        ? "Nada alarmante en los registros públicos de esta parcela"
        : "Nothing alarming in the public records for this parcel",
    tone: "clear",
  };
}
