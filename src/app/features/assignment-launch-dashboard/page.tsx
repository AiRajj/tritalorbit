import Link from "next/link";

import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";

export default function AssignmentLaunchFeaturePage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Assignment Launch Dashboard</h1>
        <p className="mt-4 text-slate-600">
          Track housing, travel, documents, and readiness risks between acceptance and day one.
        </p>
        <div className="mt-8">
          <Link href="/agency/assignment-launch">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
