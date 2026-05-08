import { FeatureShell } from "@/components/marketing/feature-shell";
import { CalendarCheck2, ClipboardList, Filter, ShieldCheck } from "lucide-react";

export const metadata = { title: "Assignment Launch Dashboard" };

export default function Page() {
  return (
    <FeatureShell
      tag="Assignment Launch Dashboard"
      title="From offer accepted to first day, on one rail."
      description="Track readiness across every accepted candidate: housing, travel, documents, first-week. Risk surfaces before it becomes a backout."
      bullets={[
        "Per-candidate readiness 0–100",
        "Housing / travel / documents / first-week status",
        "Risk score with action recommendation",
        "Filters, search, status colors, CSV export",
      ]}
      preview={{
        title: "Pipeline · This week",
        rows: [
          { label: "Active assignments", value: "147" },
          { label: "Day-1 risk (high)", value: "9" },
          { label: "Avg. readiness", value: "84%" },
          { label: "On-time start rate", value: "98%" },
        ],
      }}
      modules={[
        { icon: CalendarCheck2, title: "Readiness tracker", detail: "Each assignment scored on housing, travel, documents, first-week." },
        { icon: ClipboardList, title: "Action queue", detail: "AI-surfaced 'Action Needed' tasks tied to each assignment row." },
        { icon: Filter, title: "Filters + search", detail: "Slice by recruiter, facility, week, status, or risk tier." },
        { icon: ShieldCheck, title: "Audit ready", detail: "Every status change is logged with actor, timestamp, and reason." },
        { icon: ClipboardList, title: "CSV / PDF export", detail: "Procurement-ready reporting with one click." },
        { icon: CalendarCheck2, title: "Risk escalation", detail: "Auto alerts when start date is within 7 days and readiness dips." },
      ]}
    />
  );
}
