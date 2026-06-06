import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { withDbFallback } from "@/lib/services/db-fallback";

export default async function AdminMobilityExchangePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== Role.SUPER_ADMIN) redirect("/admin");

  const [openRequests, totalBids, acceptedBids, recentRequests, recentBookings] = await Promise.all([
    withDbFallback(() => prisma.mobilityRequest.count({ where: { status: "OPEN_FOR_BIDS" } }), 0),
    withDbFallback(() => prisma.mobilityBid.count(), 0),
    withDbFallback(() => prisma.mobilityBid.count({ where: { status: "ACCEPTED" } }), 0),
    withDbFallback(
      () =>
        prisma.mobilityRequest.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          include: { candidate: { select: { name: true } }, agency: { select: { name: true } }, _count: { select: { bids: true } } }
        }),
      []
    ),
    withDbFallback(
      () =>
        prisma.mobilityBooking.findMany({
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            vendor: { select: { name: true } },
            candidate: { select: { name: true } },
            agency: { select: { name: true } }
          }
        }),
      []
    )
  ]);

  const winRate = totalBids === 0 ? 0 : Math.round((acceptedBids / totalBids) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mobility Exchange — platform monitor</h1>
        <p className="text-sm text-slate-600">
          Marketplace health across every agency, candidate, and vendor on the platform.
        </p>
      </div>

      <KpiStrip
        items={[
          { label: "Open requests", value: String(openRequests) },
          { label: "Bids submitted", value: String(totalBids) },
          { label: "Bids accepted", value: String(acceptedBids) },
          { label: "Bid acceptance rate", value: `${winRate}%` }
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Newest mobility requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentRequests.length === 0 ? (
              <p className="text-sm text-slate-500">Nothing yet.</p>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} className="rounded-md border border-slate-200 p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">
                        {req.candidate.name} • {req.destinationCity}, {req.destinationState}
                      </p>
                      <p className="text-xs text-slate-500">
                        {req.agency.name} · {req.requestType.replace(/_/g, " ")} · {req._count.bids} bid
                        {req._count.bids === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Badge variant={req.status === "OPEN_FOR_BIDS" ? "default" : "secondary"}>
                      {req.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="text-sm text-slate-500">No bookings yet.</p>
            ) : (
              recentBookings.map((b) => (
                <div key={b.id} className="rounded-md border border-slate-200 p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">
                        {b.candidate.name} • {b.vendor.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {b.agency.name} · ${Number(b.amount).toLocaleString()} · {b.paymentResponsibility.replace(/_/g, " ")}
                      </p>
                    </div>
                    <Badge variant="secondary">{b.bookingStatus.replace(/_/g, " ")}</Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform fee + payout ledger (preview)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Per-booking platform fee is captured on each <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">MobilityBooking</code>{" "}
            row. Full Stripe Connect payout pipeline is wired in module 13 (TRITAL Wallet™) — coming next.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
