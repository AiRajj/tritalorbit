import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const activityLogSchema = z.object({
  action: z.string().min(1),
  candidateName: z.string().optional(),
  userId: z.string().optional(),
  resource: z.string().optional(),
  resourceId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = activityLogSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const logEntry = {
      id: `log-${Date.now()}`,
      ...parsed.data,
      timestamp: parsed.data.timestamp || new Date().toISOString(),
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    }

    return NextResponse.json({ log: logEntry, message: "Activity logged" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
