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
];
