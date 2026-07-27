import SectionCard from "@/components/ui/SectionCard";

export default function PropertyInformationSection() {
  return (
    <SectionCard
      title="📍 Property Information"
      description="Tell LandPilot which property you want to analyze."
    >
      <div className="space-y-6">

        <div className="rounded-xl border border-dashed border-zinc-700 p-6">
          Address field coming soon...
        </div>

        <div className="rounded-xl border border-dashed border-zinc-700 p-6">
          Zillow / Realtor URL coming soon...
        </div>

      </div>
    </SectionCard>
  );
}