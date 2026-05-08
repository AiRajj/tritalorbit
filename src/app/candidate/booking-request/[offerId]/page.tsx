import { BookingRequestForm } from "@/components/booking/booking-request-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CandidateBookingRequestPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const { offerId } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#0B3C5D] to-[#1F2937] p-5 text-white">
          <p className="text-sm text-blue-200">TRITAL Orbit™ Mobility Concierge</p>
          <h1 className="mt-1 text-2xl font-semibold">Booking request</h1>
          <p className="text-sm text-blue-100">Tell us what support you need and concierge will follow up.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Mobility Booking Request</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingRequestForm offerId={offerId} />
        </CardContent>
      </Card>
      </div>
    </main>
  );
}
