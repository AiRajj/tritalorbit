"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  FileText,
  Store,
  Home,
  CreditCard,
  ClipboardList,
  Brain,
  Settings,
  Rocket,
  BarChart3,
  Activity,
  FileCheck,
  ListTodo,
  Package,
  UserCircle,
  PanelLeftClose,
  PanelLeft,
  Menu,
  type LucideIcon,
} from "lucide-react"

export type UserRole = "admin" | "agency" | "recruiter" | "candidate" | "concierge" | "vendor" | "msp"

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navigationByRole: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Agencies", href: "/admin/agencies", icon: Building2 },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Candidates", href: "/admin/candidates", icon: UserCheck },
    { label: "Offers", href: "/admin/offers", icon: FileText },
    { label: "Vendors", href: "/admin/vendors", icon: Store },
    { label: "Housing", href: "/admin/housing", icon: Home },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: ClipboardList },
    { label: "AI Usage", href: "/admin/ai-usage", icon: Brain },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
  agency: [
    { label: "Dashboard", href: "/agency", icon: LayoutDashboard },
    { label: "Offers", href: "/agency/offers", icon: FileText },
    { label: "Candidates", href: "/agency/candidates", icon: UserCheck },
    { label: "Booking Requests", href: "/agency/bookings", icon: Home },
    { label: "Assignment Launch", href: "/agency/launch", icon: Rocket },
    { label: "Vendors", href: "/agency/vendors", icon: Store },
    { label: "Reports", href: "/agency/reports", icon: BarChart3 },
    { label: "Settings", href: "/agency/settings", icon: Settings },
  ],
  recruiter: [
    { label: "Dashboard", href: "/recruiter", icon: LayoutDashboard },
    { label: "My Offers", href: "/recruiter/offers", icon: FileText },
    { label: "Candidates", href: "/recruiter/candidates", icon: UserCheck },
    { label: "Activity", href: "/recruiter/activity", icon: Activity },
  ],
  candidate: [
    { label: "My Offers", href: "/candidate", icon: FileText },
    { label: "Housing", href: "/candidate/housing", icon: Home },
    { label: "Booking Requests", href: "/candidate/bookings", icon: ListTodo },
    { label: "Documents", href: "/candidate/documents", icon: FileCheck },
    { label: "Profile", href: "/candidate/profile", icon: UserCircle },
  ],
  concierge: [
    { label: "Dashboard", href: "/concierge", icon: LayoutDashboard },
    { label: "Requests", href: "/concierge/requests", icon: ListTodo },
    { label: "Tasks", href: "/concierge/tasks", icon: ClipboardList },
    { label: "Vendors", href: "/concierge/vendors", icon: Store },
  ],
  vendor: [
    { label: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { label: "Listings", href: "/vendor/listings", icon: Package },
    { label: "Requests", href: "/vendor/requests", icon: ListTodo },
    { label: "Profile", href: "/vendor/profile", icon: UserCircle },
  ],
  msp: [
    { label: "Dashboard", href: "/msp", icon: LayoutDashboard },
    { label: "Reports", href: "/msp/reports", icon: BarChart3 },
    { label: "Agencies", href: "/msp/agencies", icon: Building2 },
    { label: "Analytics", href: "/msp/analytics", icon: Activity },
  ],
}

const roleLabels: Record<UserRole, string> = {
  admin: "Administrator",
  agency: "Agency Manager",
  recruiter: "Recruiter",
  candidate: "Candidate",
  concierge: "Concierge",
  vendor: "Vendor",
  msp: "MSP Manager",
}

const demoUsers: Record<UserRole, { name: string; email: string }> = {
  admin: { name: "Sarah Chen", email: "sarah@trital.com" },
  agency: { name: "Marcus Rivera", email: "marcus@acmehealth.com" },
  recruiter: { name: "Jordan Taylor", email: "jordan@acmehealth.com" },
  candidate: { name: "Alex Morgan", email: "alex.morgan@email.com" },
  concierge: { name: "Riley Park", email: "riley@trital.com" },
  vendor: { name: "Casey Smith", email: "casey@homefinder.com" },
  msp: { name: "Dana Williams", email: "dana@medstaff.com" },
}

function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase()
}

interface SidebarContentProps {
  role: UserRole
  collapsed: boolean
  onToggle: () => void
}

function SidebarNav({ role, collapsed, onToggle }: SidebarContentProps) {
  const pathname = usePathname()
  const items = navigationByRole[role]
  const user = demoUsers[role]

  return (
    <div className="flex h-full flex-col bg-[#0B3C5D] text-white">
      <div className={cn("flex items-center border-b border-white/10 px-4 h-16", collapsed ? "justify-center" : "gap-3")}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E63946] font-bold text-sm">
              T
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight">TRITAL</span>
              <span className="text-[10px] text-white/60 ml-1">Orbit™</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E63946] font-bold text-sm">
            T
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-1 px-2">
          <TooltipProvider delayDuration={0}>
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        collapsed && "justify-center px-2",
                        isActive
                          ? "bg-white/15 text-white shadow-sm"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("h-4.5 w-4.5 shrink-0", isActive && "text-[#E63946]")} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-[#E63946]"
                        />
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <div className="border-t border-white/10 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarFallback className="bg-[#E63946] text-white text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-white/50 truncate">{roleLabels[role]}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10"
              onClick={onToggle}
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarFallback className="bg-[#E63946] text-white text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10"
              onClick={onToggle}
            >
              <PanelLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

interface DashboardSidebarProps {
  role: UserRole
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex h-screen sticky top-0 z-30 flex-col border-r border-white/10 shadow-xl"
      >
        <SidebarNav
          role={role}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </motion.aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-3 left-3 z-40 bg-white shadow-md border"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px] bg-[#0B3C5D]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarNav
            role={role}
            collapsed={false}
            onToggle={() => {}}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
