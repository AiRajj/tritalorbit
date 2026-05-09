import { auth } from "@/auth";
import { TravelRequestForm } from "@/components/exchange/travel-request-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidateForUser } from "@/lib/services/access";
import { getCandidateTravelRequests } from "@/lib/services/mobility-exchange";
import { prisma } from "@/lib/prisma";

export default async function CandidateTravelMarketplacePage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const candidate = await getCandidateForUser(session.user.id);
  if (!candidate) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Candidate profile not found</h1>
        <p className="mt-2 text-sm text-slate-600">Link this user to a candidate profile to access Live Mobility Exchange™.</p>
      </div>
    );
  }

  const [assignments, requests] = await Promise.all([
    prisma.assignment.findMany({
      where: { candidateId: candidate.id },
      select: {
        id: true,
        facilityName: true,
        city: true,
        state: true
      },
      orderBy: { startDate: "asc" }
    }),
    getCandidateTravelRequests(candidate.id)
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live Mobility Exchange™</h1>
        <p className="text-sm text-slate-600">
          Publish assignment-verified travel needs and compare competing OTA bids in one trusted workflow.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create travel marketplace request</CardTitle>
        </CardHeader>
        <CardContent>
          <TravelRequestForm assignments={assignments} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My travel bid requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-sm text-slate-600">No requests yet. Create your first live exchange request above.</p>
          ) : (
            requests.map((request) => {
              const hoursLeft = Math.max(
                0,
                Math.round((new Date(request.bidExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60))
              );
              return (
                <div key={request.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">
                      {request.assignment.facilityName} — {request.assignment.city}, {request.assignment.state}
                    </p>
                    <Badge variant={request.status === "BOOKED" ? "default" : "secondary"}>{request.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Preferred Airport: {request.preferredAirport} • Bids expire in ~{hoursLeft}h
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
