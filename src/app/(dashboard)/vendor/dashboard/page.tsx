import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getVendorMarketplace } from "@/lib/services/dashboard-data";

export default async function VendorDashboardPage() {
  const vendors = await getVendorMarketplace();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vendor Dashboard</h1>
        <p className="text-sm text-slate-600">Manage listing visibility and verification status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your profile and listings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900">{vendor.name}</p>
                <Badge variant={vendor.verificationStatus === "VERIFIED" ? "default" : "secondary"}>
                  {vendor.verificationStatus}
                </Badge>
              </div>
              <p>{vendor.city}, {vendor.state} • {vendor.category}</p>
              <p className="text-xs text-slate-500">Rating: {vendor.rating ?? "N/A"}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
