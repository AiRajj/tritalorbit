import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { assessReadiness, type AssignmentReadinessData } from "@/lib/ai"

const readinessSchema = z.object({
  candidateName: z.string().min(1),
  specialty: z.string().min(1),
  facilityName: z.string().min(1),
  startDate: z.string().min(1),
  licenseVerified: z.boolean(),
  licenseState: z.string().min(1),
  licenseExpiry: z.string().optional(),
  backgroundCheckComplete: z.boolean(),
  drugScreenComplete: z.boolean(),
  physicalComplete: z.boolean(),
  credentialingComplete: z.boolean(),
  orientationScheduled: z.boolean(),
  housingArranged: z.boolean(),
  travelArranged: z.boolean(),
  documentsSubmitted: z.array(z.string()),
  documentsRequired: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = readinessSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const assignmentData: AssignmentReadinessData = parsed.data
    const result = await assessReadiness(assignmentData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Readiness assessment error:", error)
    return NextResponse.json({ error: "Failed to assess readiness" }, { status: 500 })
  }
}
