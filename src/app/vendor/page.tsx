import Link from "next/link";
import { Briefcase, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vendor Hub" };

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;
  const [vendor, landlord] = await Promise.all([
    prisma.vendor.findFirst({ where: { userId: session.user.id } }),
    prisma.landlord.findFirst({ where: { userId: session.user.id } }),
  ]);

  const housing = landlord
    ? await prisma.housingOption.findMany({ where: { landlordId: landlord.id }, take: 12 })
    : [];

  return (
    <>
      <PageHeader
        eyebrow={landlord ? "Landlord Hub" : "Vendor Hub"}
        title={landlord?.name ?? vendor?.name ?? session.user.name ?? "Welcome"}
        description="Manage listings, respond to requests, and keep verifications current."
        actions={
          <Button asChild>
            <Link href="/vendor/listings">
              <Home className="h-4 w-4" /> Manage listings
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Listings" value={housing.length} icon={Home} />
        <KpiCard
          label="Verification"
          value={vendor?.verification ?? landlord?.verification ?? "PENDING"}
          tone={
            (vendor?.verification ?? landlord?.verification) === "APPROVED" ? "success" : "warning"
          }
        />
        <KpiCard label="Rating" value={vendor?.rating ?? landlord?.rating ?? "—"} icon={Briefcase} />
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="border-b border-orbit-deep/10 px-5 py-4">
            <h3 className="text-base font-semibold text-orbit-deep">Recent listings</h3>
          </div>
          {housing.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Home} title="No listings yet" description="Add a property to start receiving Orbit-matched candidates." />
            </div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {housing.map((h) => (
                <li key={h.id} className="flex items-center justify-between p-5">
                  <div>
                    <div className="font-medium text-orbit-deep">{h.title}</div>
                    <div className="text-xs text-slate-500">{h.city}, {h.state} · {h.distanceMiles ?? "—"} mi</div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Badge variant={h.verification === "APPROVED" ? "success" : "muted"}>{h.verification}</Badge>
                    <span className="font-semibold text-orbit-deep">{h.monthlyCost ? formatCurrency(Number(h.monthlyCost)) : "—"}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
