import { FeatureShell } from "@/components/marketing/feature-shell";
import { Sparkles, Wand2, Send, FileText } from "lucide-react";

export const metadata = { title: "Offer Boost Builder" };

export default function Page() {
  return (
    <FeatureShell
      tag="Offer Boost Builder"
      title="Premium offers, generated in 5 minutes."
      description="The recruiter enters the basics. The AI writes the boosted candidate-facing summary, recruiter talking points, SMS, email, and close strategy. The candidate gets a hub link they actually open."
      bullets={[
        "Toggle 7 mobility perks per offer",
        "AI summary, SMS pitch, email pitch, close strategy",
        "PDF-ready offer + shareable candidate link",
        "Confidence score 0–100 on every offer",
      ]}
      preview={{
        title: "Live offer · ICU RN, Houston TX",
        rows: [
          { label: "Weekly Pay", value: "$2,640" },
          { label: "Total Value", value: "$36,840" },
          { label: "Mobility Perks", value: "Housing + Flight + Car" },
          { label: "AI Confidence", value: "92 / 100" },
        ],
        footnote: "Boosted offers ship with audit trail and shareable token URL.",
      }}
      modules={[
        { icon: Sparkles, title: "AI copy", detail: "Summary, value statement, SMS, email, and close strategy generated per candidate." },
        { icon: Wand2, title: "Perk toggles", detail: "Flight, housing, car, concierge, first-week, emergency housing, loyalty rewards." },
        { icon: Send, title: "Send + track", detail: "Activity log captures sent, viewed, and engaged events for every offer." },
        { icon: FileText, title: "PDF + link", detail: "PDF-ready offer document and a public candidate hub link, both audit-traced." },
        { icon: Sparkles, title: "Confidence score", detail: "0–100 indicator of close-likelihood, surfaced in the dashboard and offer detail." },
        { icon: Send, title: "Recruiter handoff", detail: "All AI artifacts saved against the offer record for handoff and coaching." },
      ]}
    />
  );
}
