import Link from "next/link";
import type { Metadata } from "next";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import { GUIDES } from "@/features/marketing/data/guides";

export const metadata: Metadata = {
  title: "Land Buying Guides — LandPilot",
  description: "Plain-English answers to the questions that trip up first-time land buyers — buildability, perc tests, access, utilities, and flood zones.",
};

export default function GuidesIndexPage() {
  return (
    <div className="bg-lp-cream">
      <MarketingNav />
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">Land buying guides</h1>
        <p className="mt-3 text-lg text-stone-600">
          Straight answers to what actually goes wrong when people buy vacant land — written for
          someone doing this for the first time.
        </p>

        <div className="mt-10 space-y-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block rounded-2xl border border-lp-border bg-white p-6 transition hover:border-lp-forest/40"
            >
              <h2 className="text-lg font-semibold text-lp-ink">{guide.title}</h2>
              <p className="mt-1.5 text-sm text-stone-600">{guide.dek}</p>
            </Link>
          ))}
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
