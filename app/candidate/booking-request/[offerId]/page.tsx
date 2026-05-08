import Link from "next/link";

import { BookingRequestForm } from "@/components/booking/booking-request-form";
import { Button } from "@/components/ui/button";

export default async function CandidateBookingRequestPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E63946]">Booking request</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Tell concierge what you need</h1>
          </div>
          <Button asChild variant="outline">
            <Link href={`/candidate/offer/${offerId}`}>Back</Link>
          </Button>
        </div>
        <BookingRequestForm offerId={offerId} />
      </div>
    </main>
  );
}
