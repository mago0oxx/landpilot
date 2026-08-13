export interface GuideMetaEs {
  slug: string;
  title: string;
  dek: string;
}

/**
 * Not translations of the English guides. Generic Spanish queries like "cómo saber si un
 * terreno es construible" return Spanish property sites talking about Ayuntamiento and
 * Catastro — readers who can't use a product built on FEMA, USFWS and county GIS data.
 * Every title here is anchored to the United States so it reaches the right searcher.
 */
/**
 * English guide slug -> Spanish equivalent, for cross-links generated from shared code (the
 * findings on a check result reference English slugs). Only listed where a real Spanish guide
 * exists; anything missing here deliberately renders without a link rather than dropping a
 * Spanish reader onto an English page.
 */
export const EN_TO_ES_GUIDE: Record<string, string> = {
  "perc-test": "perc-test",
  "is-land-buildable": "terreno-construible-estados-unidos",
};

export const GUIDES_ES: GuideMetaEs[] = [
  {
    slug: "comprar-terreno-en-florida",
    title: "Qué revisar antes de comprar un terreno en Florida",
    dek: "Lo que un anuncio no te dice y el condado sí, en el orden en que conviene revisarlo.",
  },
  {
    slug: "terreno-construible-estados-unidos",
    title: "Cómo saber si un terreno en EE.UU. es construible",
    dek: "\"Buildable lot\" en un anuncio es publicidad, no una garantía legal. Esta es la lista para comprobarlo.",
  },
  {
    slug: "perc-test",
    title: "Qué es un perc test y por qué puede tumbar tu compra",
    dek: "Si el lote no tiene alcantarillado, una prueba de percolación reprobada significa que legalmente no puedes construir.",
  },
  {
    slug: "terrenos-baratos-estafas",
    title: "Terrenos baratos por internet: por qué son baratos",
    dek: "Lotes rurales de cinco mil dólares con financiamiento del dueño. Qué suele estar mal, y cómo verificarlo desde tu casa.",
  },
];
