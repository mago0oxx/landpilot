import type { Metadata } from "next";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";
import MarketingNav from "@/features/marketing/components/MarketingNav";

export const metadata: Metadata = { title: "Privacy Policy — LandPilot" };

export default function PrivacyPage() {
  return (
    <div className="bg-lp-cream">
      <MarketingNav />
      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-lp-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone-500">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-lg font-semibold text-lp-ink">1. What we collect</h2>
            <p className="mt-2">
              Account information (name, email, and a hashed password if you don&apos;t sign in with Google);
              the property addresses and details you submit for analysis; and, if you subscribe to a paid plan,
              billing information handled directly by Stripe (we never see or store your card number).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-lp-ink">2. How we use it</h2>
            <p className="mt-2">
              To run the analysis you request, to look up real data about the property address you provide
              (government sources like FEMA, Census, and county records, plus AI providers for narrative
              summaries and optional research), to manage your account and portfolio, and to process payments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-lp-ink">3. Third parties we share data with</h2>
            <p className="mt-2">
              Anthropic (Claude) to generate analysis summaries and, if you opt in, research market figures via
              web search — sending only the property/analysis data needed for that request. Stripe to process
              payments. Google, only if you choose to sign in with Google. We don&apos;t sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-lp-ink">4. Data retention</h2>
            <p className="mt-2">
              We keep your account and analyses until you delete them or close your account. You can delete
              individual analyses at any time from your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-lp-ink">5. Your rights</h2>
            <p className="mt-2">
              You can access, correct, or delete your data by using the app directly (edit/delete your analyses,
              or contact us to close your account).
            </p>
          </section>

          <p className="border-t border-lp-border pt-6 text-xs text-stone-400">
            This is a general-purpose template and not a substitute for legal advice. Review with a qualified
            attorney before relying on it for a live product handling real user data.
          </p>
        </div>
      </article>
      <MarketingFooter />
    </div>
  );
}
