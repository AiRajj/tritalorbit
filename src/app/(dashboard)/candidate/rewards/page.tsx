import { auth } from "@/auth";
import { RewardsRedeemForm } from "@/components/rewards/rewards-redeem-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidateForUser } from "@/lib/services/access";
import { getOrCreateRewardsAccount } from "@/lib/services/rewards";
import { prisma } from "@/lib/prisma";

export default async function CandidateRewardsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const candidate = await getCandidateForUser(session.user.id);
  if (!candidate) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Candidate profile not found</h1>
        <p className="mt-2 text-sm text-slate-600">Link candidate profile to access Orbit Rewards™.</p>
      </div>
    );
  }

  const account = await getOrCreateRewardsAccount(prisma, candidate.id);
  const [events, redemptions] = await Promise.all([
    prisma.rewardEvent.findMany({
      where: { candidateId: candidate.id },
      orderBy: { createdAt: "desc" },
      take: 30
    }),
    prisma.rewardRedemption.findMany({
      where: { candidateId: candidate.id },
      orderBy: { requestedAt: "desc" },
      take: 20
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orbit Rewards™</h1>
        <p className="text-sm text-slate-600">
          Earn points for strong assignment behavior and redeem travel/lifestyle benefits.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Tier</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{account.tier}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Points Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{account.pointsBalance.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lifetime Points</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{account.lifetimePoints.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assignment Streak</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{account.streakAssignments}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redeem Points</CardTitle>
        </CardHeader>
        <CardContent>
          <RewardsRedeemForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reward Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-slate-600">No events yet.</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{event.description}</p>
                  <Badge variant={event.points >= 0 ? "default" : "secondary"}>
                    {event.points >= 0 ? "+" : ""}
                    {event.points} pts
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{event.type} • {new Date(event.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redemption History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {redemptions.length === 0 ? (
            <p className="text-sm text-slate-600">No redemptions requested.</p>
          ) : (
            redemptions.map((redemption) => (
              <div key={redemption.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{redemption.rewardName}</p>
                  <Badge variant={redemption.status === "FULFILLED" ? "default" : "secondary"}>{redemption.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {redemption.pointsRedeemed} pts • {redemption.rewardValue} • {new Date(redemption.requestedAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
