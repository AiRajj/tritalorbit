import Link from "next/link";
import { Radar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RiskPill } from "@/components/dashboard/risk-pill";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";

export const dynamic = "force-dynamic";
export const metadata = { title: "Risk pipeline" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "RECRUITER", ctx?.agencyId ?? null);
  const scores = agencyId
    ? await prisma.retentionRiskScore.findMany({
        where: { candidate: { agencyId } },
        include: { candidate: true, offer: true },
        orderBy: { score: "desc" },
        distinct: ["candidateId"],
        take: 30,
      })
    : [];

  return (
    <>
      <PageHeader eyebrow="Retention Risk" title="Risk pipeline" description="Highest-risk candidates first. Take the recommended action within the surfaced SLA." />
      <Card>
        <CardContent className="p-0">
          {scores.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Radar} title="No risk scores yet" description="Risk scores generate as candidates progress through the offer-to-start funnel." />
            </div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {scores.map((s) => (
                <li key={s.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-orbit-deep">{s.candidate.firstName} {s.candidate.lastName}</span>
                      <RiskPill level={s.level} score={s.score} />
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {s.offer ? `${s.offer.facilityName} · ${s.offer.city}, ${s.offer.state}` : "No active offer"}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{s.reasoning}</p>
                    <p className="mt-1 text-xs text-orbit-red">Action: {s.suggestedAction}</p>
                  </div>
                  {s.offer && (
                    <Button asChild variant="outline">
                      <Link href={`/agency/offers/${s.offer.id}/preview`}>Open offer</Link>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
