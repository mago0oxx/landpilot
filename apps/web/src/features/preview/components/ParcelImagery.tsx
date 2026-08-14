import { Locale } from "@/i18n/config";

/**
 * Aerial photo of the location with FEMA's flood layer drawn over it. Both are public,
 * keyless government map services rendered straight into <img> tags — no proxy, no storage,
 * no API key, and no bill that grows with traffic.
 *
 * This earns its place because "Zone AE" is jargon a first-time buyer doesn't feel. Seeing the
 * flood polygon sitting on top of the actual ground, labelled by FEMA with its base flood
 * elevation, communicates the risk in a way the sentence never will.
 */

const USGS_IMAGERY =
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export";
const FEMA_NFHL = "https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/export";

/** Layer 28 of the NFHL service is the flood hazard zone polygons with their labels. */
const NFHL_FLOOD_ZONE_LAYER = 28;

const SIZE_PX = 640;

const COPY: Record<Locale, { heading: string; caption: string; sources: string }> = {
  en: {
    heading: "The parcel from above",
    caption:
      "The marker is where the address geocodes to — not a surveyed boundary, so don't measure your lot from this. Blue shading is FEMA's mapped flood zone. Aerial imagery can be a few years old, and resolution varies by region.",
    sources: "Aerial: USGS · Flood zones: FEMA National Flood Hazard Layer",
  },
  es: {
    heading: "La parcela desde arriba",
    caption:
      "El marcador es donde cae la dirección geocodificada, no un lindero levantado — así que no midas tu lote con esta imagen. El sombreado azul es la zona de inundación mapeada por FEMA. La foto aérea puede tener algunos años y la resolución cambia según la región.",
    sources: "Aérea: USGS · Zonas de inundación: FEMA National Flood Hazard Layer",
  },
};

/**
 * How much ground to show. A quarter-acre town lot and a 40-acre rural tract need very
 * different framing, so the radius follows the recorded lot size where the county gave us one,
 * and otherwise defaults wide enough to show the surroundings that matter on rural land.
 */
function radiusMetersFor(lotSizeSqft: number | null): number {
  if (!lotSizeSqft || lotSizeSqft <= 0) return 220;

  // Half-width of a square of this area, then padded so the parcel doesn't fill the frame.
  const sideMeters = Math.sqrt(lotSizeSqft * 0.092903);
  return Math.min(1200, Math.max(120, Math.round(sideMeters * 1.8)));
}

function bboxAround(lng: number, lat: number, meters: number): string {
  const dLat = meters / 111320;
  const dLng = meters / (111320 * Math.cos((lat * Math.PI) / 180));
  return [lng - dLng, lat - dLat, lng + dLng, lat + dLat].join(",");
}

function exportUrl(base: string, bbox: string, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams({
    bbox,
    bboxSR: "4326",
    size: `${SIZE_PX},${SIZE_PX}`,
    format: "png32",
    f: "image",
    ...extra,
  });
  return `${base}?${params.toString()}`;
}

interface ParcelImageryProps {
  latitude: number | null;
  longitude: number | null;
  lotSizeSqft: number | null;
  locale: Locale;
}

export default function ParcelImagery({ latitude, longitude, lotSizeSqft, locale }: ParcelImageryProps) {
  // Without coordinates there's nothing to centre on, and a broken frame is worse than none.
  if (latitude === null || longitude === null) return null;

  const t = COPY[locale];
  const bbox = bboxAround(longitude, latitude, radiusMetersFor(lotSizeSqft));
  const aerialUrl = exportUrl(USGS_IMAGERY, bbox);
  const floodUrl = exportUrl(FEMA_NFHL, bbox, {
    layers: `show:${NFHL_FLOOD_ZONE_LAYER}`,
    transparent: "true",
  });

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold text-lp-ink">{t.heading}</h2>

      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl border border-lp-border bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote government map services,
            not assets we can route through the Next image optimiser. */}
        <img
          src={aerialUrl}
          alt=""
          width={SIZE_PX}
          height={SIZE_PX}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={floodUrl}
          alt=""
          width={SIZE_PX}
          height={SIZE_PX}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />

        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white ring-[3px] ring-lp-forest"
        />

        <p className="absolute bottom-3 left-3 rounded-lg bg-lp-forest/90 px-2.5 py-1.5 text-[11px] text-lp-cream">
          {t.sources}
        </p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-stone-500">{t.caption}</p>
    </section>
  );
}
