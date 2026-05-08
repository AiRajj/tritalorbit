import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export function MarketingTemplatePage({
  title,
  subtitle,
  bullets
}: {
  title: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
        <p className="mt-4 text-lg text-slate-600">{subtitle}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {bullets.map((item) => (
          <Card key={item}>
            <CardContent className="flex items-start gap-3 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-orbit-blue" />
              <p className="text-sm text-slate-700">{item}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Talk to our team</h2>
        <p className="mt-2 text-slate-600">Get a tailored walkthrough for your staffing operations.</p>
        <div className="mt-4">
          <LeadCaptureForm source="WEBSITE" />
        </div>
      </div>
    </section>
  );
}
