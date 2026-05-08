import { SolutionShell } from "@/components/marketing/solution-shell";
import { Compass, Home, ShieldCheck } from "lucide-react";

export const metadata = { title: "For Clinicians" };

export default function Page() {
  return (
    <SolutionShell
      audience="Clinicians"
      hero={{
        title: "Move with confidence. Day-1 ready.",
        description:
          "Your assignment, packaged for the way travel actually works. Verified housing, transparent pay, real concierge support — all in a mobile-first hub built for the floor, not the desk.",
        cta: { label: "See the candidate hub", href: "/candidate" },
      }}
      outcomes={[
        { value: "92%", label: "Day-1 ready" },
        { value: "<1d", label: "Concierge response" },
        { value: "100%", label: "Housing pre-vetted" },
      ]}
      pillars={[
        {
          icon: Home,
          title: "Verified housing",
          detail:
            "Every option is pre-checked: distance to facility, monthly cost, availability, and ratings. No more late-night Craigslist.",
        },
        {
          icon: Compass,
          title: "Mobility concierge",
          detail:
            "A single thread for housing, flight, ground transport, and Day-1 onboarding. Real humans backing the AI.",
        },
        {
          icon: ShieldCheck,
          title: "Trust + transparency",
          detail:
            "Pay package broken down before you sign. Credentials travel with you. Field-level audit so nothing surprises you on Day 1.",
        },
      ]}
      closing="Travel-ready, on a tap."
    />
  );
}
