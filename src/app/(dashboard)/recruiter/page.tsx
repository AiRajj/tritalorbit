import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getActiveOffers, getHighRiskCandidates } from "@/lib/services/dashboard-data";

export default async function RecruiterDashboardPage() {
  const [offers, risk] = await Promise.all([getActiveOffers(), getHighRiskCandidates()]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruiter Command View</h1>
          <p className="text-sm text-slate-600">Prioritize candidate closes with AI-enhanced workflow signals.</p>
        </div>
        <Button asChild>
          <Link href="/agency/offers/create">Create Offer</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Offers in motion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {offers.map((offer) => (
            <p key={offer.id}>• {offer.candidate} — {offer.status} — ${offer.weeklyPay}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>High-risk outreach queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {risk.map((item) => (
            <div key={item.id} className="rounded-md border border-slate-200 p-2">
              <p className="font-medium">{item.candidate}</p>
              <p className="text-xs text-slate-500">{item.suggestedAction}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
