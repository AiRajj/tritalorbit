"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  sparklineData?: number[]
  className?: string
  index?: number
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = "text-[#0B3C5D]",
  iconBg = "bg-[#0B3C5D]/10",
  sparklineData,
  className,
  index = 0,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className={cn("relative overflow-hidden p-5 hover:shadow-md transition-shadow", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-[#1F2937] tracking-tight">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1.5 text-xs">
                {isPositive && <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />}
                {isNegative && <TrendingDown className="h-3.5 w-3.5 text-[#E63946]" />}
                {isNeutral && <Minus className="h-3.5 w-3.5 text-slate-400" />}
                <span
                  className={cn(
                    "font-semibold",
                    isPositive && "text-emerald-600",
                    isNegative && "text-[#E63946]",
                    isNeutral && "text-slate-500"
                  )}
                >
                  {isPositive && "+"}
                  {change}%
                </span>
                <span className="text-muted-foreground">{changeLabel}</span>
              </div>
            )}
          </div>
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>

        {sparklineData && sparklineData.length > 1 && (
          <div className="mt-3 h-8">
            <Sparkline data={sparklineData} />
          </div>
        )}
      </Card>
    </motion.div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 32
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * height,
  }))
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B3C5D" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0B3C5D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparkGrad)" />
      <path d={pathD} fill="none" stroke="#0B3C5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
