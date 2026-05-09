import { auth } from "@/auth";
import { TravelBidForm } from "@/components/exchange/travel-bid-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVendorForUser } from "@/lib/services/access";
import { getVendorBidRequests } from "@/lib/services/mobility-exchange";

export default async function VendorTravelAgencyPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const vendor = await getVendorForUser(session.user.id);
  if (!vendor) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Vendor profile not found</h1>
        <p className="mt-2 text-sm text-slate-600">Create a vendor profile to participate in Live Mobility Exchange™ bidding.</p>
      </div>
    );
  }

  const data = await getVendorBidRequests(vendor.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Travel Agency Exchange Console</h1>
        <p className="text-sm text-slate-600">
          Submit competitive travel package bids against verified healthcare assignment requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open assignment-verified bid requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.openRequests.length === 0 ? (
            <p className="text-sm text-slate-600">No open requests currently available.</p>
          ) : (
            data.openRequests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{request.assignment.facilityName}</p>
                    <p className="text-sm text-slate-600">
                      {request.assignment.city}, {request.assignment.state} • Candidate: {request.candidate.name}
                    </p>
                  </div>
                  <Badge variant="secondary">{request.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Preferred Airport: {request.preferredAirport} • Sponsored Credit: $
                  {Number(request.agencyTravelCredit).toLocaleString()}
                </p>
                <div className="mt-3">
                  <TravelBidForm requestId={request.id} />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My submitted bids</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.submittedBids.length === 0 ? (
            <p className="text-sm text-slate-600">No bids submitted yet.</p>
          ) : (
            data.submittedBids.map((bid) => (
              <div key={bid.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">
                    {bid.request.assignment.facilityName} • {bid.request.assignment.city}, {bid.request.assignment.state}
                  </p>
                  <Badge variant={bid.status === "SELECTED" ? "default" : "secondary"}>{bid.status}</Badge>
                </div>
                <p className="mt-1 text-slate-600">
                  {bid.airline} • {bid.flightType} • ${Number(bid.totalPrice).toLocaleString()} • {bid.packageType}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
