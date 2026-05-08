"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationPanel } from "@/components/dashboard/notification-panel"
import { Search, Bell, ChevronRight, User, Settings, LogOut, Command } from "lucide-react"
import { toast } from "sonner"
import type { UserRole } from "@/components/layout/dashboard-sidebar"

const roleBreadcrumbRoot: Record<UserRole, string> = {
  admin: "Admin",
  agency: "Agency",
  recruiter: "Recruiter",
  candidate: "Candidate",
  concierge: "Concierge",
  vendor: "Vendor",
  msp: "MSP",
}

const demoUsers: Record<UserRole, { name: string; initials: string }> = {
  admin: { name: "Sarah Chen", initials: "SC" },
  agency: { name: "Marcus Rivera", initials: "MR" },
  recruiter: { name: "Jordan Taylor", initials: "JT" },
  candidate: { name: "Alex Morgan", initials: "AM" },
  concierge: { name: "Riley Park", initials: "RP" },
  vendor: { name: "Casey Smith", initials: "CS" },
  msp: { name: "Dana Williams", initials: "DW" },
}

interface DashboardHeaderProps {
  role: UserRole
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const pathname = usePathname()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const user = demoUsers[role]

  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }))

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 lg:px-6">
      <div className="hidden md:flex items-center text-sm text-muted-foreground">
        <span className="font-medium text-[#0B3C5D]">{roleBreadcrumbRoot[role]}</span>
        {breadcrumbs.slice(1).map((crumb, i) => (
          <span key={crumb.href} className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5 mx-1.5" />
            <span className={cn(i === breadcrumbs.length - 2 ? "text-foreground font-medium" : "")}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 pr-12 h-9 bg-[#F8FAFC] border-slate-200 focus-visible:ring-[#0B3C5D]/20"
            onFocus={() => toast.info("Search coming soon")}
            readOnly
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#E63946] text-[10px] font-bold text-white">
              3
            </span>
          </Button>
          <AnimatePresence>
            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 z-50"
                >
                  <NotificationPanel onClose={() => setNotificationsOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-[#0B3C5D] text-white text-xs">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{roleBreadcrumbRoot[role]}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("Profile page coming soon")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Settings page coming soon")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.success("Signed out successfully")} className="text-[#E63946]">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
