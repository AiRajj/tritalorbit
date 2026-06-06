import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BidCard } from "@/components/mobility/bid-card";
import { AcceptBidButton } from "@/components/mobility/accept-bid-button";
import { prisma } from "@/lib/prisma";
import { getMobilityRequestDetail, toBidDetail } from "@/lib/services/mobility";
import { withDbFallback } from "@/lib/services/db-fallback";

export default async function CandidateMobilityRequestDetail({
  params
}: {
  params: Promise<{ requestId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== Role.CANDIDATE) redirect("/candidate");

  const { requestId } = await params;
  const req = await getMobilityRequestDetail(requestId);
  if (!req) notFound();

  const candidate = await withDbFallback(
    () => prisma.candidate.findFirst({ where: { userId: session.user.id }, select: { id: true } }),
    null
  );
  if (!candidate || candidate.id !== req.candidateId) redirect("/candidate/travel-marketplace");

  const bids = req.bids.map((b) =>
    toBidDetail({
      id: b.id,
      vendorName: b.vendorName,
      packageName: b.packageName,
      totalPrice: b.totalPrice,
      estimatedSavings: b.estimatedSavings,
      status: b.status,
      bidType: b.bidType,
      conciergeRecommended: b.conciergeRecommended,
      bidScore: b.bidScore,
      cancellationPolicy: b.cancellationPolicy,
      refundability: b.refundability,
      housingDistanceToFacility: b.housingDistanceToFacility,
      airlineName: b.airlineName,
      flightNumber: b.flightNumber,
      departureTime: b.departureTime,
      arrivalTime: b.arrivalTime,
      stops: b.stops,
      hotelName: b.hotelName,
      nightlyRate: b.nightlyRate,
      carRentalCompany: b.carRentalCompany,
      carClass: b.carClass,
      housingAddress: b.housingAddress,
      housingMonthlyCost: b.housingMonthlyCost,
      createdAt: b.createdAt
    })
  );

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/candidate/travel-marketplace"
          className="inline-flex items-center gap-1 text-sm text-orbit-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {req.destinationCity}, {req.destinationState}
        </h1>
        <p className="text-sm text-slate-600">
          {req.requestType.replace(/_/g, " ")} request • {req.bids.length} vendor bid{req.bids.length === 1 ? "" : "s"}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>{req.status.replace(/_/g, " ")}</Badge>
          <Badge variant="secondary">{req.urgencyLevel}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-slate-700">
          <p><span className="font-medium">Facility:</span> {req.facilityName ?? "—"}</p>
          <p><span className="font-medium">Move date:</span> {req.moveDate ? req.moveDate.toLocaleDateString() : "Not set"}</p>
          <p>
            <span className="font-medium">Budget:</span>{" "}
            {req.budgetMax ? `Up to $${Number(req.budgetMax).toLocaleString()}` : "Flexible"}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Vendor bids</h2>
        <p className="text-sm text-slate-600">Pick the one that fits your move best. Concierge pick is highlighted.</p>
      </div>

      {bids.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-slate-500">
            No bids yet. Verified vendors usually respond within 2 hours.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bids.map((bid) => (
            <BidCard
              key={bid.id}
              bid={bid}
              actions={
                bid.status === "SUBMITTED" || bid.status === "SHORTLISTED" ? (
                  <AcceptBidButton bidId={bid.id} paymentResponsibility="CANDIDATE" label="Accept this bid" />
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
