"use client"

import { DashboardSidebar, type UserRole } from "@/components/layout/dashboard-sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: UserRole
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <DashboardSidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader role={role} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
