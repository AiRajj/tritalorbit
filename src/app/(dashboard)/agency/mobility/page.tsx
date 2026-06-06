import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { Plus, Plane, Home, Car, Hotel } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { MobilityRequestRow } from "@/components/mobility/request-row";
import { getCallerAgencyIds } from "@/lib/api-auth";
import { listAgencyMobilityRequests } from "@/lib/services/mobility";

export default async function AgencyMobilityPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const allowed: Role[] = [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.SUPER_ADMIN];
  if (!allowed.includes(session.user.role)) {
    redirect("/agency");
  }

  const agencyIds = await getCallerAgencyIds(session.user.id);
  const requests = await listAgencyMobilityRequests(agencyIds.length > 0 ? agencyIds : ["__none__"]);

  const openCount = requests.filter((r) => r.status === "OPEN_FOR_BIDS").length;
  const reviewingCount = requests.filter((r) => r.status === "REVIEWING").length;
  const acceptedCount = requests.filter((r) => r.status === "BID_ACCEPTED" || r.status === "COMPLETED").length;
  const totalBids = requests.reduce((sum, r) => sum + r.bidCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mobility Exchange</h1>
          <p className="text-sm text-slate-600">
            Assignment-verified mobility requests across your agencies. Verified vendors compete to win each booking.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/agency/mobility/requests">All requests</Link>
          </Button>
          <Button asChild>
            <Link href="/candidate/mobility-request/create?source=agency">
              <Plus className="h-4 w-4" /> New mobility request
            </Link>
          </Button>
        </div>
      </div>

      <KpiStrip
        items={[
          { label: "Open for bids", value: String(openCount) },
          { label: "Reviewing", value: String(reviewingCount) },
          { label: "Booked / Completed", value: String(acceptedCount) },
          { label: "Total bids received", value: String(totalBids) }
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ModuleSummary icon={Plane} label="Flights" count={requests.filter((r) => r.requestType === "FLIGHT").length} />
        <ModuleSummary icon={Home} label="Housing" count={requests.filter((r) => r.requestType === "HOUSING").length} />
        <ModuleSummary icon={Car} label="Car rentals" count={requests.filter((r) => r.requestType === "CAR_RENTAL").length} />
        <ModuleSummary icon={Hotel} label="Full relocation" count={requests.filter((r) => r.requestType === "FULL_RELOCATION_PACKAGE").length} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most recent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
              <p className="text-sm font-medium text-slate-900">No mobility requests yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Create one from a candidate&apos;s offer or use the button above.
              </p>
            </div>
          ) : (
            requests
              .slice(0, 8)
              .map((req) => (
                <MobilityRequestRow key={req.id} href={`/agency/mobility/requests/${req.id}`} request={req} />
              ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ModuleSummary({ icon: Icon, label, count }: { icon: typeof Plane; label: string; count: number }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-orbit-blue/10 p-2 text-orbit-blue">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{label}</p>
            <p className="text-xs text-slate-500">Active requests</p>
          </div>
        </div>
        <p className="text-2xl font-semibold text-slate-900">{count}</p>
      </CardContent>
    </Card>
  );
}
