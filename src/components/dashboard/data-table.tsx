"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/dashboard/empty-state"
import {
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, Loader2, FileX,
} from "lucide-react"

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  className?: string
  render?: (value: unknown, row: T) => React.ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: string[]
  pageSize?: number
  loading?: boolean
  title?: string
  actions?: React.ReactNode
  className?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  pageSize = 10,
  loading = false,
  title,
  actions,
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(0)

  const filteredData = useMemo(() => {
    if (!search.trim()) return data
    const query = search.toLowerCase()
    const keys = searchKeys || columns.map((c) => c.key)
    return data.filter((row) =>
      keys.some((key) => {
        const val = row[key]
        return val !== null && val !== undefined && String(val).toLowerCase().includes(query)
      })
    )
  }, [data, search, searchKeys, columns])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filteredData, sortKey, sortDir])

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(page * pageSize, (page + 1) * pageSize)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(0)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      {(title || searchable || actions) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b">
          {title && <h3 className="font-semibold text-base">{title}</h3>}
          <div className="flex items-center gap-2 ml-auto">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                  }}
                  className="pl-8 h-9 w-48 lg:w-64"
                />
              </div>
            )}
            {actions}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[#0B3C5D]" />
          </div>
        ) : paginatedData.length === 0 ? (
          <EmptyState
            icon={FileX}
            title={search ? "No results found" : "No data yet"}
            description={search ? `No results match "${search}". Try a different search.` : "Data will appear here once available."}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                      col.className
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <span className="ml-0.5">
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5 opacity-30" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: i * 0.02 }}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
          <span className="text-muted-foreground">
            Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sortedData.length)} of{" "}
            {sortedData.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageIdx = totalPages <= 5 ? i : Math.max(0, Math.min(page - 2, totalPages - 5)) + i
              return (
                <Button
                  key={pageIdx}
                  variant={pageIdx === page ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage(pageIdx)}
                >
                  {pageIdx + 1}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
