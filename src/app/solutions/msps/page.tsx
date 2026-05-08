import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MspsSolutionPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-[#1F2937]">Solutions for MSPs</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Monitor supplier performance and assignment readiness with transparent offer-to-start intelligence.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            "Acceptance and backout trend visibility",
            "Supplier performance benchmarking",
            "AI-generated executive summaries",
            "Readiness and first-day show-up intelligence",
          ].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  Drill-down by date range, agency, and mobility utilization signal.
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
