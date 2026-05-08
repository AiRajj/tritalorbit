import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  Compass,
  Copy,
  CreditCard,
  Download,
  Edit3,
  Gift,
  Home,
  PlaneTakeoff,
  Send,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OfferPreviewActions } from "@/components/offers/offer-preview-actions";

export const dynamic = "force-dynamic";

const PERKS = [
  { key: "flightSupport", label: "Flight support", icon: PlaneTakeoff },
  { key: "housingAssist", label: "Housing assistance", icon: Home },
  { key: "carRental", label: "Car rental", icon: Car },
  { key: "relocationConcierge", label: "Relocation concierge", icon: Compass },
  { key: "firstWeekReadiness", label: "First-week readiness", icon: CheckCircle2 },
  { key: "emergencyHousing", label: "Emergency housing", icon: ShieldAlert },
  { key: "loyaltyRewards", label: "Loyalty rewards", icon: Gift },
] as const;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return null;
  const { id } = await params;
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: {
      candidate: true,
      recruiter: { select: { name: true, email: true } },
      agency: { select: { name: true } },
    },
  });
  if (!offer) notFound();

  const portalPath = `/candidate/offer/${offer.publicToken}`;
  const enabledPerks = PERKS.filter((p) => offer[p.key]);

  return (
    <>
      <PageHeader
        eyebrow="Offer Preview"
        title={`${offer.candidate.firstName} ${offer.candidate.lastName} · ${offer.facilityName}`}
        description={`${offer.city}, ${offer.state} · ${offer.specialty || offer.candidate.role || "Clinical"}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link href={`/agency/offers/${offer.id}/preview?edit=1`}>
                <Edit3 className="h-4 w-4" /> Edit
              </Link>
            </Button>
            <OfferPreviewActions offerId={offer.id} portalPath={portalPath} />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-hidden bg-orbit-hero p-8 text-white">
              <div aria-hidden className="absolute inset-0 bg-orbit-grid opacity-[0.08] [background-size:48px_48px]" />
              <div className="relative flex items-center justify-between">
                <Badge variant="inverse">Boosted offer · Powered by TRITAL Orbit™</Badge>
                <StatusPill
                  status={offer.status}
                  tone={
                    offer.status === "ACCEPTED"
                      ? "success"
                      : offer.status === "DECLINED" || offer.status === "WITHDRAWN"
                      ? "destructive"
                      : "default"
                  }
                />
              </div>
              <h2 className="relative mt-5 text-3xl font-semibold tracking-tight">
                {offer.facilityName} · {offer.specialty || offer.candidate.role || "Assignment"}
              </h2>
              <p className="relative mt-2 text-white/75">
                {offer.city}, {offer.state} · {offer.durationWeeks ? `${offer.durationWeeks}-week assignment` : "Multi-week assignment"}
              </p>
              <div className="relative mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <SummaryStat label="Weekly Pay" value={offer.weeklyPay ? formatCurrency(Number(offer.weeklyPay)) : "—"} />
                <SummaryStat
                  label="Total Value"
                  value={offer.totalContractValue ? formatCurrency(Number(offer.totalContractValue)) : "—"}
                />
                <SummaryStat label="Start Date" value={offer.startDate ? formatDate(offer.startDate) : "—"} />
                <SummaryStat label="Confidence" value={offer.confidenceScore ? `${offer.confidenceScore}/100` : "—"} accent />
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <Block icon={Building2} title="Assignment">
                <KV label="Facility" value={offer.facilityName} />
                <KV label="Location" value={`${offer.city}, ${offer.state}`} />
                <KV label="Shift" value={offer.shift ?? "—"} />
                <KV label="Duration" value={offer.durationWeeks ? `${offer.durationWeeks} weeks` : "—"} />
                <KV label="MSP / Client" value={offer.mspClient ?? "—"} />
              </Block>
              <Block icon={CreditCard} title="Compensation">
                <KV label="Weekly pay" value={offer.weeklyPay ? formatCurrency(Number(offer.weeklyPay)) : "—"} />
                <KV label="Taxable / hr" value={offer.taxableRate ? formatCurrency(Number(offer.taxableRate)) : "—"} />
                <KV label="Stipend / wk" value={offer.stipend ? formatCurrency(Number(offer.stipend)) : "—"} />
                <KV
                  label="Total contract"
                  value={offer.totalContractValue ? formatCurrency(Number(offer.totalContractValue)) : "—"}
                />
              </Block>
            </div>

            <div className="border-t border-orbit-deep/10 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Mobility perks included</h3>
              {enabledPerks.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">
                  No mobility perks selected. Edit this offer to add Orbit support and lift acceptance.
                </p>
              ) : (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {enabledPerks.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.key} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 px-4 py-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-emerald-800">{p.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {offer.candidateValueStmt && (
              <div className="border-t border-orbit-deep/10 bg-orbit-mist p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orbit-red" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">
                    Candidate-facing value statement
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{offer.candidateValueStmt}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orbit-deep">
                <Stethoscope className="h-4 w-4 text-orbit-red" /> Candidate
              </h3>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="font-semibold text-orbit-deep">
                  {offer.candidate.firstName} {offer.candidate.lastName}
                </div>
                <div className="text-slate-600">{offer.candidate.email}</div>
                <div className="text-slate-600">{offer.candidate.phone || "No phone on file"}</div>
                <div className="text-slate-500">
                  {offer.candidate.specialty} · {offer.candidate.licenseState || "License unknown"}
                </div>
              </div>
            </CardContent>
          </Card>

          {offer.smsPitch && (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">SMS pitch</h3>
                <p className="mt-3 rounded-lg bg-orbit-deep/[0.04] p-3 text-sm leading-relaxed text-slate-700">
                  {offer.smsPitch}
                </p>
              </CardContent>
            </Card>
          )}

          {offer.closeStrategy && (
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orbit-red" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">AI close strategy</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{offer.closeStrategy}</p>
              </CardContent>
            </Card>
          )}

          {offer.recruiterTalkingPoints && (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Recruiter talking points</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {offer.recruiterTalkingPoints.split("\n").map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-orbit-red" />
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {offer.emailPitch && (
            <Card>
              <CardContent className="p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Email pitch</h3>
                <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-orbit-deep/[0.04] p-3 font-sans text-sm leading-relaxed text-slate-700">
                  {offer.emailPitch}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function SummaryStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <div className="text-[0.65rem] font-medium uppercase tracking-wider text-white/50">{label}</div>
      <div className={accent ? "mt-1 text-sm font-semibold text-orbit-red" : "mt-1 text-sm font-semibold text-white"}>{value}</div>
    </div>
  );
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orbit-deep">
        <Icon className="h-4 w-4 text-orbit-red" />
        {title}
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-orbit-deep">{value}</span>
    </div>
  );
}
