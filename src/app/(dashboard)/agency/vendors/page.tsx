import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getVendorMarketplace } from "@/lib/services/dashboard-data";

export default async function AgencyVendorsPage() {
  const vendors = await getVendorMarketplace();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vendor & Landlord Marketplace</h1>
        <p className="text-sm text-slate-600">Browse and engage verified mobility support providers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <CardTitle>{vendor.name}</CardTitle>
              <p className="text-sm text-slate-600">{vendor.category}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>{vendor.city}, {vendor.state}</p>
              <p>Rating: {vendor.rating ?? "--"}</p>
              <Badge variant={vendor.verificationStatus === "VERIFIED" ? "default" : "secondary"}>
                {vendor.verificationStatus}
              </Badge>
              <p className="text-xs text-slate-500">Contact: {vendor.contactEmail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
