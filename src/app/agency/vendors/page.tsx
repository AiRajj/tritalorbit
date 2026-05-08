import { Building2, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vendors & Housing" };

export default async function Page() {
  const [housing, vendors] = await Promise.all([
    prisma.housingOption.findMany({
      where: { available: true, verification: "APPROVED" },
      orderBy: { rating: "desc" },
      take: 24,
    }),
    prisma.vendor.findMany({ orderBy: { createdAt: "desc" }, take: 24 }),
  ]);
  return (
    <>
      <PageHeader eyebrow="Marketplace" title="Vendors & housing" description="Verified housing options and travel vendors mapped to your assignment cities." />
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Verified housing</h3>
        {housing.length === 0 ? (
          <div className="mt-3"><EmptyState icon={Home} title="No housing matches yet" description="Add facilities to start matching housing inventory." /></div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {housing.map((h) => (
              <Card key={h.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-orbit-deep">{h.title}</div>
                    {h.rating && <Badge variant="muted">★ {h.rating}</Badge>}
                  </div>
                  <div className="text-xs text-slate-500">{h.city}, {h.state}{h.distanceMiles && ` · ${h.distanceMiles} mi`}</div>
                  <div className="mt-3 text-lg font-semibold text-orbit-deep">{h.monthlyCost ? formatCurrency(Number(h.monthlyCost)) : "—"}</div>
                  <p className="mt-2 line-clamp-3 text-xs text-slate-600">{h.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-orbit-deep">Vendors</h3>
        {vendors.length === 0 ? (
          <div className="mt-3"><EmptyState icon={Building2} title="No vendors onboarded" /></div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <Card key={v.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-orbit-deep">{v.name}</div>
                    <Badge variant={v.verification === "APPROVED" ? "success" : "muted"}>{v.verification}</Badge>
                  </div>
                  <div className="text-xs text-slate-500">{v.type} · {v.city ?? ""} {v.state ?? ""}</div>
                  <p className="mt-2 line-clamp-3 text-xs text-slate-600">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
