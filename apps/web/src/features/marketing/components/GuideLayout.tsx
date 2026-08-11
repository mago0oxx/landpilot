import Link from "next/link";
import { ReactNode } from "react";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import AddressCheckForm from "@/features/preview/components/AddressCheckForm";
import { SITE_URL } from "@/lib/siteUrl";

interface GuideLayoutProps {
  /** Matches the folder name under /app/guides — used to build the canonical URL. */
  slug: string;
  title: string;
  dek: string;
  children: ReactNode;
}

export default function GuideLayout({ slug, title, dek, children }: GuideLayoutProps) {
  const url = `${SITE_URL}/guides/${slug}`;

  // Article schema so these can surface as rich results. Publisher is the site itself —
  // there's no personal author byline to claim, and inventing one would be worse than none.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: dek,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    publisher: {
      "@type": "Organization",
      name: "LandPilot",
      url: SITE_URL,
    },
    inLanguage: "en-US",
  };

  return (
    <div className="bg-lp-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <MarketingNav />
      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <Link href="/guides" className="text-sm font-medium text-lp-forest-light hover:underline">
          ← All guides
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-stone-600">{dek}</p>

        <div className="prose-guide mt-8 space-y-6 text-sm leading-relaxed text-stone-600">{children}</div>

        <div className="mt-12 rounded-2xl border border-lp-gold/25 bg-lp-gold/5 p-6">
          <p className="font-semibold text-lp-ink">Have a specific lot in mind?</p>
          <p className="mt-1 mb-4 text-sm text-stone-600">
            Paste the address and we&apos;ll pull its flood zone, wetlands and county risk data
            right now — no account.
          </p>
          <AddressCheckForm variant="inline" buttonLabel="Check it free" />
        </div>
      </article>
      <MarketingFooter />
    </div>
  );
}
