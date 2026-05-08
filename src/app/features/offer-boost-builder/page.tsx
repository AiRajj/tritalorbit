import Link from "next/link";

import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";

export default function OfferBoostBuilderFeaturePage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Offer Boost Builder</h1>
        <p className="mt-4 text-slate-600">
          Design premium clinician offers with compensation intelligence, value-add mobility perks, and AI-crafted
          close messaging for recruiters.
        </p>
        <div className="mt-8">
          <Link href="/agency/offers/create">
            <Button>Open Offer Builder</Button>
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
