import Link from "next/link";

import { Marketplace } from "@/components/dashboard/operational-pages";
import { Button } from "@/components/ui/button";

export default function CandidateHousingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E63946]">Candidate housing</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#0B3C5D]">Verified options near Phoenix</h1>
          </div>
          <Button asChild variant="outline"><Link href="/candidate/offer/demo-token">Back</Link></Button>
        </div>
        <Marketplace candidate />
      </div>
    </main>
  );
}
