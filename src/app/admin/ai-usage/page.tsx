import { Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatDate, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI usage" };

export default async function Page() {
  const recent = await prisma.aIInsight.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { actor: true, candidate: true },
  });
  return (
    <>
      <PageHeader eyebrow="Admin" title="AI usage" description="Recent agent invocations across the platform." />
      <Card>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <div className="p-6"><EmptyState icon={Sparkles} title="No AI activity yet" /></div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {recent.map((r) => (
                <li key={r.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>{r.agent}</Badge>
                      <span className="text-sm text-slate-700">
                        {r.actor?.name ?? "System"}{r.candidate ? ` · ${r.candidate.firstName} ${r.candidate.lastName}` : ""}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{relativeTime(r.createdAt)}</span>
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
