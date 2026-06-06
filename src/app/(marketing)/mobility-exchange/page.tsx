import Link from "next/link";
import { ArrowRight, Plane, Home, Car, Hotel, Sparkles, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata = {
  title: "Live Mobility Exchange™ — TRITAL Orbit",
  description:
    "The assignment-verified bidding marketplace where travel agencies, housing providers, car rental, and hotel partners compete to win every healthcare placement."
};

const VENDOR_TYPES = [
  { icon: Plane, label: "Travel agencies", value: "Verified ARC/IATA partners" },
  { icon: Home, label: "Housing providers", value: "Furnished and extended-stay" },
  { icon: Car, label: "Car rental", value: "Major chains + local providers" },
  { icon: Hotel, label: "Hotel partners", value: "Extended-stay specialists" },
  { icon: Sparkles, label: "Relocation vendors", value: "Concierge-grade full-service" }
];

const VALUE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Verified at the assignment layer",
    body:
      "Every request is tied to a real healthcare placement — not anonymous traveler demand. Vendors bid against a known facility, start date, and verified candidate."
  },
  {
    icon: Star,
    title: "Concierge pick + bid scoring",
    body:
      "Each bid is scored against budget, distance to facility, refundability, and vendor reputation. Recruiters and clinicians see the concierge pick at the top."
  },
  {
    icon: Zap,
    title: "Most bids in under 2 hours",
    body:
      "Vendors get push alerts the moment a request goes live. Average first-bid time across the network is under 90 minutes."
  }
];

export default function MobilityExchangePage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-orbit-soft">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orbit-blue">
              Live Mobility Exchange™
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Assignment-verified mobility, priced by the market.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              The bidding marketplace where verified travel, housing, car rental, hotel, and relocation
              partners compete to win every healthcare assignment booking. No anonymous demand. No race to
              the bottom. Just transparent, verified placement-backed mobility.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/demo">
                  Book a walkthrough <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/solutions/travel-agencies">Become a partner</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-premium">
            <p className="text-sm font-medium text-slate-500">Who bids on Orbit</p>
            {VENDOR_TYPES.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                <div className="rounded-md bg-orbit-blue/10 p-2 text-orbit-blue">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUE_PILLARS.map(({ icon: Icon, title, body }) => (
            <Card key={title}>
              <CardContent className="space-y-3 p-6">
                <div className="inline-flex rounded-md bg-orbit-blue/10 p-2 text-orbit-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-slate-900">{title}</p>
                <p className="text-sm text-slate-600">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-blue">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">From offer to booking in one flow</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { step: "01", title: "Candidate or agency posts a request", body: "Tied to a verified assignment — facility, city, start date, budget." },
              { step: "02", title: "Vendors compete in real-time", body: "Verified travel, housing, car, and hotel partners submit ranked bids." },
              { step: "03", title: "Concierge AI scores each bid", body: "Distance, refundability, vendor reputation, savings vs. budget." },
              { step: "04", title: "Booking is confirmed", body: "Platform fee captured, vendor payout scheduled, candidate notified." }
            ].map(({ step, title, body }) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold text-orbit-blue">{step}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-blue">
          Get early-partner access
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">
          Join the Orbit Mobility Exchange™
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Tell us what you provide (travel, housing, car, hotel, relocation) and we&apos;ll get you onboarded into
          the first verified bid round for your service area.
        </p>
        <div className="mt-6">
          <LeadCaptureForm source="WEBSITE" />
        </div>
      </section>
    </div>
  );
}
