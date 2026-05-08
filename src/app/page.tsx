import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import {
  CtaSection,
  HeroSection,
  KpiStrip,
  SecurityTrustSection,
  ValuePillarsSection,
  WorkflowSection,
} from "@/components/marketing/sections";
import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <PublicPageShell>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <KpiStrip />
      </section>
      <WorkflowSection />
      <ValuePillarsSection />
      <SecurityTrustSection />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="border-[#0B3C5D]/20">
          <CardHeader>
            <CardTitle className="text-3xl">Request strategic launch consultation</CardTitle>
            <CardDescription>
              Share your staffing goals and TRITAL Orbit™ will design your mobility workflow blueprint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadCaptureForm type="LEAD" />
          </CardContent>
        </Card>
      </section>
      <CtaSection />
    </PublicPageShell>
  );
}
