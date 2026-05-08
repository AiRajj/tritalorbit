import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CandidateDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Candidate Dashboard</h1>
        <p className="text-sm text-slate-600">Track assignment readiness and mobility support in one place.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Readiness</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>Housing status: In progress</p>
          <p>Travel status: Ready to book</p>
          <p>Document status: In progress</p>
          <p>First-week readiness: 62%</p>
          <Button asChild variant="outline">
            <Link href="/candidate/housing">View housing options</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retention risk score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>
            Current risk: <span className="font-semibold text-orbit-red">68 (Medium)</span>
          </p>
          <p>Suggested action: confirm final housing selection and complete readiness call in the next 24 hours.</p>
        </CardContent>
      </Card>
    </div>
  );
}
