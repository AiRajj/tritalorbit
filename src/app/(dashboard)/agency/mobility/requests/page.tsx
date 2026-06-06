import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobilityRequestRow } from "@/components/mobility/request-row";
import { getCallerAgencyIds } from "@/lib/api-auth";
import { listAgencyMobilityRequests } from "@/lib/services/mobility";

export default async function AgencyMobilityRequestsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const allowed: Role[] = [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.SUPER_ADMIN];
  if (!allowed.includes(session.user.role)) {
    redirect("/agency");
  }

  const agencyIds = await getCallerAgencyIds(session.user.id);
  const requests = await listAgencyMobilityRequests(agencyIds.length > 0 ? agencyIds : ["__none__"]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mobility requests</h1>
        <p className="text-sm text-slate-600">Every active candidate mobility need across your agencies.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-sm text-slate-500">No mobility requests yet.</p>
          ) : (
            requests.map((req) => (
              <MobilityRequestRow key={req.id} href={`/agency/mobility/requests/${req.id}`} request={req} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
