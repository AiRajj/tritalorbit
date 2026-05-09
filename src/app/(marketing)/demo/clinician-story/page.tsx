import { PersonaDemoStory } from "@/components/marketing/persona-demo-story";

export default function ClinicianStoryPage() {
  return (
    <PersonaDemoStory
      persona="Clinician"
      title="Choose the better life outcome, not just the loudest pay number"
      summary="This demo shows how a clinician compares multiple offers, uses mobility support visibility, and reaches day-one confidence with First Week + Relocation guidance."
      steps={[
        {
          title: "Compare offers side-by-side",
          detail:
            "Clinician uploads an external offer and compares net value, lifestyle score, mobility coverage, and risk profile against agency offer.",
          signal: "Lower weekly pay wins due to stronger housing + readiness support"
        },
        {
          title: "Accept mobility-backed plan",
          detail:
            "Clinician views shortlisted travel/housing bids, sees concierge recommendation, and applies sponsored wallet credits.",
          signal: "Out-of-pocket burden drops while confidence score rises"
        },
        {
          title: "Launch first week with confidence",
          detail:
            "First Week Survival Mode and Relocation Assistant provide route, local essentials, emergency contacts, and checklist guidance.",
          signal: "Checklist completion and confidence score trend upward before start date"
        }
      ]}
      outcomes={[
        "The platform reframes decisions around assignment quality-of-life and readiness certainty.",
        "Agency support is visible, measurable, and directly tied to start success.",
        "Clinician trust increases through verified vendors and transparent coverage."
      ]}
      cta={{ label: "Open live platform demo", href: "/demo/live-platform" }}
    />
  );
}
