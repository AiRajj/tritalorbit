import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { conciergeAssist, type ConciergeTaskData } from "@/lib/ai"

const conciergeSchema = z.object({
  candidateName: z.string().min(1),
  taskType: z.enum(["HOUSING", "TRAVEL", "LICENSING", "GENERAL", "BENEFITS", "PAYROLL"]),
  question: z.string().min(1),
  assignmentLocation: z.string().optional(),
  assignmentStartDate: z.string().optional(),
  context: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = conciergeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const taskData: ConciergeTaskData = parsed.data
    const result = await conciergeAssist(taskData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Concierge assist error:", error)
    return NextResponse.json({ error: "Failed to process concierge request" }, { status: 500 })
  }
}
