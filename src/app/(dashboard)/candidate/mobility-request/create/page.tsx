import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { CreateMobilityRequestForm } from "@/components/mobility/create-request-form";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";

export default async function CandidateCreateMobilityRequestPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== Role.CANDIDATE) redirect("/candidate");

  const candidate = await withDbFallback(
    () =>
      prisma.candidate.findFirst({
        where: { userId: session.user.id },
        include: {
          assignments: {
            orderBy: { startDate: "asc" },
            take: 1
          }
        }
      }),
    null
  );

  if (!candidate) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Set up your candidate profile</h1>
        <Card>
          <CardContent className="p-8 text-sm text-slate-600">
            Your recruiter will activate your candidate profile shortly. Once it&apos;s live, you can request
            verified mobility support here.
          </CardContent>
        </Card>
      </div>
    );
  }

  const assignment = candidate.assignments[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">New mobility request</h1>
        <p className="text-sm text-slate-600">
          Verified travel, housing, car rental, and relocation partners will compete to win your booking.
        </p>
      </div>
      <CreateMobilityRequestForm
        agencyId={candidate.agencyId}
        candidateId={candidate.id}
        assignmentId={assignment?.id}
        defaultDestinationCity={assignment?.city}
        defaultDestinationState={assignment?.state}
        defaultFacilityName={assignment?.facilityName}
        durationWeeks={assignment?.durationWeeks}
        candidateName={candidate.name}
      />
    </div>
  );
}
