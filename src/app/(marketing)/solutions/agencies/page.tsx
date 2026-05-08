import { SolutionShell } from "@/components/marketing/solution-shell";
import { Briefcase, Radar, Sparkles } from "lucide-react";

export const metadata = { title: "For Agencies" };

export default function Page() {
  return (
    <SolutionShell
      audience="Agencies"
      hero={{
        title: "Win the offer without the bidding war.",
        description:
          "Stop competing on weekly rate. Start competing on first-week experience. Orbit lets every recruiter ship a boosted, mobility-loaded offer in under 5 minutes.",
        cta: { label: "Book agency demo", href: "/demo" },
      }}
      outcomes={[
        { value: "+34%", label: "Higher acceptance" },
        { value: "–41%", label: "Backout reduction" },
        { value: "2.3×", label: "Faster close" },
      ]}
      pillars={[
        {
          icon: Sparkles,
          title: "Offer Boost Builder",
          detail:
            "Enter the assignment, toggle perks, and the AI writes the candidate-facing summary, SMS, email, and recruiter close strategy.",
        },
        {
          icon: Radar,
          title: "Retention Risk Engine",
          detail:
            "Every active candidate scored 0–100, with reasoning, action, suggested SMS, and call script. Risk surfaces in your dashboard, not in a backout post-mortem.",
        },
        {
          icon: Briefcase,
          title: "Concierge + Marketplace",
          detail:
            "Approved housing + travel + transportation vendors mapped to your candidate's city. Concierge tasks resolve booking requests with audit trails.",
        },
      ]}
      testimonial={{
        quote:
          "We didn't change pay. We changed what was inside the offer. Backouts dropped 38% in one quarter and acceptance climbed.",
        author: "VP Clinical Operations",
        where: "National travel staffing firm",
      }}
      closing="Bring boosted offers into your agency this quarter."
    />
  );
}
