import SectionCard from "@/components/ui/SectionCard";
import NumberField from "../fields/NumberField";

export default function DevelopmentSection() {
  return (
    <SectionCard
      title="🏗️ Development Intelligence"
      description="Zoning density, buildable area, construction cost, and permitting — what determines whether this lot can support a duplex/triplex, not just a single home."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField name="development.zoningAllowedUnits" label="Zoning Allowed Units" placeholder="Default: 1 (single-family)" />
        <NumberField name="development.avgUnitSizeSqft" label="Average Unit Size (sqft)" placeholder="Default: 1200" />
        <NumberField name="development.minLotAreaPerUnitSqft" label="Min Lot Area per Unit (sqft, per zoning code)" />
        <NumberField
          name="development.estimatedConstructionCostPerSqft"
          label="Estimated Construction Cost ($/sqft)"
          placeholder="Default: $180/sqft (FL typical)"
        />
        <NumberField name="development.regionalAvgConstructionCostPerSqft" label="Regional Avg Construction Cost ($/sqft)" />
        <NumberField name="development.estimatedPermitMonths" label="Estimated Permitting Timeline (months)" />
        <NumberField name="development.requiredPermitsCount" label="Required Permits (count)" />
      </div>
    </SectionCard>
  );
}
