import { FeatureShell } from "@/components/marketing/feature-shell";
import { Compass, Home, KanbanSquare, Plane } from "lucide-react";

export const metadata = { title: "Mobility Concierge" };

export default function Page() {
  return (
    <FeatureShell
      tag="Mobility Concierge"
      title="A real concierge layer, with a real task board."
      description="Booking requests turn into concierge tasks. Vendors and landlords are matched to the candidate's facility city. Every action is logged, every status visible to recruiters and MSPs."
      bullets={[
        "Vendor + landlord marketplace tied to facility",
        "Concierge task board: New → Completed",
        "AI summaries for every booking request",
        "Audit-friendly status transitions",
      ]}
      preview={{
        title: "Today's queue",
        rows: [
          { label: "New requests", value: "12" },
          { label: "In progress", value: "8" },
          { label: "Waiting candidate", value: "4" },
          { label: "Completed (24h)", value: "21" },
        ],
      }}
      modules={[
        { icon: Compass, title: "Concierge board", detail: "Drag tasks across statuses. Every transition timestamped and logged." },
        { icon: Home, title: "Housing marketplace", detail: "Verified landlords with city, distance, monthly cost, and availability." },
        { icon: Plane, title: "Travel + transport", detail: "Vendor inventory for flights, ground transport, and car rentals." },
        { icon: KanbanSquare, title: "AI summaries", detail: "Each booking request comes with an AI-summarized brief and next steps." },
        { icon: Compass, title: "Vendor scoring", detail: "Internal ratings tied to fulfillment SLAs and candidate feedback." },
        { icon: Home, title: "Landlord vetting", detail: "Verification workflow with admin approval and audit trail." },
      ]}
    />
  );
}
