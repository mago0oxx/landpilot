import { Locale } from "@/i18n/config";
import { PropertyLookupResult } from "@/lib/propertyLookup";

/**
 * How many homes this lot can physically carry — the wastewater question, not the legal one.
 *
 * Buyers ask "could I put a duplex here and rent both sides", and every tool answers with
 * zoning, which we can't read from an address. But zoning is only one of two gates. The other
 * is wastewater: on a parcel without sewer, every dwelling unit needs its own septic capacity
 * and its own drain field area, with separation from wells, property lines and each other.
 * A triplex on soil the USDA rates very limited usually fails on that alone, whatever the
 * zoning says.
 *
 * That second gate is one nobody checks and we happen to have the data for. So this module
 * answers the half we can answer honestly, and hands the buyer the exact question to ask the
 * county for the other half — rather than inventing a density number.
 */

export type DensityOutlook = "sewer-unknown-tight" | "constrained" | "workable" | "unknown";

export interface DensityAssessment {
  outlook: DensityOutlook;
  headline: string;
  body: string;
  /** The literal question to put to the county. Buyers freeze because they don't know what to ask. */
  askTheCounty: string;
  /** Rough acreage note when the county gave us a recorded lot size. */
  lotNote: string | null;
}

/** Square feet commonly needed per dwelling unit for a conventional system plus setbacks.
 * A planning heuristic for framing the question, never a code requirement — every county
 * sets its own, which is exactly why the output sends people to ask. */
const SQFT_PER_UNIT_CONVENTIONAL = 20000;
const SQFT_PER_UNIT_ENGINEERED = 40000;

export function assessDensity(lookup: PropertyLookupResult, locale: Locale): DensityAssessment {
  const rating = lookup.septicSoil?.rating ?? null;
  const lotSqft = lookup.lotSizeSqft;
  const acres = lotSqft ? lotSqft / 43560 : null;

  const es = locale === "es";

  const lotNote =
    acres === null
      ? null
      : es
        ? `El condado tiene registrado ${lotSqft!.toLocaleString("en-US")} sqft (${acres.toFixed(2)} acres).`
        : `The county has ${lotSqft!.toLocaleString("en-US")} sqft on record (${acres.toFixed(2)} acres).`;

  const askTheCounty = es
    ? "Llama a planeación del condado con el número de parcela y pregunta textual: ¿cuál es el área mínima de lote por unidad de vivienda en esta zonificación, y es permitida más de una vivienda por derecho? Después llama a salud del condado y pregunta si aprobarían más de un sistema séptico en esta parcela."
    : "Call county planning with the parcel number and ask, in these words: what's the minimum lot area per dwelling unit in this zoning district, and is more than one dwelling permitted by right? Then call county health and ask whether they'd approve more than one septic system on this parcel.";

  if (rating === null) {
    return {
      outlook: "unknown",
      headline: es ? "Cuántas viviendas caben aquí" : "How many homes this lot can carry",
      body: es
        ? "No tenemos calificación de suelo para esta ubicación, así que no podemos acotar el lado del séptico. La densidad la deciden dos cosas independientes: lo que permite la zonificación y cuántos sistemas de aguas residuales aguanta el terreno. Ninguna de las dos sale de una dirección."
        : "We have no soil rating for this location, so we can't narrow the wastewater side. Density is decided by two independent things: what the zoning allows, and how many wastewater systems the ground can carry. Neither comes from an address.",
      askTheCounty,
      lotNote,
    };
  }

  if (rating === "very limited") {
    const perUnit = SQFT_PER_UNIT_ENGINEERED;
    const roughUnits = lotSqft ? Math.floor(lotSqft / perUnit) : null;

    return {
      outlook: "constrained",
      headline: es
        ? "Más de una vivienda aquí es cuesta arriba"
        : "More than one home here is an uphill fight",
      body: es
        ? `El USDA califica este suelo como muy limitado para campos de drenaje. Cada vivienda necesita su propia capacidad de drenaje, así que si el lote no tiene alcantarillado, un dúplex o tríplex implicaría varios sistemas de ingeniería — caros, y muchos condados simplemente no los aprueban en cantidad. ${
            roughUnits !== null
              ? `Con sistemas de ingeniería y separaciones típicas, un lote de este tamaño da margen para alrededor de ${Math.max(roughUnits, 1)} vivienda${Math.max(roughUnits, 1) === 1 ? "" : "s"} — una referencia de planeación, no una regla del código.`
              : ""
          } Si hay alcantarillado municipal disponible, esta restricción desaparece y todo depende de la zonificación.`
        : `USDA rates this soil very limited for drain fields. Every dwelling needs its own drain-field capacity, so without sewer a duplex or triplex would mean several engineered systems — expensive, and many counties simply won't approve them in quantity. ${
            roughUnits !== null
              ? `With engineered systems and typical separations, a lot this size leaves room for roughly ${Math.max(roughUnits, 1)} home${Math.max(roughUnits, 1) === 1 ? "" : "s"} — a planning rule of thumb, not a code requirement.`
              : ""
          } If municipal sewer is available, this constraint disappears and it comes down to zoning.`,
      askTheCounty,
      lotNote,
    };
  }

  const perUnit = SQFT_PER_UNIT_CONVENTIONAL;
  const roughUnits = lotSqft ? Math.floor(lotSqft / perUnit) : null;
  const favourable = rating === "not limited";

  return {
    outlook: "workable",
    headline: es ? "El suelo no es el obstáculo aquí" : "The soil isn't the obstacle here",
    body: es
      ? `El USDA califica este suelo como ${favourable ? "sin limitaciones" : "algo limitado"} para campos de drenaje, así que el séptico no es lo que va a frenar una segunda vivienda. ${
          roughUnits !== null
            ? `Por área, un lote de este tamaño daría para alrededor de ${Math.max(roughUnits, 1)} vivienda${Math.max(roughUnits, 1) === 1 ? "" : "s"} con sistemas convencionales y separaciones típicas — referencia de planeación, no regla del código.`
            : ""
        } Lo que decide de verdad es la zonificación, y eso no se puede leer desde una dirección.`
      : `USDA rates this soil ${favourable ? "not limited" : "somewhat limited"} for drain fields, so septic isn't what would stop a second home here. ${
          roughUnits !== null
            ? `On area alone, a lot this size would support roughly ${Math.max(roughUnits, 1)} home${Math.max(roughUnits, 1) === 1 ? "" : "s"} with conventional systems and typical separations — a planning rule of thumb, not a code requirement.`
            : ""
        } What actually decides it is zoning, and that can't be read from an address.`,
    askTheCounty,
    lotNote,
  };
}
