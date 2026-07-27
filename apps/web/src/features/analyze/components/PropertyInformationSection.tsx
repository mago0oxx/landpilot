import Card from "@/components/ui/Card";

export default function PropertyInformationSection() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">
        Property Information
      </h2>

      <p className="mt-2 text-zinc-400">
        Tell LandPilot which property you want to analyze.
      </p>
    </Card>
  );
}
