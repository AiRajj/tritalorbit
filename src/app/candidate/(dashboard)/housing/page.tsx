import { Home, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Housing" };

export default async function Page() {
  const housing = await prisma.housingOption.findMany({
    where: { available: true, verification: "APPROVED" },
    orderBy: { rating: "desc" },
    take: 12,
  });

  return (
    <>
      <PageHeader
        eyebrow="Housing"
        title="Verified housing for your assignment"
        description="Vetted by Orbit. Mapped to facility distance and assignment city/state."
      />
      {housing.length === 0 ? (
        <EmptyState icon={Home} title="No verified housing yet" description="Concierge will share matches once your assignment is locked." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {housing.map((h) => (
            <Card key={h.id} className="h-full overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-orbit-deep">{h.title}</div>
                  {h.rating && <Badge variant="muted">★ {h.rating}</Badge>}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" /> {h.city}, {h.state}
                  {h.distanceMiles && <span> · {h.distanceMiles} mi</span>}
                </div>
                <div className="mt-3 text-lg font-semibold text-orbit-deep">
                  {h.monthlyCost ? `${formatCurrency(Number(h.monthlyCost))}/mo` : "Pricing on request"}
                </div>
                <p className="mt-2 line-clamp-3 text-xs text-slate-600">{h.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
