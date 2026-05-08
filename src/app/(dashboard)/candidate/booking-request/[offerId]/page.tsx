import { BookingRequestForm } from "@/components/candidate/booking-request-form";

export default async function CandidateBookingRequestPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Booking Request</h1>
      <p className="text-sm text-slate-600">Tell our concierge team what you need to launch your assignment.</p>
      <BookingRequestForm offerId={offerId} />
    </div>
  );
}
