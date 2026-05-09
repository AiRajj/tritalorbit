import { PersonaDemoStory } from "@/components/marketing/persona-demo-story";

export default function MspStoryPage() {
  return (
    <PersonaDemoStory
      persona="MSP / Health System Executive"
      title="Board-level proof of readiness, retention, and savings"
      summary="This executive walkthrough demonstrates how MSP stakeholders evaluate supplier performance, mobility utilization, and prevented backouts."
      steps={[
        {
          title: "Review executive KPI baseline",
          detail:
            "MSP dashboard displays acceptance rate, backout trends, first-day show-up, and estimated savings over selected periods.",
          signal: "C-suite summary cards immediately reveal operational direction"
        },
        {
          title: "Analyze supplier-level variance",
          detail:
            "Leaders drill into supplier performance and utilization to identify top performers and intervention-needed cohorts.",
          signal: "Supplier ranking + risk segmentation supports governance conversations"
        },
        {
          title: "Export narrative-ready reporting",
          detail:
            "AI summary and report-ready metrics are used for board updates and program steering reviews.",
          signal: "Executive reporting shifts from anecdotal to evidence-based"
        }
      ]}
      outcomes={[
        "MSPs can quantify readiness infrastructure value across supplier networks.",
        "Backout reduction and faster time-to-ready become auditable operating metrics.",
        "Executive reporting is generated faster with higher confidence."
      ]}
      cta={{ label: "Open MSP ROI dashboard", href: "/msp/roi" }}
    />
  );
}
