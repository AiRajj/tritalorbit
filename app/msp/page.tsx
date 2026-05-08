import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

export default function MspPage() {
  return (
    <DashboardShell type="msp">
      <div className="mt-8 grid gap-6">
        <Card>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-black text-[#0B3C5D]">AI-generated executive summary</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">
                Acceptance is up in markets where suppliers include mobility support in the first offer touch. Backouts remain
                concentrated around missing housing within seven days of start.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/api/exports/msp/csv">
                  <Download className="h-4 w-4" /> Export CSV
                </Link>
              </Button>
              <Button asChild>
                <Link href="/api/exports/msp/pdf">
                  <FileText className="h-4 w-4" /> Export PDF
                </Link>
              </Button>
            </div>
          </div>
        </Card>
        <div className="grid gap-4 lg:grid-cols-4">
          {["Offer acceptance rate", "Backout rate", "Time-to-ready", "First-day show-up rate", "Assignment readiness", "High-risk candidates", "Supplier performance", "Mobility support utilization"].map((metric, index) => (
            <Card key={metric} className="p-5">
              <StatusBadge label={index % 3 === 0 ? "Improving" : "Tracked"} tone={index % 3 === 0 ? "green" : "blue"} />
              <h3 className="mt-4 text-lg font-black text-[#0B3C5D]">{metric}</h3>
              <p className="mt-2 text-sm text-slate-600">Date and agency filters apply to this report tile.</p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
