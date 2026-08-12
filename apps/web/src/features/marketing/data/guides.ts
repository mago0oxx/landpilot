export interface GuideMeta {
  slug: string;
  title: string;
  dek: string;
}

/** Single source of truth for the /guides index and cross-links between guides. */
export const GUIDES: GuideMeta[] = [
  {
    slug: "is-land-buildable",
    title: "How to Know If Land Is Buildable Before You Buy",
    dek: "Vacant land isn't automatically buildable land. Here's the checklist to run before you make an offer.",
  },
  {
    slug: "perc-test",
    title: "What Is a Perc Test — and Why It Can Kill Your Purchase",
    dek: "If the lot isn't on public sewer, a failed percolation test can mean you legally can't build there.",
  },
  {
    slug: "landlocked-land",
    title: "How to Check If a Lot Has Legal Access (Landlocked Land)",
    dek: "A dirt path to the road isn't the same as a legal right to use it. Here's how to tell the difference.",
  },
  {
    slug: "utility-costs",
    title: "How Much It Costs to Bring Power and Water to Land With No Utilities",
    dek: "\"Utilities available at the street\" isn't a guarantee. Here's what running power, water, and septic actually costs.",
  },
  {
    slug: "due-diligence-checklist",
    title: "Land Buying Due Diligence Checklist",
    dek: "Everything to verify before you close on a vacant lot, in one place.",
  },
  {
    slug: "fema-flood-zone-ae",
    title: "What FEMA Flood Zone AE Means for Your Land",
    dek: "It doesn't automatically mean don't buy — but it changes your insurance costs and how you'll need to build.",
  },
  {
    slug: "zoning-explained",
    title: "How to Read a Lot's Zoning Before You Buy",
    dek: "Zoning decides what you're allowed to build, how big, how many, and how far from the property line. It's free to check and it rules out lots fast.",
  },
  {
    slug: "land-loans",
    title: "How to Finance Vacant Land (It's Not a Mortgage)",
    dek: "Most people budget for a land purchase assuming mortgage terms. The terms are meaningfully worse, and that changes what you can afford.",
  },
  {
    slug: "easements-and-deed-restrictions",
    title: "Easements and Deed Restrictions on Vacant Land",
    dek: "Zoning is the county's rules. These are the private ones — often stricter, invisible on a map, and legally binding on you.",
  },
  {
    slug: "wetlands-on-land",
    title: "What It Means If Your Lot Has Wetlands",
    dek: "Five acres on the deed can mean one acre you can build on. Wetlands are the most common reason usable land is smaller than purchased land.",
  },
  {
    slug: "well-water-and-septic-costs",
    title: "Well Water and Septic on Raw Land: What to Budget",
    dek: "On rural land these two routinely add up to more than buyers expect — and on some parcels, water isn't available at any price.",
  },
  {
    slug: "buying-land-sight-unseen",
    title: "Buying Land Sight Unseen: What Goes Wrong",
    dek: "Cheap rural lots sold online to out-of-state buyers are cheap for reasons that don't show up in the listing photos.",
  },
  {
    slug: "survey-and-title-insurance",
    title: "Do You Need a Survey and Title Insurance on Vacant Land?",
    dek: "Short answer: yes to both, and more so than when buying a house. Here's what each one actually protects you from.",
  },
];
