import { NextRequest, NextResponse } from "next/server"
import { demoRequestSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = demoRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newRequest = {
      id: `demo-${Date.now()}`,
      ...parsed.data,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ demoRequest: newRequest, message: "Demo request submitted successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
