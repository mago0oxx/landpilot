import SectionCard from "@/components/ui/SectionCard";
import NumberField from "../fields/NumberField";

export default function FinancialSection() {
  return (
    <SectionCard
      title="💰 Financial Intelligence"
      description="The deal's numbers — this is the highest-weighted engine (250/1000), because LandPilot finds the best investment, not the best land."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField name="financial.estimatedMarketValue" label="Estimated Market Value ($)" />
        <NumberField
          name="financial.projectedExitValue"
          label="Projected Exit / ARV Value ($)"
          placeholder="Default: Asking Price x 1.15"
        />
        <NumberField name="financial.projectedAnnualRentalIncome" label="Projected Annual Rental Income ($)" />
        <NumberField name="financial.downPaymentPercent" label="Down Payment (%)" />
        <NumberField name="financial.maxLoanToCostPercent" label="Max Loan-to-Cost (%)" />
        <NumberField name="financial.areaAvgPricePerSqft" label="Area Average Price ($/sqft)" />
      </div>
    </SectionCard>
  );
}
