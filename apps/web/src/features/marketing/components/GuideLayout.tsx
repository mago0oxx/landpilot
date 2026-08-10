import Link from "next/link";
import { ReactNode } from "react";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";

interface GuideLayoutProps {
  title: string;
  dek: string;
  children: ReactNode;
}

export default function GuideLayout({ title, dek, children }: GuideLayoutProps) {
  return (
    <div className="bg-lp-cream">
      <MarketingNav />
      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <Link href="/guides" className="text-sm font-medium text-lp-forest-light hover:underline">
          ← All guides
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-lp-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-lg text-stone-600">{dek}</p>

        <div className="prose-guide mt-8 space-y-6 text-sm leading-relaxed text-stone-600">{children}</div>

        <div className="mt-12 rounded-2xl border border-lp-gold/25 bg-lp-gold/5 p-6 text-center">
          <p className="font-semibold text-lp-ink">Have a specific lot in mind?</p>
          <p className="mt-1 text-sm text-stone-600">
            Paste the address and we&apos;ll check flood zone, access, and utilities for free.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-3 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
          >
            Analyze it free
          </Link>
        </div>
      </article>
      <MarketingFooter />
    </div>
  );
}
