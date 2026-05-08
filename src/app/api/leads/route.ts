import { NextRequest, NextResponse } from "next/server"
import { leadSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newLead = {
      id: `lead-${Date.now()}`,
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ lead: newLead, message: "Lead created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
