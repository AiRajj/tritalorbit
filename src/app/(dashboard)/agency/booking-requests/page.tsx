import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBookingRequests } from "@/lib/services/dashboard-data";

export default async function AgencyBookingRequestsPage() {
  const requests = await getBookingRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Booking Requests</h1>
        <p className="text-sm text-slate-600">Track candidate mobility support requests and concierge progress.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.map((request) => (
            <div key={request.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-slate-900">{request.candidate}</p>
                <Badge variant="secondary">{request.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{request.assignment}</p>
              <p className="mt-1 text-xs text-slate-500">Concierge owner: {request.conciergeOwner}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
