import SectionCard from "@/components/ui/SectionCard";
import BooleanSelectField from "../fields/BooleanSelectField";

export default function LegalSection() {
  return (
    <SectionCard
      title="⚖️ Legal Intelligence"
      description="Zoning compliance, title, easements and restrictions — a single legal obstacle can invalidate every other engine's analysis until resolved."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <BooleanSelectField name="legal.zoningCompliant" label="Zoning Compliant for Intended Use" />
        <BooleanSelectField name="legal.titleIssues" label="Title Issues / Liens Present" />
        <BooleanSelectField name="legal.easementsPresent" label="Easements or Encroachments Present" />
        <BooleanSelectField name="legal.hoaRestrictions" label="HOA / Deed Restrictions Present" />
        <BooleanSelectField name="legal.openCodeViolations" label="Open Code Violations" />
      </div>
    </SectionCard>
  );
}
