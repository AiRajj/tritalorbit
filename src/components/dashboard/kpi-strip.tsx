import { Card, CardContent } from "@/components/ui/card";

type KPI = {
  label: string;
  value: string;
  hint?: string;
};

export function KpiStrip({ items }: { items: KPI[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
            {item.hint ? <p className="mt-1 text-xs text-slate-500">{item.hint}</p> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
