import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getHousingOptionsForCandidateCity } from "@/lib/services/dashboard-data";

export default async function CandidateHousingPage() {
  const options = await getHousingOptionsForCandidateCity("Dallas", "TX");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Verified Housing Options</h1>
        <p className="text-sm text-slate-600">Options aligned to your assignment location and readiness needs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <Card key={option.id}>
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>{option.city}, {option.state}</p>
              <p>Distance: {option.distanceMiles} miles</p>
              <p>Monthly Cost: ${Number(option.monthlyCost).toLocaleString()}</p>
              <Badge variant="default">{option.verificationStatus}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
