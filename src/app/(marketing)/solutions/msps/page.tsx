import { SolutionShell } from "@/components/marketing/solution-shell";
import { Building2, FileSearch, LineChart } from "lucide-react";

export const metadata = { title: "For MSPs" };

export default function Page() {
  return (
    <SolutionShell
      audience="MSPs"
      hero={{
        title: "Supplier performance you can prove.",
        description:
          "Read-only access to acceptance, backout, and readiness metrics — by supplier, by facility, by week. Orbit replaces 30 spreadsheets with one scorecard.",
        cta: { label: "Request MSP brief", href: "/demo" },
      }}
      outcomes={[
        { value: "100%", label: "Audit-ready" },
        { value: "0", label: "Manual exports" },
        { value: "5min", label: "Exec summary" },
      ]}
      pillars={[
        {
          icon: LineChart,
          title: "Live scorecards",
          detail:
            "Acceptance, backout, time-to-ready, first-day show-up, and readiness — by supplier, agency, and facility.",
        },
        {
          icon: FileSearch,
          title: "AI Exec Summary",
          detail:
            "Generates a procurement-ready narrative for every reporting period: highlights, watch-outs, and recommended actions.",
        },
        {
          icon: Building2,
          title: "Multi-supplier consolidation",
          detail:
            "Onboard supplier agencies in days. They keep their workflow; you get standardized reporting.",
        },
      ]}
      testimonial={{
        quote:
          "The scorecard cleared procurement faster than any vendor we've run. Onboarded in two weeks.",
        author: "Director of MSP Programs",
        where: "National workforce services firm",
      }}
      closing="Standardize supplier performance across your MSP."
    />
  );
}
