import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type KpiItem = {
  label: string;
  value: string | number;
  helper?: string;
};

export function KpiGrid({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardDescription>{item.label}</CardDescription>
            <CardTitle className="text-2xl text-[#1F2937]">{item.value}</CardTitle>
          </CardHeader>
          {item.helper ? (
            <CardContent>
              <p className="text-xs text-slate-500">{item.helper}</p>
            </CardContent>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
