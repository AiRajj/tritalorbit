import { DemoBookingForm } from "@/components/forms/demo-booking-form";
import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Book a live TRITAL Orbit™ demo</CardTitle>
            <CardDescription>
              Walk through offer optimization, candidate assignment hub, concierge workflows, and MSP reporting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemoBookingForm />
          </CardContent>
        </Card>
      </section>
    </PublicPageShell>
  );
}
