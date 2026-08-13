import { Locale } from "./config";

/**
 * Marketing copy for the public pages. Spanish is written for the US market, not translated
 * from the English — a literal translation of "how to know if land is buildable" competes with
 * Spanish property sites in Spain, whose readers can't use a product built on FEMA and Census
 * data. Every Spanish string that could be geographically ambiguous names the United States.
 */
export interface MarketingDictionary {
  nav: {
    guides: string;
    pricing: string;
    signIn: string;
    getStarted: string;
    guidesHref: string;
    pricingHref: string;
    homeHref: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    builtFor: string;
    signIn: string;
    sampleLabel: string;
    sampleAddress: string;
    stillNeedsHuman: string;
    stats: { cost: string; costValue: string; account: string; accountValue: string; sources: string };
    findings: { label: string; detail: string; tone: "alert" | "clear" }[];
  };
  addressForm: {
    placeholder: string;
    button: string;
    ariaLabel: string;
    checking: string;
    disclaimer: string;
    genericError: string;
    networkError: string;
    tooShort: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    stepLabel: string;
    steps: { title: string; description: string }[];
  };
  engines: {
    title: string;
    subtitle: string;
    items: { name: string; description: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    cta: string;
    /** Plan names and feature bullets only. Prices, caps and entitlements stay in lib/plans.ts
     * so there is exactly one source of truth for what a plan actually grants. */
    plans: Record<"free" | "starter" | "pro", { label: string; features: string[] }>;
  };
  ctaFooter: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    tagline: string;
    guides: string;
    pricing: string;
    terms: string;
    privacy: string;
  };
  languageSwitch: {
    label: string;
    toEnglish: string;
    toSpanish: string;
  };
}

const en: MarketingDictionary = {
  nav: {
    guides: "Guides",
    pricing: "Pricing",
    signIn: "Sign in",
    getStarted: "Get started",
    guidesHref: "/guides",
    pricingHref: "/pricing",
    homeHref: "/",
  },
  hero: {
    eyebrow: "Buying your first piece of land?",
    headline: "Don't buy land you can't build on.",
    subhead:
      "Paste the address. In 60 seconds we'll pull the parcel's FEMA flood zone, its wetlands status, and how the county is trending — straight from government records. Then we'll tell you plainly what still needs a human to check.",
    builtFor: "Built for first-time land buyers — not professional investors.",
    signIn: "Sign in",
    sampleLabel: "Sample check",
    sampleAddress: "9000 Example Ave, Tampa, FL",
    stillNeedsHuman: "Still needs a human: perc test, legal access, zoning, title.",
    stats: {
      cost: "Cost",
      costValue: "Free",
      account: "Account",
      accountValue: "Not needed",
      sources: "Sources",
    },
    findings: [
      { label: "FEMA flood zone", tone: "alert", detail: "Zone AE — high risk. Flood insurance required with a federal mortgage." },
      { label: "Wetlands", tone: "clear", detail: "None mapped on this parcel in the USFWS inventory." },
      { label: "County population & jobs", tone: "clear", detail: "Census ACS: population +1.6%, employment +2.4%." },
      { label: "Nearby services", tone: "clear", detail: "66 mapped shops, schools and healthcare nearby." },
    ],
  },
  addressForm: {
    placeholder: "123 Main St, Tampa, FL",
    button: "Check this lot free",
    ariaLabel: "Property address",
    checking: "Checking...",
    disclaimer:
      "No account needed. Pulls FEMA flood maps, the federal wetlands inventory and Census data for the parcel.",
    genericError: "Something went wrong checking that address. Try again.",
    networkError: "Couldn't reach the server. Check your connection and try again.",
    tooShort: "Enter the full address, including city and state — e.g. 123 Main St, Tampa, FL.",
  },
  howItWorks: {
    title: "How it works",
    subtitle: "No forms, no account, and nothing to pay to get a first read on a parcel.",
    stepLabel: "Step",
    steps: [
      {
        title: "Give it an address",
        description: "Just the address of the lot you're looking at. Nothing else required.",
      },
      {
        title: "We pull the real data",
        description:
          "Flood zones, wetlands, parcel records, and county trends are fetched from FEMA, USFWS, Census and county GIS — not guessed.",
      },
      {
        title: "You get findings, and the gaps",
        description:
          "What the public record says about the parcel, plus a straight list of what still needs the county, a surveyor, or a title company.",
      },
    ],
  },
  engines: {
    title: "Going further: the full analysis",
    subtitle:
      "The free check reads the public record. Once you add your numbers — asking price, lot size, what you plan to build — seven engines score the deal and add up to a single 1000-point LPS Score.",
    items: [
      { name: "Financial Intelligence", description: "Whether the numbers behind the deal make it a sound investment on their own." },
      { name: "Location Intelligence", description: "How attractive the parcel's location is for residential investment." },
      { name: "Development Intelligence", description: "Whether the parcel can physically and legally support the build you have in mind." },
      { name: "Environmental Intelligence", description: "Flood zones and environmental risk that could restrict development or raise costs." },
      { name: "Market Intelligence", description: "Macro real estate trends and liquidity in the surrounding area." },
      { name: "Legal Intelligence", description: "Legal and title risk that could block or complicate the transaction." },
      { name: "Infrastructure Intelligence", description: "Whether the utilities and access needed to build already exist at the parcel." },
    ],
  },
  pricing: {
    title: "Simple pricing",
    subtitle:
      "The address check is always free. Plans are for the full analysis, when you're comparing lots seriously.",
    cta: "Get started",
    plans: {
      free: {
        label: "Free",
        features: ["3 analyses per month", "All 7 Intelligence Engines", "Real government data sources", "AI-generated summary"],
      },
      starter: {
        label: "Starter",
        features: ["15 analyses per month", "Everything in Free", "More room to compare properties"],
      },
      pro: {
        label: "Pro",
        features: ["Unlimited analyses", "Everything in Starter", "Strategy comparison (build/sell/rent)", "AI market research", "Portfolio tracking"],
      },
    },
  },
  ctaFooter: {
    title: "Have a lot in mind? Check it before you buy.",
    subtitle: "No account, no card. Paste the address and see what the public record says.",
    button: "Check a lot free",
  },
  footer: {
    tagline: "Analyze. Invest. Grow.",
    guides: "Guides",
    pricing: "Pricing",
    terms: "Terms",
    privacy: "Privacy",
  },
  languageSwitch: {
    label: "Language",
    toEnglish: "English",
    toSpanish: "Español",
  },
};

const es: MarketingDictionary = {
  nav: {
    guides: "Guías",
    pricing: "Precios",
    signIn: "Entrar",
    getStarted: "Empezar",
    guidesHref: "/es/guias",
    pricingHref: "/es/precios",
    homeHref: "/es",
  },
  hero: {
    eyebrow: "¿Vas a comprar tu primer terreno en Estados Unidos?",
    headline: "No compres un terreno donde no puedas construir.",
    subhead:
      "Pega la dirección. En 60 segundos sacamos la zona de inundación de FEMA, si hay humedales en la parcela y cómo viene creciendo el condado — directo de los registros del gobierno. Y después te decimos claro qué falta que revise una persona.",
    builtFor: "Hecho para quien compra su primer terreno en EE.UU., no para inversionistas profesionales.",
    signIn: "Entrar",
    sampleLabel: "Ejemplo de verificación",
    sampleAddress: "9000 Example Ave, Tampa, FL",
    stillNeedsHuman: "Falta que revise una persona: perc test, acceso legal, zonificación, título.",
    stats: {
      cost: "Costo",
      costValue: "Gratis",
      account: "Cuenta",
      accountValue: "No hace falta",
      sources: "Fuentes",
    },
    findings: [
      { label: "Zona de inundación FEMA", tone: "alert", detail: "Zona AE — riesgo alto. Con hipoteca federal, el seguro de inundación es obligatorio." },
      { label: "Humedales", tone: "clear", detail: "El inventario del USFWS no marca humedales en esta parcela." },
      { label: "Población y empleo del condado", tone: "clear", detail: "Census ACS: población +1.6%, empleo +2.4%." },
      { label: "Servicios cercanos", tone: "clear", detail: "66 comercios, escuelas y centros de salud mapeados alrededor." },
    ],
  },
  addressForm: {
    placeholder: "123 Main St, Tampa, FL",
    button: "Verificar gratis",
    ariaLabel: "Dirección de la propiedad",
    checking: "Verificando...",
    disclaimer:
      "Sin cuenta. Consulta los mapas de inundación de FEMA, el inventario federal de humedales y datos del Census para la parcela.",
    genericError: "Algo falló al verificar esa dirección. Inténtalo de nuevo.",
    networkError: "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
    tooShort: "Escribe la dirección completa, con ciudad y estado — por ejemplo 123 Main St, Tampa, FL.",
  },
  howItWorks: {
    title: "Cómo funciona",
    subtitle: "Sin formularios, sin cuenta y sin pagar nada para tener una primera lectura del terreno.",
    stepLabel: "Paso",
    steps: [
      {
        title: "Pon la dirección",
        description: "Solo la dirección del lote que estás viendo. No pedimos nada más.",
      },
      {
        title: "Buscamos los datos reales",
        description:
          "Zonas de inundación, humedales, registro de la parcela y tendencias del condado, sacados de FEMA, USFWS, el Census y el GIS del condado. No son estimaciones.",
      },
      {
        title: "Te damos los hallazgos y los huecos",
        description:
          "Lo que dice el registro público sobre la parcela, más una lista directa de lo que todavía tienen que responder el condado, un topógrafo o una title company.",
      },
    ],
  },
  engines: {
    title: "El siguiente paso: el análisis completo",
    subtitle:
      "La verificación gratis lee el registro público. Cuando agregas tus números — precio, tamaño del lote y qué piensas construir — siete motores evalúan el trato y suman un solo puntaje LPS de 1000 puntos.",
    items: [
      { name: "Inteligencia Financiera", description: "Si los números del trato lo hacen una inversión sólida por sí sola." },
      { name: "Inteligencia de Ubicación", description: "Qué tan atractiva es la ubicación de la parcela para uso residencial." },
      { name: "Inteligencia de Desarrollo", description: "Si la parcela puede sostener física y legalmente lo que piensas construir." },
      { name: "Inteligencia Ambiental", description: "Zonas de inundación y riesgo ambiental que puedan limitar la obra o encarecerla." },
      { name: "Inteligencia de Mercado", description: "Tendencias del mercado inmobiliario y liquidez en la zona." },
      { name: "Inteligencia Legal", description: "Riesgo legal y de título que pueda bloquear o complicar la transacción." },
      { name: "Inteligencia de Infraestructura", description: "Si los servicios y el acceso que necesitas para construir ya llegan a la parcela." },
    ],
  },
  pricing: {
    title: "Precios simples",
    subtitle:
      "La verificación de dirección siempre es gratis. Los planes son para el análisis completo, cuando ya estás comparando lotes en serio.",
    cta: "Empezar",
    plans: {
      free: {
        label: "Gratis",
        features: ["3 análisis al mes", "Los 7 motores de inteligencia", "Datos reales del gobierno", "Resumen generado con IA"],
      },
      starter: {
        label: "Starter",
        features: ["15 análisis al mes", "Todo lo del plan Gratis", "Más margen para comparar propiedades"],
      },
      pro: {
        label: "Pro",
        features: [
          "Análisis ilimitados",
          "Todo lo del plan Starter",
          "Comparación de estrategias (construir/vender/rentar)",
          "Investigación de mercado con IA",
          "Seguimiento de portafolio",
        ],
      },
    },
  },
  ctaFooter: {
    title: "¿Tienes un lote en la mira? Verifícalo antes de comprar.",
    subtitle: "Sin cuenta y sin tarjeta. Pega la dirección y mira qué dice el registro público.",
    button: "Verificar un lote gratis",
  },
  footer: {
    tagline: "Analiza. Invierte. Crece.",
    guides: "Guías",
    pricing: "Precios",
    terms: "Términos",
    privacy: "Privacidad",
  },
  languageSwitch: {
    label: "Idioma",
    toEnglish: "English",
    toSpanish: "Español",
  },
};

const DICTIONARIES: Record<Locale, MarketingDictionary> = { en, es };

export function getMarketingDictionary(locale: Locale): MarketingDictionary {
  return DICTIONARIES[locale];
}
