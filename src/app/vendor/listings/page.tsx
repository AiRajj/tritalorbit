import { Home } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Listings" };

export default async function Page() {
  const session = await auth();
  if (!session?.user) return null;
  const landlord = await prisma.landlord.findFirst({ where: { userId: session.user.id } });
  const housing = landlord
    ? await prisma.housingOption.findMany({ where: { landlordId: landlord.id }, orderBy: { updatedAt: "desc" } })
    : [];
  return (
    <>
      <PageHeader eyebrow="Listings" title="Property inventory" description="Manage availability, pricing, and verification." />
      {housing.length === 0 ? (
        <EmptyState icon={Home} title="No listings yet" description="Reach out to your TRITAL Orbit account manager to onboard inventory." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {housing.map((h) => (
            <Card key={h.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-orbit-deep">{h.title}</div>
                  <Badge variant={h.verification === "APPROVED" ? "success" : "muted"}>{h.verification}</Badge>
                </div>
                <div className="mt-1 text-xs text-slate-500">{h.city}, {h.state}</div>
                <div className="mt-3 text-lg font-semibold text-orbit-deep">{h.monthlyCost ? formatCurrency(Number(h.monthlyCost)) : "—"}</div>
                <p className="mt-2 line-clamp-3 text-xs text-slate-600">{h.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
