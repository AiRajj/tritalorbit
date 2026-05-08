import { Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";

export const metadata = { title: "Settings" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="System settings" description="Platform configuration." />
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-orbit-deep">Environment</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <Row label="Database" value={process.env.DATABASE_URL ? "configured" : "missing"} ok={!!process.env.DATABASE_URL} />
            <Row label="Auth secret" value={process.env.AUTH_SECRET ? "set" : "missing"} ok={!!process.env.AUTH_SECRET} />
            <Row label="OpenAI" value={process.env.OPENAI_API_KEY ? "live" : "mock fallbacks"} ok={true} />
            <Row label="Stripe" value={process.env.STRIPE_SECRET_KEY ? "live" : "test"} ok={true} />
            <Row label="Resend" value={process.env.RESEND_API_KEY ? "live" : "logging only"} ok={true} />
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-orbit-deep/10 bg-white p-3">
      <span className="font-medium text-orbit-deep">{label}</span>
      <span className={ok ? "text-emerald-700" : "text-amber-700"}>{value}</span>
    </li>
  );
}
