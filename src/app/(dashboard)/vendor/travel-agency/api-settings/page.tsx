import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const settings = [
  ['AMADEUS_API_KEY', Boolean(process.env.AMADEUS_API_KEY)],
  ['DUFFEL_API_KEY', Boolean(process.env.DUFFEL_API_KEY)],
  ['SKYSCANNER_API_KEY', Boolean(process.env.SKYSCANNER_API_KEY)]
] as const;

export default function TravelAgencyApiSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="orbit-dark-panel rounded-2xl p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Travel Agency Portal</p>
        <h1 className="mt-2 text-3xl font-semibold">API settings and provider readiness</h1>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Integration status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {settings.map(([key, enabled]) => (
            <p key={key}>• {key}: {enabled ? 'Configured' : 'Using mock fallback'}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
