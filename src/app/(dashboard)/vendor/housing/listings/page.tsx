import { prisma } from '@/lib/prisma';
import { withDbFallback } from '@/lib/services/db-fallback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HousingListingsPage() {
  const listings = await withDbFallback(
    () => prisma.partnerHousingListing.findMany({ include: { vendor: true }, orderBy: { createdAt: 'desc' }, take: 40 }),
    []
  );

  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Housing Partner Portal</p>
        <h1 className="mt-2 text-3xl font-semibold">Assignment-ready listing inventory</h1>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {listings.length === 0 ? (
          <Card><CardContent className="p-5 text-sm text-slate-600">No listings found. Create your first listing.</CardContent></Card>
        ) : listings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader>
              <CardTitle className="text-base">{listing.propertyType}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>Monthly cost: ${listing.monthlyCost.toString()}</p>
              <p>Furnished: {listing.furnished ? 'Yes' : 'No'}</p>
              <p>Vendor: {listing.vendor.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
