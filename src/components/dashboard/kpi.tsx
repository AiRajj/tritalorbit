import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  delta,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon?: LucideIcon;
  delta?: { value: string; positive?: boolean };
  tone?: "default" | "accent" | "warning" | "success";
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
          {Icon && (
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl",
                tone === "accent" && "bg-orbit-red/10 text-orbit-red",
                tone === "success" && "bg-emerald-500/10 text-emerald-600",
                tone === "warning" && "bg-amber-500/10 text-amber-600",
                tone === "default" && "bg-orbit-deep/5 text-orbit-deep",
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight text-orbit-deep">{value}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          {delta && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold",
                delta.positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
              )}
            >
              {delta.value}
            </span>
          )}
          {hint && <span>{hint}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
