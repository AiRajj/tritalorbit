import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { vendorLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function VendorDashboardPage() {
  const session = await requireRole([Role.VENDOR_LANDLORD, Role.SUPER_ADMIN]);

  const options = await prisma.housingOption.findMany({ orderBy: { createdAt: "desc" }, take: 12 }).catch(() => []);

  return (
    <DashboardShell
      title="Vendor Listings"
      links={vendorLinks}
      user={{ name: session.user.name ?? "Vendor", email: session.user.email ?? "" }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => (
          <Card key={option.id}>
            <CardHeader>
              <CardTitle>{option.propertyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>{option.assignmentCity}, {option.assignmentState}</p>
              <p>${option.monthlyCost} / month</p>
              <Badge variant={option.verificationStatus === "VERIFIED" ? "success" : "warning"}>
                {option.verificationStatus}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
