import SectionCard from "@/components/ui/SectionCard";
import NumberField from "../fields/NumberField";

export default function MarketSection() {
  return (
    <SectionCard
      title="📈 Market Intelligence"
      description="Macro real estate trends and liquidity in the surrounding market — distinct from this deal's own pricing."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NumberField name="market.comparableSalesTrendPercent" label="Comparable Sales Trend (YoY %)" />
        <NumberField name="market.monthsOfSupply" label="Months of Supply" />
        <NumberField name="market.avgDaysOnMarket" label="Average Days on Market" />
        <NumberField name="market.avgMonthlyRent" label="Average Monthly Rent ($)" />
        <NumberField name="market.vacancyRatePercent" label="Vacancy Rate (%)" />
        <NumberField name="market.comparablePricePerSqft" label="Comparable Price ($/sqft)" />
      </div>
    </SectionCard>
  );
}
