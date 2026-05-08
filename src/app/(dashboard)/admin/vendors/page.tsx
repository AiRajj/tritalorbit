import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getVendorMarketplace } from "@/lib/services/dashboard-data";

export default async function AdminVendorsPage() {
  const vendors = await getVendorMarketplace();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Vendors</h1>
        <p className="text-sm text-slate-600">Review verification status and partner quality signals.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <CardTitle>{vendor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>{vendor.category}</p>
              <p>{vendor.city}, {vendor.state}</p>
              <Badge variant={vendor.verificationStatus === "VERIFIED" ? "default" : "secondary"}>
                {vendor.verificationStatus}
              </Badge>
              <p className="text-xs text-slate-500">{vendor.contactEmail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
