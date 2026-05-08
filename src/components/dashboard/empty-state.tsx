"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { type LucideIcon, Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B3C5D]/5 mb-4">
        <Icon className="h-8 w-8 text-[#0B3C5D]/40" />
      </div>
      <h3 className="text-lg font-semibold text-[#1F2937] mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
