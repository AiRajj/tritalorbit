import { CheckCircle2, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";

export const metadata = { title: "Travel" };

const ITEMS = [
  "Confirm arrival airport with concierge",
  "Lock flight 7+ days before start",
  "Confirm ground transport (rideshare or rental)",
  "Set up parking + badge before Day 1",
  "Schedule readiness call with concierge",
];

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Travel" title="Travel checklist" description="Day-1 ready, end-to-end." />
      <Card>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {ITEMS.map((i) => (
              <li key={i} className="flex items-start gap-2 rounded-lg border border-orbit-deep/10 bg-white p-4 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                {i}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
