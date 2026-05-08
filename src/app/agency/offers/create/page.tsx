import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { OfferBuilderForm } from "@/components/offers/offer-builder-form";
import { requireRole } from "@/lib/auth";
import { agencyLinks } from "@/lib/navigation";

export default async function CreateOfferPage() {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER]);

  return (
    <DashboardShell
      title="Offer Boost Builder"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Offer Boost Builder</h1>
        <p className="text-sm text-slate-500">
          Build complete offer packages with AI optimization and mobility perks.
        </p>
      </div>
      <OfferBuilderForm />
    </DashboardShell>
  );
}
