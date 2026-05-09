import { auth } from "@/auth";
import { ExternalOfferForm } from "@/components/comparison/external-offer-form";
import { OfferComparisonRunner } from "@/components/comparison/offer-comparison-runner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidateForUser } from "@/lib/services/access";
import { prisma } from "@/lib/prisma";

export default async function CandidateCompareOffersPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const candidate = await getCandidateForUser(session.user.id);
  if (!candidate) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Candidate profile not found</h1>
        <p className="mt-2 text-sm text-slate-600">Connect your candidate record to use Multi-Offer Comparison™.</p>
      </div>
    );
  }

  const [internalOffers, externalOffers, comparisons] = await Promise.all([
    prisma.offer.findMany({
      where: { candidateId: candidate.id },
      include: { assignment: true },
      orderBy: { createdAt: "desc" },
      take: 20
    }),
    prisma.externalOfferDocument.findMany({
      where: { candidateId: candidate.id },
      orderBy: { createdAt: "desc" },
      take: 20
    }),
    prisma.offerComparison.findMany({
      where: { candidateId: candidate.id },
      include: {
        entries: {
          orderBy: { totalValueScore: "desc" }
        },
        insights: {
          orderBy: { rank: "asc" }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 10
    })
  ]);

  const internalOptions = internalOffers.map((offer) => ({
    id: offer.id,
    label: `${offer.assignment.facilityName} • ${offer.assignment.city}, ${offer.assignment.state} • $${Number(offer.weeklyPay).toLocaleString()}/wk`
  }));

  const externalOptions = externalOffers.map((offer) => ({
    id: offer.id,
    label: `${offer.agencyName} • ${offer.locationCity}, ${offer.locationState} • $${Number(offer.weeklyPay).toLocaleString()}/wk`
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Compare My Offers</h1>
        <p className="text-sm text-slate-600">
          Compare internal and competitor offers with AI-normalized value, readiness, and lifestyle scoring.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add competitor/external offer</CardTitle>
        </CardHeader>
        <CardContent>
          <ExternalOfferForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Run Multi-Offer Comparison™</CardTitle>
        </CardHeader>
        <CardContent>
          <OfferComparisonRunner internalOffers={internalOptions} externalOffers={externalOptions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comparison results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comparisons.length === 0 ? (
            <p className="text-sm text-slate-600">No comparisons generated yet.</p>
          ) : (
            comparisons.map((comparison) => (
              <div key={comparison.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{comparison.recommendationTitle ?? "Best Overall Assignment Experience"}</p>
                  <Badge>{comparison.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">{comparison.executiveSummary ?? "AI summary unavailable."}</p>
                <p className="mt-2 text-xs font-medium text-orbit-blue">Top recommendation: {comparison.bestOverallLabel ?? "N/A"}</p>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-slate-500">
                      <tr>
                        <th className="pb-2">Offer</th>
                        <th className="pb-2">Value Score</th>
                        <th className="pb-2">Lifestyle Score</th>
                        <th className="pb-2">COL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.entries.map((entry) => (
                        <tr key={entry.id} className="border-t border-slate-100">
                          <td className="py-2">{entry.label}</td>
                          <td className="py-2">{entry.totalValueScore.toFixed(1)}</td>
                          <td className="py-2">{entry.lifestyleScore.toFixed(1)}</td>
                          <td className="py-2">{entry.costOfLivingIndex.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {comparison.insights.length > 0 ? (
                  <div className="mt-3 space-y-1 text-sm text-slate-700">
                    {comparison.insights.map((insight) => (
                      <p key={insight.id}>• {insight.detail}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
