import Link from "next/link";
import { BrainCircuit, PlusCircle } from "lucide-react";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { ActiveOffersTable } from "@/components/offers/active-offers-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getActiveOffers, getAgencyOverview, getAgencyRecentActivity, getHighRiskCandidates } from "@/lib/services/dashboard-data";

export default async function AgencyDashboardPage() {
  const [overview, offers, recentActivity, highRisk] = await Promise.all([
    getAgencyOverview(),
    getActiveOffers(),
    getAgencyRecentActivity(),
    getHighRiskCandidates()
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agency Dashboard</h1>
          <p className="text-sm text-slate-600">Offer-to-start intelligence across acceptance, readiness, and retention.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/agency/travel-support">Travel Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/agency/rewards">Rewards Ops</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/agency/wallet">Agency Wallet</Link>
          </Button>
          <Button asChild>
            <Link href="/agency/offers/create">
              <PlusCircle className="h-4 w-4" /> Create Offer
            </Link>
          </Button>
        </div>
      </div>

      <KpiStrip
        items={[
          { label: "Offers Sent", value: String(overview.offersSent) },
          { label: "Accepted Offers", value: String(overview.acceptedOffers) },
          { label: "Pending Offers", value: String(overview.pendingOffers) },
          { label: "Backout Risk", value: `${overview.backoutRisk}` },
          { label: "Booking Requests", value: String(overview.bookingRequests) },
          { label: "Assignment Ready %", value: `${overview.assignmentReady}%` }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Active offers</CardTitle>
        </CardHeader>
        <CardContent>
          <ActiveOffersTable offers={offers} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Candidates in negotiation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {offers
              .filter((offer) => ["SENT", "VIEWED"].includes(offer.status))
              .slice(0, 5)
              .map((offer) => (
                <div key={offer.id} className="flex items-center justify-between rounded-md border border-slate-200 p-2">
                  <span>{offer.candidate}</span>
                  <Badge variant="secondary">{offer.status}</Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>High-risk candidates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {highRisk.map((item) => (
              <div key={item.id} className="rounded-md border border-slate-200 p-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{item.candidate}</p>
                  <Badge variant="destructive">{item.score}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.suggestedAction}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-orbit-blue" /> AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>• Lead with mobility confidence in the first outreach call.</p>
            <p>• Trigger concierge assist for candidates with unresolved housing 7 days before start.</p>
            <p>• Use SMS follow-up for offers viewed but not accepted within 12 hours.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {recentActivity.map((item) => (
            <p key={item.id} className="rounded-md border border-slate-200 p-2 text-slate-700">
              <span className="font-medium">{item.actor}</span> • {item.action} • {item.candidate}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
