import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Car,
  CheckCircle2,
  Compass,
  Headphones,
  Home,
  MapPin,
  Phone,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { OrbitWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CandidateHubActions } from "@/components/candidate/hub-actions";
import { CandidateTrackOnView } from "@/components/candidate/track-on-view";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const offer = await prisma.offer.findUnique({
    where: { publicToken: token },
    include: {
      candidate: true,
      recruiter: { select: { name: true, email: true, phone: true } },
      agency: { select: { name: true } },
    },
  });
  if (!offer) notFound();

  const housingOptions = await prisma.housingOption.findMany({
    where: { city: offer.city, state: offer.state, available: true, verification: "APPROVED" },
    take: 3,
    orderBy: [{ rating: "desc" }, { distanceMiles: "asc" }],
  });

  const isResponded = offer.status === "ACCEPTED" || offer.status === "DECLINED" || offer.status === "WITHDRAWN" || offer.status === "EXPIRED";

  return (
    <div className="min-h-screen bg-orbit-mist">
      <CandidateTrackOnView token={token} />

      <header className="bg-orbit-hero py-6 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5">
          <OrbitWordmark size="sm" dark />
          <Badge variant="inverse">Powered by TRITAL Orbit™</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-32 pt-6 md:px-6">
        <div className="rounded-3xl bg-white shadow-elevate ring-1 ring-orbit-deep/10">
          <div className="rounded-t-3xl bg-orbit-hero p-6 text-white md:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-orbit-red" />
              Personalized assignment hub
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              Hi {offer.candidate.firstName}, your assignment is ready.
            </h1>
            <p className="mt-2 text-white/75">
              {offer.facilityName} · {offer.city}, {offer.state}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
              <Stat label="Weekly Pay" value={offer.weeklyPay ? formatCurrency(Number(offer.weeklyPay)) : "—"} />
              <Stat label="Duration" value={offer.durationWeeks ? `${offer.durationWeeks} wks` : "—"} />
              <Stat
                label="Total Value"
                value={offer.totalContractValue ? formatCurrency(Number(offer.totalContractValue)) : "—"}
              />
              <Stat label="Start Date" value={offer.startDate ? formatDate(offer.startDate) : "TBD"} />
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            {offer.candidateValueStmt && (
              <Card className="border-orbit-red/20 bg-orbit-red/[0.04]">
                <CardContent className="p-5 text-sm leading-relaxed text-slate-800">
                  {offer.candidateValueStmt}
                </CardContent>
              </Card>
            )}

            {offer.housingAssist && (
              <Section icon={Home} title="Housing — handled.">
                <p className="text-sm text-slate-600">
                  We've pre-vetted housing near {offer.facilityName}. Pick a favorite or let our concierge place you.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {housingOptions.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-orbit-deep/15 bg-white p-4 text-sm text-slate-500">
                      Concierge will share matched options within 1 business day.
                    </div>
                  ) : (
                    housingOptions.map((h) => (
                      <div key={h.id} className="rounded-xl border border-orbit-deep/10 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-orbit-deep">{h.title}</div>
                          {h.rating && <Badge variant="muted">★ {h.rating}</Badge>}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" /> {h.city}, {h.state}
                          {h.distanceMiles && <span> · {h.distanceMiles} mi from facility</span>}
                        </div>
                        <div className="mt-3 text-sm font-semibold text-orbit-deep">
                          {h.monthlyCost ? `${formatCurrency(Number(h.monthlyCost))}/mo` : "Pricing on request"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Section>
            )}

            {offer.flightSupport && (
              <Section icon={PlaneTakeoff} title="Travel — booked end-to-end.">
                <p className="text-sm text-slate-600">
                  Flight + ground transportation orchestrated by our concierge. We aim to land you 24h before your shift.
                </p>
              </Section>
            )}

            {offer.carRental && (
              <Section icon={Car} title="Car rental — stipend-aligned.">
                <p className="text-sm text-slate-600">
                  Weekly rate locked at the airport, with optional facility return.
                </p>
              </Section>
            )}

            {offer.firstWeekReadiness && (
              <Section icon={Calendar} title="Day-1 readiness call.">
                <p className="text-sm text-slate-600">
                  72 hours before start, your concierge runs a 15-minute readiness call: orientation, badge, parking, and the realistic stuff.
                </p>
              </Section>
            )}

            <Section icon={CheckCircle2} title="Move checklist">
              <ul className="grid gap-2 md:grid-cols-2">
                {[
                  "Confirm housing option",
                  "Confirm travel + arrival window",
                  "Submit license + credentials",
                  "Schedule Day-1 orientation",
                  "Set up direct deposit",
                  "Review weekly pay package",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 rounded-lg border border-orbit-deep/10 bg-white p-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    {line}
                  </li>
                ))}
              </ul>
            </Section>

            <Card className="border-orbit-deep/15 bg-orbit-deep/[0.04]">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orbit-deep">
                  <ShieldCheck className="h-4 w-4 text-orbit-red" /> Your support team
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Recruiter</div>
                    <div className="mt-0.5 text-sm font-semibold text-orbit-deep">
                      {offer.recruiter?.name || "Your TRITAL Orbit recruiter"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {offer.recruiter?.email || "info@tritalcare.com"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">Mobility concierge</div>
                    <div className="mt-0.5 text-sm font-semibold text-orbit-deep">+1 (832) 303-6622</div>
                    <div className="text-xs text-slate-500">Mon–Sat · reply in &lt; 1 business hour</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CandidateHubActions
              token={token}
              offerId={offer.id}
              isResponded={isResponded}
              alreadyAccepted={offer.status === "ACCEPTED"}
            />

            <p className="pt-4 text-center text-xs text-slate-400">
              You're viewing this securely via TRITAL Orbit™ · Powered by TRITAL Care®
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
      <div className="text-[0.65rem] font-medium uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 text-sm font-semibold text-orbit-deep">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orbit-deep/5 text-orbit-deep">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
