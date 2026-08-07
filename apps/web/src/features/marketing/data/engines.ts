export interface MarketingEngine {
  name: string;
  weight: number;
  description: string;
}

export const MARKETING_ENGINES: MarketingEngine[] = [
  {
    name: "Financial Intelligence",
    weight: 250,
    description: "Whether the numbers behind the deal make it a sound investment on their own.",
  },
  {
    name: "Location Intelligence",
    weight: 180,
    description: "How attractive the parcel's location is for residential investment.",
  },
  {
    name: "Development Intelligence",
    weight: 180,
    description: "Whether the parcel can physically and legally support the build you have in mind.",
  },
  {
    name: "Environmental Intelligence",
    weight: 120,
    description: "Flood zones and environmental risk that could restrict development or raise costs.",
  },
  {
    name: "Market Intelligence",
    weight: 100,
    description: "Macro real estate trends and liquidity in the surrounding area.",
  },
  {
    name: "Legal Intelligence",
    weight: 90,
    description: "Legal and title risk that could block or complicate the transaction.",
  },
  {
    name: "Infrastructure Intelligence",
    weight: 80,
    description: "Whether the utilities and access needed to build already exist at the parcel.",
  },
];
