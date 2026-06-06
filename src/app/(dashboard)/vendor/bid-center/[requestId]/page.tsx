import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Role } from "@prisma/client";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitBidForm } from "@/components/mobility/submit-bid-form";
import { BidCard } from "@/components/mobility/bid-card";
import { getMobilityRequestDetail, toBidDetail } from "@/lib/services/mobility";

export default async function VendorRequestDetailPage({
  params
}: {
  params: Promise<{ requestId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const allowed: Role[] = [Role.VENDOR_LANDLORD, Role.SUPER_ADMIN];
  if (!allowed.includes(session.user.role)) redirect("/vendor/dashboard");

  const { requestId } = await params;
  const req = await getMobilityRequestDetail(requestId);
  if (!req) notFound();

  const otherBids = req.bids.slice(0, 6).map((b) =>
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
          href="/vendor/bid-center"
          className="inline-flex items-center gap-1 text-sm text-orbit-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Bid Center
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          {req.destinationCity}, {req.destinationState}
        </h1>
        <p className="text-sm text-slate-600">
          {req.requestType.replace(/_/g, " ")} request • urgency {req.urgencyLevel}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>{req.status.replace(/_/g, " ")}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-slate-700">
          <p><span className="font-medium">Facility:</span> {req.facilityName ?? "—"}</p>
          <p><span className="font-medium">Move date:</span> {req.moveDate ? req.moveDate.toLocaleDateString() : "Flexible"}</p>
          <p>
            <span className="font-medium">Budget ceiling:</span>{" "}
            {req.budgetMax ? `$${Number(req.budgetMax).toLocaleString()}` : "Open"}
          </p>
          <p>
            <span className="font-medium">Preferences:</span>{" "}
            {[
              req.housingNeeded ? "Housing" : null,
              req.carNeeded ? "Car" : null,
              req.hotelNeeded ? "Hotel" : null,
              req.petFriendly ? "Pet-friendly" : null,
              req.baggageNeeded ? `${req.checkedBags || 1} bag${(req.checkedBags || 1) === 1 ? "" : "s"}` : null
            ]
              .filter(Boolean)
              .join(" • ") || "—"}
          </p>
          {req.notes ? (
            <p className="rounded-md bg-slate-50 p-2 text-xs text-slate-700">{req.notes}</p>
          ) : null}
        </CardContent>
      </Card>

      <SubmitBidForm
        mobilityRequestId={req.id}
        bidType={req.requestType}
        destinationLabel={`${req.destinationCity}, ${req.destinationState}`}
      />

      {otherBids.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Recent competing bids</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherBids.map((b) => (
              <BidCard key={b.id} bid={b} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
