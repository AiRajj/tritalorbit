import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vendors" };

export default async function Page() {
  const [vendors, landlords] = await Promise.all([
    prisma.vendor.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.landlord.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);
  return (
    <>
      <PageHeader eyebrow="Admin" title="Vendors & Landlords" description="Approval workflow for marketplace participants." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <div className="border-b border-orbit-deep/10 px-5 py-4">
              <h3 className="text-base font-semibold text-orbit-deep">Vendors</h3>
            </div>
            {vendors.length === 0 ? (
              <div className="p-6"><EmptyState icon={Briefcase} title="No vendors yet" /></div>
            ) : (
              <ul className="divide-y divide-orbit-deep/10">
                {vendors.map((v) => (
                  <li key={v.id} className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium text-orbit-deep">{v.name}</div>
                      <div className="text-xs text-slate-500">{v.type} · {v.city ?? ""} {v.state ?? ""}</div>
                    </div>
                    <Badge variant={v.verification === "APPROVED" ? "success" : "muted"}>{v.verification}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <div className="border-b border-orbit-deep/10 px-5 py-4">
              <h3 className="text-base font-semibold text-orbit-deep">Landlords</h3>
            </div>
            {landlords.length === 0 ? (
              <div className="p-6"><EmptyState icon={Briefcase} title="No landlords yet" /></div>
            ) : (
              <ul className="divide-y divide-orbit-deep/10">
                {landlords.map((l) => (
                  <li key={l.id} className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium text-orbit-deep">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.city ?? ""} {l.state ?? ""}</div>
                    </div>
                    <Badge variant={l.verification === "APPROVED" ? "success" : "muted"}>{l.verification}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
