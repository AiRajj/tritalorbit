import { auth } from "@/auth";
import { RewardRedemptionStatusButton } from "@/components/rewards/reward-redemption-status-button";
import { RewardsAwardForm } from "@/components/rewards/rewards-award-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAgencyIdForUser } from "@/lib/services/access";
import { prisma } from "@/lib/prisma";

export default async function AgencyRewardsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const agencyId = await getAgencyIdForUser(session.user.id);
  if (!agencyId) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Agency context not found</h1>
        <p className="mt-2 text-sm text-slate-600">Assign this user to an agency to manage Orbit Rewards.</p>
      </div>
    );
  }

  const [candidates, events, redemptions, accounts] = await Promise.all([
    prisma.candidate.findMany({
      where: { agencyId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
      take: 100
    }),
    prisma.rewardEvent.findMany({
      where: { agencyId },
      include: { candidate: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      take: 50
    }),
    prisma.rewardRedemption.findMany({
      where: { agencyId },
      include: { candidate: { select: { id: true, name: true } } },
      orderBy: { requestedAt: "desc" },
      take: 50
    }),
    prisma.rewardsAccount.findMany({
      where: { candidate: { agencyId } },
      include: { candidate: { select: { id: true, name: true } } },
      orderBy: { lifetimePoints: "desc" },
      take: 50
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orbit Rewards Operations</h1>
        <p className="text-sm text-slate-600">
          Award loyalty points, monitor tier progression, and manage candidate redemption requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Award points</CardTitle>
        </CardHeader>
        <CardContent>
          <RewardsAwardForm candidates={candidates} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tier leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {accounts.length === 0 ? (
            <p className="text-sm text-slate-600">No rewards accounts yet.</p>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{account.candidate?.name ?? "Candidate"}</p>
                  <Badge>{account.tier}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Balance: {account.pointsBalance} pts • Lifetime: {account.lifetimePoints} pts
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redemption queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {redemptions.length === 0 ? (
            <p className="text-sm text-slate-600">No redemption requests in queue.</p>
          ) : (
            redemptions.map((redemption) => (
              <div key={redemption.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">
                    {redemption.candidate?.name ?? "Candidate"} • {redemption.rewardName}
                  </p>
                  <Badge variant={redemption.status === "FULFILLED" ? "default" : "secondary"}>{redemption.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{redemption.pointsRedeemed} pts • {redemption.rewardValue}</p>
                {redemption.status !== "FULFILLED" ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {redemption.status === "REQUESTED" ? (
                      <RewardRedemptionStatusButton redemptionId={redemption.id} status="APPROVED" label="Approve" />
                    ) : null}
                    <RewardRedemptionStatusButton redemptionId={redemption.id} status="FULFILLED" label="Mark Fulfilled" />
                    <RewardRedemptionStatusButton redemptionId={redemption.id} status="REJECTED" label="Reject" />
                  </div>
                ) : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-slate-600">No reward events yet.</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">
                    {event.candidate?.name ?? "Candidate"} • {event.description}
                  </p>
                  <Badge variant={event.points >= 0 ? "default" : "secondary"}>{event.points} pts</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{event.type} • {new Date(event.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
