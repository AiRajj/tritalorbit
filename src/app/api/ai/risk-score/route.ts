import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { calculateRetentionRisk, type CandidateRetentionData } from "@/lib/ai"

const riskScoreSchema = z.object({
  name: z.string().min(1),
  specialty: z.string().min(1),
  currentAssignment: z.object({
    facilityName: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    payRate: z.number(),
    weeksRemaining: z.number(),
  }).optional(),
  previousAssignments: z.number().default(0),
  completedAssignments: z.number().default(0),
  backoutHistory: z.number().default(0),
  lastContactDate: z.string(),
  responsiveness: z.enum(["HIGH", "MEDIUM", "LOW"]),
  satisfactionScore: z.number().optional(),
  housingIssues: z.boolean().optional(),
  payDiscrepancies: z.boolean().optional(),
  recentComplaints: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = riskScoreSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const candidateData: CandidateRetentionData = parsed.data
    const result = await calculateRetentionRisk(candidateData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Risk score error:", error)
    return NextResponse.json({ error: "Failed to calculate risk score" }, { status: 500 })
  }
}
