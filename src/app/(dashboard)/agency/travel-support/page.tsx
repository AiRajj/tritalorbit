import { auth } from "@/auth";
import { SelectBidButton } from "@/components/exchange/select-bid-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAgencyIdForUser } from "@/lib/services/access";
import { getAgencyTravelRequests } from "@/lib/services/mobility-exchange";

export default async function AgencyTravelSupportPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const agencyId = await getAgencyIdForUser(session.user.id);
  if (!agencyId) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Agency context not found</h1>
        <p className="mt-2 text-sm text-slate-600">Assign this user to an agency to manage travel support workflows.</p>
      </div>
    );
  }

  const requests = await getAgencyTravelRequests(agencyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Agency Travel Support</h1>
        <p className="text-sm text-slate-600">
          Live Mobility Exchange™ command center for bid comparisons, sponsor credits, and booking protection.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Travel request pipeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-sm text-slate-600">No active travel requests yet.</p>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{request.candidate.name}</p>
                    <p className="text-sm text-slate-600">
                      {request.assignment.facilityName} • {request.assignment.city}, {request.assignment.state}
                    </p>
                  </div>
                  <Badge variant={request.status === "BOOKED" ? "default" : "secondary"}>{request.status}</Badge>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Travel Credit Sponsored: ${Number(request.agencyTravelCredit).toLocaleString()} • Preferred Airport:{" "}
                  {request.preferredAirport}
                </p>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-500">
                      <tr>
                        <th className="pb-2">Vendor</th>
                        <th className="pb-2">Airline</th>
                        <th className="pb-2">Flight</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Package</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.bids.map((bid) => (
                        <tr key={bid.id} className="border-t border-slate-100">
                          <td className="py-2">{bid.vendor.name}</td>
                          <td className="py-2">{bid.airline}</td>
                          <td className="py-2">
                            {bid.flightType} ({bid.stops} stops)
                          </td>
                          <td className="py-2">${Number(bid.totalPrice).toLocaleString()}</td>
                          <td className="py-2">{bid.packageType}</td>
                          <td className="py-2">
                            {request.selectedBidId === bid.id ? (
                              <Badge>Selected</Badge>
                            ) : (
                              <SelectBidButton requestId={request.id} bidId={bid.id} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
