import Link from "next/link";
import { redirect } from "next/navigation";
import { Plane, Plus } from "lucide-react";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { MobilityRequestRow } from "@/components/mobility/request-row";
import { prisma } from "@/lib/prisma";
import { listCandidateMobilityRequests } from "@/lib/services/mobility";
import { withDbFallback } from "@/lib/services/db-fallback";

export default async function CandidateTravelMarketplacePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== Role.CANDIDATE) redirect("/candidate");

  const candidate = await withDbFallback(
    () => prisma.candidate.findFirst({ where: { userId: session.user.id }, select: { id: true } }),
    null
  );

  const requests = candidate ? await listCandidateMobilityRequests(candidate.id) : [];
  const open = requests.filter((r) => r.status === "OPEN_FOR_BIDS").length;
  const reviewing = requests.filter((r) => r.status === "REVIEWING").length;
  const accepted = requests.filter((r) => r.status === "BID_ACCEPTED" || r.status === "COMPLETED").length;
  const totalBids = requests.reduce((sum, r) => sum + r.bidCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Travel marketplace</h1>
          <p className="text-sm text-slate-600">
            Verified travel agencies, housing providers, car rental, and hotel partners competing for your assignment moves.
          </p>
        </div>
        <Button asChild>
          <Link href="/candidate/mobility-request/create">
            <Plus className="h-4 w-4" /> New mobility request
          </Link>
        </Button>
      </div>

      <KpiStrip
        items={[
          { label: "Open for bids", value: String(open) },
          { label: "Under review", value: String(reviewing) },
          { label: "Booked", value: String(accepted) },
          { label: "Total bids received", value: String(totalBids) }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-orbit-blue" /> Your active requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
              <p className="text-sm font-medium text-slate-900">No active requests yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Tell us what you need and verified vendors will compete on price and quality.
              </p>
              <Button asChild className="mt-4">
                <Link href="/candidate/mobility-request/create">Create your first request</Link>
              </Button>
            </div>
          ) : (
            requests.map((req) => (
              <MobilityRequestRow key={req.id} href={`/candidate/mobility-request/${req.id}`} request={req} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
