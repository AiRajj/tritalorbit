import { Compass, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { formatDate, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Concierge Board" };

const COLUMNS = [
  { key: "NEW", label: "New", tone: "border-orbit-deep/20" },
  { key: "IN_PROGRESS", label: "In progress", tone: "border-amber-300" },
  { key: "WAITING_CANDIDATE", label: "Waiting candidate", tone: "border-orange-300" },
  { key: "COMPLETED", label: "Completed", tone: "border-emerald-300" },
  { key: "CANCELLED", label: "Cancelled", tone: "border-slate-300" },
] as const;

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "CONCIERGE_MANAGER", ctx?.agencyId ?? null);
  const tasks = agencyId
    ? await prisma.conciergeTask.findMany({
        where: { agencyId },
        orderBy: { createdAt: "desc" },
        include: { booking: { include: { candidate: true } }, assignee: true },
        take: 80,
      })
    : [];

  const grouped: Record<string, typeof tasks> = { NEW: [], IN_PROGRESS: [], WAITING_CANDIDATE: [], COMPLETED: [], CANCELLED: [] };
  for (const t of tasks) grouped[t.status].push(t);

  return (
    <>
      <PageHeader
        eyebrow="Concierge"
        title="Mobility task board"
        description="Booking requests in flight: housing, travel, transportation, and Day-1 readiness."
        actions={
          <Button asChild>
            <Link href="/concierge/requests">
              <Compass className="h-4 w-4" /> Open queue
            </Link>
          </Button>
        }
      />
      {tasks.length === 0 ? (
        <EmptyState icon={Compass} title="The board is clear." description="Tasks appear when candidates request mobility support." />
      ) : (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {COLUMNS.map((col) => (
            <Card key={col.key} className={`border-l-2 ${col.tone}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-orbit-deep">{col.label}</h3>
                  <Badge variant="muted">{grouped[col.key].length}</Badge>
                </div>
                <ul className="mt-3 space-y-2">
                  {grouped[col.key].map((t) => (
                    <li key={t.id} className="rounded-xl border border-orbit-deep/10 bg-white p-3">
                      <div className="text-sm font-semibold text-orbit-deep">{t.title}</div>
                      {t.booking?.candidate && (
                        <div className="mt-0.5 text-xs text-slate-500">
                          {t.booking.candidate.firstName} {t.booking.candidate.lastName}
                        </div>
                      )}
                      <div className="mt-2 flex items-center justify-between text-[0.65rem] text-slate-400">
                        <span>{t.assignee?.name ?? "Unassigned"}</span>
                        <span>{relativeTime(t.createdAt)}</span>
                      </div>
                    </li>
                  ))}
                  {grouped[col.key].length === 0 && (
                    <li className="rounded-xl border border-dashed border-orbit-deep/15 bg-white p-3 text-center text-xs text-slate-400">
                      No tasks
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
