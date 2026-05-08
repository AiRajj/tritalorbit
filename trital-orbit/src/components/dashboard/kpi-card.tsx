import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ElementType;
  iconColor?: string;
  description?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-orbit-blue/10 text-orbit-blue",
  description,
  loading = false,
}: KPICardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-orbit">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-8 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-orbit hover:shadow-orbit-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="text-3xl font-bold text-orbit-dark mb-2">{value}</div>

      {(change || description) && (
        <div className="flex items-center gap-1.5">
          {change && (
            <>
              {changeType === "positive" ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : changeType === "negative" ? (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              ) : (
                <Minus className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" ? "text-emerald-600" :
                  changeType === "negative" ? "text-red-600" : "text-slate-500"
                )}
              >
                {change}
              </span>
            </>
          )}
          {description && !change && (
            <span className="text-xs text-slate-500">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
