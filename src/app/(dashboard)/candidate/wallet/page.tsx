import { auth } from "@/auth";
import { WalletRedeemForm } from "@/components/wallet/wallet-redeem-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCandidateForUser } from "@/lib/services/access";
import { getCandidateWalletWithLedger } from "@/lib/services/wallet";
import { prisma } from "@/lib/prisma";

export default async function CandidateWalletPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const candidate = await getCandidateForUser(session.user.id);
  if (!candidate) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Candidate context not found</h1>
        <p className="mt-2 text-sm text-slate-600">Please contact support to link your candidate profile.</p>
      </div>
    );
  }

  const [{ wallet, entries }, requests] = await Promise.all([
    getCandidateWalletWithLedger(candidate.id, 40),
    prisma.travelBidRequest.findMany({
      where: {
        candidateId: candidate.id,
        status: "BOOKED"
      },
      include: {
        assignment: true,
        selectedBid: true
      },
      orderBy: { createdAt: "desc" },
      take: 20
    })
  ]);

  const redeemTargets = requests
    .filter((request) => request.selectedBid)
    .map((request) => ({
      requestId: request.id,
      bidId: request.selectedBidId ?? undefined,
      label: `${request.assignment.facilityName} • ${request.assignment.city} (${Number(
        request.selectedBid?.totalPrice ?? 0
      ).toLocaleString()} USD)`
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Candidate Wallet</h1>
        <p className="text-sm text-slate-600">
          Redeem assignment credits for travel packages and track every ledger movement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">${Number(wallet.balance).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Escrow Backing</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">${Number(wallet.escrowBalance).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ledger Entries</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{entries.length}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redeem credits</CardTitle>
        </CardHeader>
        <CardContent>
          <WalletRedeemForm targets={redeemTargets} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ledger history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {entries.length === 0 ? (
            <p className="text-sm text-slate-600">No wallet activity yet.</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="rounded-md border border-slate-200 p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{entry.description}</p>
                  <Badge variant={entry.amount.gte(0) ? "default" : "secondary"}>
                    {entry.amount.gte(0) ? "+" : ""}
                    {Number(entry.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} {wallet.currency}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {entry.entryType} • {entry.status} • {new Date(entry.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
