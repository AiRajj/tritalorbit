import { NextResponse } from "next/server"

export async function GET() {
  const stats = {
    totalAgencies: 247,
    activeUsers: 3842,
    totalOffers: 12456,
    activeCandidates: 8291,
    activeVendors: 156,
    monthlyRevenue: 284000,
    offerAcceptanceRate: 73.2,
    backoutRate: 8.4,
    avgTimeToReady: 6.2,
    firstDayShowRate: 96.1,
    aiCallsToday: 1245,
    aiTokensToday: 342000,
    systemHealth: {
      apiResponseTime: 45,
      databasePerformance: 12,
      aiModelUptime: 99.9,
      storageUsage: 67,
    },
    recentActivity: [
      { type: "agency_upgrade", message: "NovaMed Recruiting upgraded to Enterprise", timestamp: "2026-05-08T03:15:00Z" },
      { type: "new_registration", message: "New agency registration: MedForce Staffing", timestamp: "2026-05-08T02:45:00Z" },
      { type: "high_usage", message: "Acme Health Staffing used 45K AI tokens today", timestamp: "2026-05-08T02:00:00Z" },
      { type: "system", message: "Database optimization completed", timestamp: "2026-05-08T01:00:00Z" },
    ],
  }

  return NextResponse.json(stats)
}
