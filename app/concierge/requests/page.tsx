import Link from "next/link";

import { BookingRequestsTable, ConciergeBoard } from "@/components/dashboard/operational-pages";
import { Button } from "@/components/ui/button";

export default function ConciergeRequestsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E63946]">Concierge requests</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Mobility task board</h1>
          </div>
          <Button asChild variant="outline"><Link href="/concierge">Back</Link></Button>
        </div>
        <ConciergeBoard />
        <BookingRequestsTable concierge />
      </div>
    </main>
  );
}
