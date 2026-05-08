import { FeatureShell } from "@/components/marketing/feature-shell";
import { Bell, MessageSquare, Phone, Radar } from "lucide-react";

export const metadata = { title: "Retention Risk AI" };

export default function Page() {
  return (
    <FeatureShell
      tag="Retention Risk AI"
      title="See backouts coming. Act on a single line of guidance."
      description="The Risk Engine reads candidate behavior, offer engagement, mobility friction, location difficulty, pay competitiveness, and start-date proximity to score every candidate 0–100."
      bullets={[
        "Per-candidate score with reasoning",
        "Suggested recruiter action, SMS, and call script",
        "Risk surfaces in dashboard, offer detail, and tracking",
        "Auto-escalates when score crosses 75",
      ]}
      preview={{
        title: "Risk · Sample candidate",
        rows: [
          { label: "Score", value: "82 / 100" },
          { label: "Level", value: "Critical" },
          { label: "Reason", value: "Housing not requested · Start in 6d" },
          { label: "Action", value: "Call within 60 min" },
        ],
      }}
      modules={[
        { icon: Radar, title: "Score 0–100", detail: "Deterministic scoring backed by AI reasoning. Auditable and tunable." },
        { icon: MessageSquare, title: "Suggested SMS", detail: "Recruiter-tone-of-voice text generated per candidate." },
        { icon: Phone, title: "Call script", detail: "Open / confirm / pivot / close framework, contextual to the candidate." },
        { icon: Bell, title: "Auto-alerts", detail: "Critical (>75) candidates push notifications to recruiter and manager." },
        { icon: Radar, title: "Reasoning", detail: "Plain-English why-this-score for coaching and audit." },
        { icon: Radar, title: "Trend tracking", detail: "Score history per candidate to coach pipeline behavior." },
      ]}
    />
  );
}
