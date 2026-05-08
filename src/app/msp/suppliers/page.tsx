import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";

export const dynamic = "force-dynamic";
export const metadata = { title: "Suppliers" };

export default async function Page() {
  const agencies = await prisma.agency.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { offers: true, assignments: true } } },
  });
  return (
    <>
      <PageHeader eyebrow="Suppliers" title="Supplier directory" description="Read-only view across the MSP network." />
      <Card>
        <CardContent className="p-0">
          {agencies.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Briefcase} title="No suppliers" description="Onboarded agencies will appear here." />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Agency</th>
                  <th className="px-5 py-3">Offers</th>
                  <th className="px-5 py-3">Assignments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {agencies.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-3 font-medium text-orbit-deep">{a.name}</td>
                    <td className="px-5 py-3">{a._count.offers}</td>
                    <td className="px-5 py-3">{a._count.assignments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
