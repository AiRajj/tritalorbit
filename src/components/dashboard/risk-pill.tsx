import { cn } from "@/lib/utils";
import type { RiskLevel } from "@prisma/client";

const TONE: Record<RiskLevel, string> = {
  LOW: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-red-50 text-red-700 border-red-200",
};

export function RiskPill({ level, score }: { level: RiskLevel; score?: number | null }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold", TONE[level])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
      {typeof score === "number" && (
        <span className="ml-1 rounded-full bg-white/70 px-1.5 text-[0.65rem] text-current">{score}</span>
      )}
    </span>
  );
}

export function StatusPill({ status, tone }: { status: string; tone?: "default" | "success" | "warning" | "destructive" | "muted" }) {
  const tones = {
    default: "bg-orbit-deep/5 text-orbit-deep border-orbit-deep/10",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    destructive: "bg-red-50 text-red-700 border-red-200",
    muted: "bg-slate-50 text-slate-600 border-slate-200",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone ?? "default"])}>
      {status}
    </span>
  );
}
