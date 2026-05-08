import { DemoBookingForm } from "@/components/forms/demo-booking-form";

export default function DemoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900">Book a TRITAL Orbit™ Demo</h1>
      <p className="mt-3 text-slate-600">
        See how your team can increase offer acceptance, reduce backouts, and improve assignment readiness.
      </p>
      <div className="mt-8">
        <DemoBookingForm />
      </div>
    </section>
  );
}
