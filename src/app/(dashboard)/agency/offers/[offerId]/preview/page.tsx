import Link from "next/link";
import { notFound } from "next/navigation";
import { OfferPreviewActions } from "@/components/offers/offer-preview-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getOfferPreview } from "@/lib/services/dashboard-data";

export default async function OfferPreviewPage({ params }: { params: Promise<{ offerId: string }> }) {
  const { offerId } = await params;
  const offer = await getOfferPreview(offerId);

  if (!offer) {
    notFound();
  }

  const latestRisk = offer.retentionRiskScores[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offer Preview</h1>
          <p className="text-sm text-slate-600">Candidate-facing assignment package and close strategy.</p>
        </div>
        <OfferPreviewActions offerId={offer.id} token={offer.token} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Premium offer summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <p><span className="font-medium">Candidate:</span> {offer.candidate.name}</p>
          <p><span className="font-medium">Weekly Pay:</span> ${Number(offer.weeklyPay).toLocaleString()}</p>
          <p><span className="font-medium">Total Assignment Value:</span> ${Number(offer.estimatedContractValue).toLocaleString()}</p>
          <p><span className="font-medium">Location:</span> {offer.assignment.city}, {offer.assignment.state}</p>
          <p><span className="font-medium">Facility:</span> {offer.assignment.facilityName}</p>
          <p><span className="font-medium">Status:</span> <Badge variant="secondary" className="ml-1">{offer.status}</Badge></p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Included mobility perks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-700">
            {offer.perks.filter((perk) => perk.enabled).map((perk) => (
              <p key={perk.id}>• {perk.name}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Housing support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-700">
            {offer.assignment.housingOptions.length ? (
              offer.assignment.housingOptions.map((option) => <p key={option.id}>• {option.title}</p>)
            ) : (
              <p>No published housing options yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Travel and transportation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-700">
            {offer.assignment.travelOptions.map((option) => (
              <p key={option.id}>• {option.providerName} from ${Number(option.estimatedCost)}</p>
            ))}
            {offer.assignment.carRentalOptions.map((option) => (
              <p key={option.id}>• {option.providerName} from ${Number(option.weeklyCost)}/wk</p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI close strategy + confidence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>{offer.closeStrategy ?? "Emphasize certainty in housing and first-week logistics."}</p>
          <p>
            <span className="font-medium">Candidate confidence score:</span>{" "}
            {offer.candidateConfidenceScore ?? 72}
          </p>
          {latestRisk ? (
            <p>
              <span className="font-medium">Risk score:</span> {latestRisk.score} ({latestRisk.label})
            </p>
          ) : null}
          <p>
            <Link href={`/candidate/offer/${offer.token}`} className="text-orbit-blue hover:underline">
              View candidate portal
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
