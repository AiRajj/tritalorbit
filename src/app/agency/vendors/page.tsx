import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { agencyLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function AgencyVendorsPage() {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER]);

  const vendors = await prisma.vendor.findMany({ orderBy: { rating: "desc" }, take: 50 }).catch(() => []);

  return (
    <DashboardShell
      title="Vendor Marketplace"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <CardTitle>{vendor.companyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>{vendor.city}, {vendor.state}</p>
              <p>Category: {vendor.category}</p>
              <p>Rating: {vendor.rating.toFixed(1)}</p>
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
