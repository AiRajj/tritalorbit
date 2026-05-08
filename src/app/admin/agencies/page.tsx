import { Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agencies" };

export default async function Page() {
  const agencies = await prisma.agency.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { offers: true, candidates: true, users: true } } },
  });
  return (
    <>
      <PageHeader eyebrow="Admin" title="Agencies" description="All onboarded agencies." />
      <Card>
        <CardContent className="p-0">
          {agencies.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Building2} title="No agencies yet" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Agency</th>
                  <th className="px-5 py-3">Users</th>
                  <th className="px-5 py-3">Candidates</th>
                  <th className="px-5 py-3">Offers</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {agencies.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-3 font-medium text-orbit-deep">{a.name}</td>
                    <td className="px-5 py-3">{a._count.users}</td>
                    <td className="px-5 py-3">{a._count.candidates}</td>
                    <td className="px-5 py-3">{a._count.offers}</td>
                    <td className="px-5 py-3">
                      <Badge variant={a.isActive ? "success" : "muted"}>{a.isActive ? "Active" : "Inactive"}</Badge>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">{formatDate(a.createdAt)}</td>
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
