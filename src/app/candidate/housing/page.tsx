import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { candidateLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function CandidateHousingPage() {
  const session = await requireRole([Role.CANDIDATE, Role.RECRUITER, Role.AGENCY_OWNER]);

  const options = await prisma.housingOption
    .findMany({ where: { verificationStatus: "VERIFIED" }, orderBy: { rating: "desc" }, take: 24 })
    .catch(() => []);

  return (
    <DashboardShell
      title="Housing Marketplace"
      links={candidateLinks}
      user={{ name: session.user.name ?? "Candidate", email: session.user.email ?? "" }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => (
          <Card key={option.id}>
            <CardHeader>
              <CardTitle>{option.propertyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>{option.assignmentCity}, {option.assignmentState}</p>
              <p>Monthly cost: ${option.monthlyCost}</p>
              <p>Distance to facility: {option.distanceToFacility} miles</p>
              <p>Rating: {option.rating.toFixed(1)}</p>
              <Badge variant="success">Verified</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
