"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function KpiCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-11 w-11 rounded-xl" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <Card>
      <div className="p-4 flex items-center justify-between border-b">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 py-2">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-5 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}

export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <Card className="p-4 space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </Card>
  )
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    </div>
  )
}
