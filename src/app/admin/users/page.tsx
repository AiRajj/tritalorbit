import { Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatDate } from "@/lib/utils";
import { ROLE_LABEL } from "@/lib/rbac";

export const dynamic = "force-dynamic";
export const metadata = { title: "Users" };

export default async function Page() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { agency: { select: { name: true } } },
  });
  return (
    <>
      <PageHeader eyebrow="Admin" title="Users" description="Platform-wide user roster." />
      <Card>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Users} title="No users yet" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-orbit-deep/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Agency</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orbit-deep/10">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-5 py-3 font-medium text-orbit-deep">{u.name ?? "—"}</td>
                    <td className="px-5 py-3 text-slate-700">{u.email}</td>
                    <td className="px-5 py-3"><Badge>{ROLE_LABEL[u.role]}</Badge></td>
                    <td className="px-5 py-3 text-slate-700">{u.agency?.name ?? "—"}</td>
                    <td className="px-5 py-3">
                      <Badge variant={u.isActive ? "success" : "muted"}>{u.isActive ? "Active" : "Disabled"}</Badge>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">{formatDate(u.createdAt)}</td>
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
