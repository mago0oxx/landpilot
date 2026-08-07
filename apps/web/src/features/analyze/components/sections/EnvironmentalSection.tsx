import SectionCard from "@/components/ui/SectionCard";
import BooleanSelectField from "../fields/BooleanSelectField";
import SelectField from "../fields/SelectField";

const FLOOD_ZONE_OPTIONS = [
  { value: "X", label: "X — Minimal risk" },
  { value: "A", label: "A — Moderate risk" },
  { value: "AO", label: "AO — Shallow flooding risk" },
  { value: "AE", label: "AE — High risk" },
  { value: "VE", label: "VE — High risk, coastal" },
  { value: "OTHER", label: "Other / Unclassified" },
];

const HAZARD_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const SOIL_OPTIONS = [
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];

export default function EnvironmentalSection() {
  return (
    <SectionCard
      title="🌍 Environmental Intelligence"
      description="FEMA flood zone, wetlands, and hazard exposure — disproportionately weighted toward flood risk given the initial Florida market."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          name="environmental.femaFloodZone"
          label="FEMA Flood Zone"
          options={FLOOD_ZONE_OPTIONS}
          placeholder="Select a flood zone"
        />
        <BooleanSelectField name="environmental.wetlandsPresent" label="Wetlands Present" />
        <SelectField
          name="environmental.naturalHazardExposure"
          label="Natural Hazard Exposure"
          options={HAZARD_OPTIONS}
          placeholder="Select exposure level"
        />
        <SelectField name="environmental.soilQuality" label="Soil Quality" options={SOIL_OPTIONS} placeholder="Select soil quality" />
        <BooleanSelectField name="environmental.environmentalPermitRequired" label="Additional Environmental Permit Required" />
      </div>
    </SectionCard>
  );
}
