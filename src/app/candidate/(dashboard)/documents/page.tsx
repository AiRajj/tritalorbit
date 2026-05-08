import { FileText } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Documents" };

export default async function Page() {
  const session = await auth();
  const candidate = session?.user?.id
    ? await prisma.candidate.findFirst({ where: { userId: session.user.id } })
    : null;

  const docs = candidate
    ? await prisma.documentVault.findMany({
        where: { candidateId: candidate.id },
        orderBy: { uploadedAt: "desc" },
      })
    : [];

  return (
    <>
      <PageHeader eyebrow="Documents" title="Document vault" description="Field-level audit. Credentials travel with you." />
      <Card>
        <CardContent className="p-0">
          {docs.length === 0 ? (
            <div className="p-6">
              <EmptyState icon={FileText} title="No documents on file" description="Your agency will share required credentials and documents here." />
            </div>
          ) : (
            <ul className="divide-y divide-orbit-deep/10">
              {docs.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <div className="font-medium text-orbit-deep">{d.title}</div>
                    <div className="text-xs text-slate-500">
                      {d.category} · uploaded {formatDate(d.uploadedAt)}
                      {d.expiresAt && ` · expires ${formatDate(d.expiresAt)}`}
                    </div>
                  </div>
                  <Badge variant={d.status === "verified" ? "success" : "muted"}>{d.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </>
  );
}
