import { PersonaDemoStory } from "@/components/marketing/persona-demo-story";

export default function RecruiterStoryPage() {
  return (
    <PersonaDemoStory
      persona="Recruiter"
      title="Rescue at-risk offers with precision support actions"
      summary="This walkthrough demonstrates the Offer War Room lifecycle: risk signals, AI-guided outreach, wallet sponsorship, and mobility friction removal."
      steps={[
        {
          title: "Detect risk before candidate churn",
          detail:
            "War Room prioritizes offers by close probability, urgency, and mobility friction. Recruiter starts with highest risk opportunities.",
          signal: "At-risk queue and heatmap highlight immediate action targets"
        },
        {
          title: "Execute AI-guided save plan",
          detail:
            "Recruiter uses generated SMS/email/call scripts and assigns concierge + wallet credits to remove specific blockers.",
          signal: "Engagement score improves after targeted outreach and sponsored credit"
        },
        {
          title: "Track conversion to acceptance",
          detail:
            "Recruiter logs outreach completion and watches offer status move from risk to accepted with readiness tracking.",
          signal: "Recovery path is measurable and repeatable for team playbooks"
        }
      ]}
      outcomes={[
        "Recruiters stop relying on pay-rate escalation as the only close tactic.",
        "Support actions are tied to measurable conversion lift and readiness outcomes.",
        "Leadership gains visibility into save-strategy effectiveness by recruiter."
      ]}
      cta={{ label: "View Offer War Room route", href: "/agency/offer-war-room" }}
    />
  );
}
