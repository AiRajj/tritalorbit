import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketing/sections";

export const metadata = { title: "Pricing" };

const TIERS = [
  {
    name: "Starter",
    price: "$1,800",
    cadence: "/mo",
    description: "For lean staffing teams running their first boosted offers.",
    features: [
      "Up to 5 recruiter seats",
      "Offer Boost Builder",
      "Candidate Hub portals",
      "Retention Risk Engine",
      "Email + Slack support",
    ],
    cta: "Start with Starter",
    href: "/demo?plan=starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "$4,200",
    cadence: "/mo",
    description: "For multi-recruiter agencies scaling mobility-led offers.",
    features: [
      "Up to 25 recruiter seats",
      "Everything in Starter",
      "Concierge task board + vendor marketplace",
      "Assignment Launch Dashboard",
      "MSP-ready reporting (PDF + CSV)",
      "Priority onboarding",
    ],
    cta: "Move to Growth",
    href: "/demo?plan=growth",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For MSPs, multi-brand agencies, and health system partners.",
    features: [
      "Unlimited seats + roles",
      "Multi-agency consolidation",
      "Custom AI agent prompts + bring-your-own-key",
      "SAML SSO, SCIM, custom audit retention",
      "Dedicated solution architect",
    ],
    cta: "Talk to enterprise",
    href: "/contact?topic=enterprise",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-orbit-hero text-white">
        <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.1] [background-size:48px_48px]" />
        <div className="container-wide relative py-20 text-center md:py-28">
          <Badge variant="inverse">Pricing</Badge>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Pricing built around outcomes, not seats.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/80">
            Every plan ships the full Orbit mobility layer. We don't gate critical workflows behind enterprise tiers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <Card
                key={t.name}
                className={
                  "relative h-full overflow-hidden " +
                  (t.featured
                    ? "border-orbit-deep/30 ring-2 ring-orbit-deep/20 shadow-elevate"
                    : "")
                }
              >
                {t.featured && (
                  <div className="absolute right-4 top-4">
                    <Badge variant="accent">Most popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-orbit-red">{t.name}</div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-orbit-deep">{t.price}</span>
                    {t.cadence && <span className="text-sm text-slate-500">{t.cadence}</span>}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{t.description}</p>
                  <Button asChild variant={t.featured ? "default" : "outline"} className="mt-6 w-full" size="lg">
                    <Link href={t.href}>{t.cta}</Link>
                  </Button>
                  <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-tight">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions from agencies and MSPs."
          />
          <div className="mt-10 space-y-3">
            {[
              {
                q: "Do you replace our VMS or ATS?",
                a: "No. Orbit lives alongside your existing systems. We integrate at the offer-to-start layer where mobility belongs.",
              },
              {
                q: "Is the AI optional?",
                a: "Yes. Configure OPENAI_API_KEY when you're ready, or run on Orbit's curated mock responses during pilot.",
              },
              {
                q: "How is data secured?",
                a: "Orbit is HIPAA-aware with field-level audit logs, RBAC, and SOC 2 aligned controls.",
              },
              {
                q: "Can MSPs see supplier performance?",
                a: "Yes. The MSP role is read-only, scoped to assigned suppliers, with PDF/CSV exports.",
              },
            ].map((row) => (
              <details
                key={row.q}
                className="group rounded-xl border border-orbit-deep/10 bg-white p-5 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-orbit-deep">
                  {row.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{row.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
