import Link from "next/link";

import { OfferBuilder } from "@/components/offers/offer-builder";
import { Button } from "@/components/ui/button";

export default function CreateOfferPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E63946]">Offer Boost Builder</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Create enhanced clinician offer</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/agency">Back to agency dashboard</Link>
          </Button>
        </div>
        <OfferBuilder />
      </div>
    </main>
  );
}
