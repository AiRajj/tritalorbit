import { auth } from "@/auth";
import { WalletFundForm } from "@/components/wallet/wallet-fund-form";
import { WalletGrantForm } from "@/components/wallet/wallet-grant-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAgencyIdForUser } from "@/lib/services/access";
import { getAgencyWalletWithLedger } from "@/lib/services/wallet";
import { prisma } from "@/lib/prisma";

export default async function AgencyWalletPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const agencyId = await getAgencyIdForUser(session.user.id);
  if (!agencyId) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Agency context not found</h1>
        <p className="mt-2 text-sm text-slate-600">Link this user to an agency to manage Assignment Wallet™.</p>
      </div>
    );
  }

  const [{ wallet, entries }, candidates] = await Promise.all([
    getAgencyWalletWithLedger(agencyId, 50),
    prisma.candidate.findMany({
      where: { agencyId },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
      take: 100
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Agency Wallet</h1>
        <p className="text-sm text-slate-600">
          Preload travel credits, manage escrow, and distribute candidate redemption budgets.
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
            <CardTitle>Escrow Reserved</CardTitle>
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fund agency wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <WalletFundForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grant candidate travel credit</CardTitle>
          </CardHeader>
          <CardContent>
            <WalletGrantForm candidates={candidates} />
          </CardContent>
        </Card>
      </div>

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
