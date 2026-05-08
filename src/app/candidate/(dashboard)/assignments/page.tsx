import Link from "next/link";
import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { StatusPill } from "@/components/dashboard/risk-pill";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Assignments" };

export default async function Page() {
  const session = await auth();
  const candidate = session?.user?.id
    ? await prisma.candidate.findFirst({ where: { userId: session.user.id } })
    : null;

  const assignments = candidate
    ? await prisma.assignment.findMany({
        where: { candidateId: candidate.id },
        include: { offer: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <>
      <PageHeader eyebrow="Assignments" title="My assignments" description="Active and historical placements." />
      <Card>
        <CardContent className="p-0">
          {assignments.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={Briefcase} title="No assignments yet" description="Accepted offers will appear here." />
            </div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {assignments.map((a) => (
                <li key={a.id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-orbit-deep">{a.offer.facilityName}</div>
                    <div className="text-xs text-slate-500">
                      {a.offer.city}, {a.offer.state} · Start {a.startDate ? formatDate(a.startDate) : "TBD"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill status={a.status} />
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/candidate/offer/${a.offer.publicToken}`}>Open hub</Link>
                    </Button>
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
