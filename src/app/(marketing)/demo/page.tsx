import { DemoBookingForm } from "@/components/forms/demo-booking-form";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">Book a TRITAL Orbit Demo</h1>
      <p className="mt-3 text-slate-600">
        See how your team can increase offer acceptance, reduce backouts, and improve assignment readiness.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          ["/demo/live-platform", "Live Platform Walkthrough"],
          ["/demo/clinician-story", "Clinician Story"],
          ["/demo/recruiter-story", "Recruiter Story"],
          ["/demo/vendor-story", "Vendor Story"],
          ["/demo/msp-story", "MSP Story"]
        ].map(([href, label]) => (
          <Card key={href}>
            <CardContent className="p-4 text-sm font-medium text-slate-700">
              <Link href={href} className="hover:text-orbit-blue hover:underline">
                {label}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <DemoBookingForm />
      </div>
    </section>
  );
}
