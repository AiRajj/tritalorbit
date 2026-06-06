import Link from "next/link";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { MobilityRequestRow } from "@/components/mobility/request-row";
import { listOpenMobilityRequestsForVendor } from "@/lib/services/mobility";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";

export default async function VendorBidCenterPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const allowed: Role[] = [Role.VENDOR_LANDLORD, Role.SUPER_ADMIN];
  if (!allowed.includes(session.user.role)) redirect("/vendor/dashboard");

  const [requests, myBidsCount, wonBidsCount] = await Promise.all([
    listOpenMobilityRequestsForVendor(),
    withDbFallback(
      () =>
        prisma.mobilityBid.count({
          where: session.user.role === Role.SUPER_ADMIN ? {} : { vendor: { ownerId: session.user.id } }
        }),
      0
    ),
    withDbFallback(
      () =>
        prisma.mobilityBid.count({
          where: {
            status: "ACCEPTED",
            ...(session.user.role === Role.SUPER_ADMIN ? {} : { vendor: { ownerId: session.user.id } })
          }
        }),
      0
    )
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bid Center</h1>
        <p className="text-sm text-slate-600">
          Verified, assignment-backed mobility demand. Every request is tied to a real healthcare placement.
        </p>
      </div>

      <KpiStrip
        items={[
          { label: "Open opportunities", value: String(requests.length) },
          { label: "Your bids submitted", value: String(myBidsCount) },
          { label: "Bookings won", value: String(wonBidsCount) },
          { label: "Win rate", value: myBidsCount === 0 ? "—" : `${Math.round((wonBidsCount / myBidsCount) * 100)}%` }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Open requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
              No open opportunities right now. We notify you when new assignment-backed demand goes live.
            </div>
          ) : (
            requests.map((req) => (
              <MobilityRequestRow key={req.id} href={`/vendor/bid-center/${req.id}`} request={req} />
            ))
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-slate-500">
        Need to update your vendor profile or payouts?{" "}
        <Link href="/vendor/dashboard" className="text-orbit-blue hover:underline">
          Go to vendor dashboard
        </Link>
        .
      </p>
    </div>
  );
}
