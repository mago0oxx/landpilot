import SectionCard from "@/components/ui/SectionCard";
import NumberField from "../fields/NumberField";

export default function LocationSection() {
  return (
    <SectionCard
      title="🧭 Location Intelligence"
      description="Objective, publicly researchable metrics about the surrounding area (Census, GreatSchools, NeighborhoodScout, Walk Score). Leave blank if not yet researched."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField name="location.populationGrowthRatePercent" label="Population Growth (annual %)" />
        <NumberField name="location.employmentGrowthRatePercent" label="Employment Growth (annual %)" />
        <NumberField name="location.schoolRating" label="School Rating (1-10, GreatSchools)" />
        <NumberField name="location.crimeIndex" label="Crime Index (100 = national average)" />
        <NumberField name="location.walkScore" label="Walk Score (0-100)" />
        <NumberField name="location.nearbyAmenitiesCount" label="Nearby Amenities Count" />
        <NumberField name="location.plannedDevelopmentProjectsCount" label="Planned Development Projects Nearby" />
      </div>
    </SectionCard>
  );
}
