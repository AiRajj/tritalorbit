import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DemoForm } from "@/components/marketing/demo-form";

export const metadata = { title: "Book a demo" };

const HIGHLIGHTS = [
  "30 min, customized to your assignment volume",
  "Live walkthrough of Offer Boost + Concierge",
  "Reporting tailored to your MSP scorecards",
  "No system swap. No VMS replacement.",
];

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-orbit-mist" />
      <div className="container-wide py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Badge>Book a walkthrough</Badge>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-orbit-deep md:text-4xl">
              See TRITAL Orbit™ on your real pipeline.
            </h1>
            <p className="mt-4 text-slate-600">
              Tell us about your team. A solution architect will respond within 1 business hour to schedule the
              walkthrough — typically same-day on weekdays.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-orbit-deep/10 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">Prefer to text?</div>
              <p className="mt-1 text-sm text-slate-600">
                Text our recruiter directly — no calls, no pressure. Average reply: under 1 business hour, Mon–Sat.
              </p>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-orbit-deep/10 bg-white p-6 md:p-8 shadow-elevate">
              <DemoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
