import { Activity } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activity" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);
  const logs = agencyId
    ? await prisma.activityLog.findMany({
        where: {
          OR: [{ offer: { agencyId } }, { candidate: { agencyId } }],
        },
        include: {
          actor: { select: { name: true, email: true } },
          offer: { select: { facilityName: true } },
          candidate: { select: { firstName: true, lastName: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      })
    : [];

  return (
    <>
      <PageHeader eyebrow="Activity" title="Activity feed" description="Every offer, booking, and AI action across the agency." />
      <Card>
        <CardContent className="p-0">
          {logs.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Activity} title="No activity yet" />
            </div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {logs.map((l) => (
                <li key={l.id} className="flex items-start gap-3 p-5">
                  <span className="mt-1 h-2 w-2 rounded-full bg-orbit-red" />
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium text-orbit-deep">{l.actor?.name ?? "System"}</span>{" "}
                      <span className="text-slate-600">{l.description ?? l.action}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {l.offer ? l.offer.facilityName : ""}
                      {l.candidate ? ` · ${l.candidate.firstName} ${l.candidate.lastName}` : ""}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{relativeTime(l.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
