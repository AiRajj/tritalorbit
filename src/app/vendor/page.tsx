import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { vendorLinks } from "@/lib/navigation";

export default async function VendorPage() {
  const session = await requireRole([Role.VENDOR_LANDLORD, Role.SUPER_ADMIN]);

  return (
    <DashboardShell
      title="Vendor Portal"
      links={vendorLinks}
      user={{ name: session.user.name ?? "Vendor", email: session.user.email ?? "" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Vendor Home</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          Manage property listings, availability, and concierge communication from your dashboard.
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
