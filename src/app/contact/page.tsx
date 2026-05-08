import { LeadCaptureForm } from "@/components/forms/lead-capture-form";
import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact TRITAL Orbit™</CardTitle>
            <CardDescription>
              Reach our platform, support, and partnerships team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadCaptureForm type="CONTACT" />
          </CardContent>
        </Card>
      </section>
    </PublicPageShell>
  );
}
