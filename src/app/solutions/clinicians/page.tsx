import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CliniciansSolutionPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-[#1F2937]">Solutions for clinicians</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Assignment confidence starts with logistics confidence. TRITAL Orbit™ gives clinicians one trusted
          destination for housing, travel, and move support.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Transparent package and perks",
            "Concierge-assisted relocation",
            "Personalized first-week readiness",
          ].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                Every assignment is structured to reduce stress and improve start-day confidence.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
