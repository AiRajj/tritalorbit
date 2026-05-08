import { notFound } from "next/navigation";
import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { OfferPreviewActions } from "@/components/offers/offer-preview-actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { getOfferById } from "@/lib/dashboard-data";
import { agencyLinks } from "@/lib/navigation";
import { formatCurrency } from "@/lib/utils";

export default async function OfferPreviewPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER]);
  const { offerId } = await params;
  const offer = await getOfferById(offerId);

  if (!offer) {
    notFound();
  }

  const latestRisk = offer.retentionRiskScores[0];

  return (
    <DashboardShell
      title="Offer Preview"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Offer Preview</h1>
          <p className="text-sm text-slate-500">Candidate-facing package with AI close strategy.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{offer.candidate.fullName}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Weekly Pay</p>
              <p className="text-xl font-semibold">{formatCurrency(offer.weeklyPay)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Assignment Value</p>
              <p className="text-xl font-semibold">{formatCurrency(offer.estimatedContractValue)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Assignment Location</p>
              <p className="font-medium">{offer.assignment.city}, {offer.assignment.state}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <Badge>{offer.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Mobility perks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              {offer.perks.filter((perk) => perk.included).map((perk) => (
                <div key={perk.id} className="rounded-lg border border-slate-200 p-2">
                  <p className="font-medium text-slate-900">{perk.title}</p>
                  <p>{perk.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Close Strategy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              {offer.aiCloseStrategy ??
                "Lead with confidence around relocation support and timeline certainty. Confirm first-week readiness needs and immediately solve for housing friction."}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Candidate Confidence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-[#0B3C5D]">{offer.confidenceScore}%</p>
              {latestRisk ? (
                <p className="mt-2 text-sm text-slate-600">
                  Latest risk score: {latestRisk.score} ({latestRisk.label})
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-600">No risk model run yet for this offer.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <OfferPreviewActions offerId={offer.id} token={offer.shareableToken} />
      </div>
    </DashboardShell>
  );
}
