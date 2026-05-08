import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { adminLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminVendorsPage() {
  const session = await requireRole([Role.SUPER_ADMIN]);

  const vendors = await prisma.vendor.findMany({ orderBy: { createdAt: "desc" }, take: 100 }).catch(() => []);

  return (
    <DashboardShell
      title="Vendor Administration"
      links={adminLinks}
      user={{ name: session.user.name ?? "Admin", email: session.user.email ?? "" }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <CardTitle>{vendor.companyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>{vendor.city}, {vendor.state}</p>
              <p>{vendor.contactEmail}</p>
              <Badge variant={vendor.verificationStatus === "VERIFIED" ? "success" : "warning"}>
                {vendor.verificationStatus}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
