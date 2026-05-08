import { ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Audit log" };

export default async function Page() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { actor: true },
  });
  return (
    <>
      <PageHeader eyebrow="Admin" title="Audit log" description="Field-level audit retention for compliance review." />
      <Card>
        <CardContent className="p-0">
          {logs.length === 0 ? (
            <div className="p-6"><EmptyState icon={ShieldCheck} title="No audit entries yet" description="Logins, role changes, and entity mutations will appear here." /></div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {logs.map((l) => (
                <li key={l.id} className="flex items-start gap-3 p-5">
                  <Badge>{l.action}</Badge>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium text-orbit-deep">{l.actor?.name ?? "System"}</span> · {l.entity}
                    </div>
                    <div className="text-xs text-slate-500">{l.ip ?? "no-ip"} · {relativeTime(l.createdAt)}</div>
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
