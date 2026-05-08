import Link from "next/link";

import { PublicPageShell } from "@/components/marketing/public-page-shell";
import { Button } from "@/components/ui/button";

export default function RetentionRiskFeaturePage() {
  return (
    <PublicPageShell>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Retention Risk AI</h1>
        <p className="mt-4 text-slate-600">
          Surface backout risk early with model-backed reasoning and actionable recruiter messaging.
        </p>
        <div className="mt-8">
          <Link href="/agency">
            <Button>View Risk in Agency Dashboard</Button>
          </Link>
        </div>
      </section>
    </PublicPageShell>
  );
}
