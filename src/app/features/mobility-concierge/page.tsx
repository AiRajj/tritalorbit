import Link from "next/link";

import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";

export default function MobilityConciergeFeaturePage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Mobility Concierge</h1>
        <p className="mt-4 text-slate-600">
          Route booking requests to concierge teams with AI-suggested next actions and verified vendor support.
        </p>
        <div className="mt-8">
          <Link href="/concierge/requests">
            <Button>Open Concierge Board</Button>
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
