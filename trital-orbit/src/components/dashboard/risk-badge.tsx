import React from "react";
import { cn } from "@/lib/utils";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

interface RiskBadgeProps {
  score?: number;
  level?: RiskLevel;
  showScore?: boolean;
  size?: "sm" | "md";
}

const riskConfig: Record<RiskLevel, { bg: string; text: string; label: string; dot: string }> = {
  LOW: {
    bg: "bg-emerald-50 border border-emerald-200",
    text: "text-emerald-700",
    label: "Low Risk",
    dot: "bg-emerald-500",
  },
  MEDIUM: {
    bg: "bg-amber-50 border border-amber-200",
    text: "text-amber-700",
    label: "Medium Risk",
    dot: "bg-amber-500",
  },
  HIGH: {
    bg: "bg-orange-50 border border-orange-200",
    text: "text-orange-700",
    label: "High Risk",
    dot: "bg-orange-500",
  },
  CRITICAL: {
    bg: "bg-red-50 border border-red-200",
    text: "text-red-700",
    label: "Critical",
    dot: "bg-red-500",
  },
};

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return "CRITICAL";
  if (score >= 50) return "HIGH";
  if (score >= 25) return "MEDIUM";
  return "LOW";
}

export function RiskBadge({ score, level, showScore = true, size = "sm" }: RiskBadgeProps) {
  const riskLevel = level ?? (score !== undefined ? getRiskLevel(score) : "LOW");
  const config = riskConfig[riskLevel];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span className={cn("rounded-full", config.dot, size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2")} />
      {config.label}
      {showScore && score !== undefined && ` ${score}/100`}
    </span>
  );
}
