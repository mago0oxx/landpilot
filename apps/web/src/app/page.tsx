import { redirect } from "next/navigation";
import { auth } from "@/auth";
import MarketingNav from "@/features/marketing/components/MarketingNav";
import Hero from "@/features/marketing/components/Hero";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import EnginesGrid from "@/features/marketing/components/EnginesGrid";
import PricingSection from "@/features/marketing/components/PricingSection";
import CTAFooter from "@/features/marketing/components/CTAFooter";
import MarketingFooter from "@/features/marketing/components/MarketingFooter";

export default async function RootPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="bg-lp-cream">
      <MarketingNav />
      <Hero />
      <HowItWorks />
      <EnginesGrid />
      <PricingSection />
      <CTAFooter />
      <MarketingFooter />
    </div>
  );
}
