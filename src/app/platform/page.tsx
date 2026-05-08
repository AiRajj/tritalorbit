import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { KpiStrip, WorkflowSection } from "@/components/marketing/sections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  "Offer Boost Builder",
  "Assignment Launch Dashboard",
  "Retention Risk AI",
  "Mobility Concierge",
  "Vendor & Housing Marketplace",
  "MSP Reporting Suite",
  "Admin Control Center",
];

export default function PlatformPage() {
  return (
    <PublicPageShell>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-[#1F2937]">TRITAL Orbit™ Platform</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            A premium operating system that unifies recruitment, candidate mobility, concierge operations,
            and executive reporting in one secure workflow.
          </p>
          <div className="mt-10">
            <KpiStrip />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Card key={module}>
              <CardHeader>
                <CardTitle>{module}</CardTitle>
                <CardDescription>
                  Enterprise-grade workflows, AI recommendations, and real-time operational visibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-500">
                Every module includes role-aware actions, fallback states, and integrated activity tracking.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <WorkflowSection />
    </PublicPageShell>
  );
}
