import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { candidateLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function CandidateDashboardPage() {
  const session = await requireRole([Role.CANDIDATE, Role.RECRUITER, Role.AGENCY_OWNER]);

  const offers = await prisma.offer
    .findMany({ where: { candidate: { userId: session.user.id } }, include: { assignment: true }, take: 5 })
    .catch(() => []);

  return (
    <DashboardShell
      title="Candidate Assignment Hub"
      links={candidateLinks}
      user={{ name: session.user.name ?? "Candidate", email: session.user.email ?? "" }}
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Candidate Dashboard</h1>
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.assignment.facilityName}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              <p>Status: {offer.status}</p>
              <p>Location: {offer.assignment.city}, {offer.assignment.state}</p>
              <a className="mt-2 inline-block text-[#0B3C5D] hover:underline" href={`/candidate/offer/${offer.shareableToken}`}>
                Open assignment offer
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
