import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateMSPReport, type MSPReportData } from "@/lib/ai"

const mspReportSchema = z.object({
  organizationName: z.string().min(1),
  reportPeriod: z.string().min(1),
  totalPlacements: z.number().min(0),
  activeCandidates: z.number().min(0),
  fillRate: z.number().min(0).max(100),
  avgTimeToFill: z.number().min(0),
  revenue: z.number().min(0),
  topFacilities: z.array(z.object({
    name: z.string(),
    placements: z.number(),
    fillRate: z.number(),
  })),
  specialtyBreakdown: z.array(z.object({
    specialty: z.string(),
    count: z.number(),
    avgRate: z.number(),
  })),
  retentionRate: z.number().min(0).max(100),
  backoutRate: z.number().min(0).max(100),
  candidateSatisfaction: z.number().min(0).max(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = mspReportSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const reportData: MSPReportData = parsed.data
    const result = await generateMSPReport(reportData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("MSP report error:", error)
    return NextResponse.json({ error: "Failed to generate MSP report" }, { status: 500 })
  }
}
