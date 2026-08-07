import SectionCard from "@/components/ui/SectionCard";
import BooleanSelectField from "../fields/BooleanSelectField";

export default function InfrastructureSection() {
  return (
    <SectionCard
      title="🚧 Infrastructure Intelligence"
      description="Whether the utilities and physical access needed to build already exist at or near the parcel."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BooleanSelectField name="infrastructure.waterSewerAvailable" label="Public Water & Sewer Available" />
        <BooleanSelectField name="infrastructure.electricityAvailable" label="Electricity Available" />
        <BooleanSelectField name="infrastructure.roadFrontage" label="Legal Road Frontage" />
        <BooleanSelectField name="infrastructure.stormwaterDrainageAdequate" label="Stormwater Drainage Adequate" />
        <BooleanSelectField name="infrastructure.broadbandAvailable" label="Broadband Available" />
      </div>
    </SectionCard>
  );
}
