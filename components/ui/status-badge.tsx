import { cn } from "@/lib/utils";

export function StatusBadge({ label, tone = "slate" }: { label: string; tone?: "green" | "red" | "amber" | "blue" | "slate" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    red: "bg-red-50 text-red-700 ring-red-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    blue: "bg-sky-50 text-sky-700 ring-sky-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200"
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1", tones[tone])}>
      {label}
    </span>
  );
}

export function riskTone(score: number): "green" | "amber" | "red" | "blue" {
  if (score >= 75) return "red";
  if (score >= 50) return "amber";
  if (score >= 30) return "blue";
  return "green";
}
