import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const bookingRequestSchema = z.object({
  needFlight: z.boolean().optional(),
  needHousing: z.boolean().optional(),
  needCar: z.boolean().optional(),
  moveDate: z.string().min(1),
  budgetMin: z.number().min(0),
  budgetMax: z.number().min(0),
  preferredLocation: z.string().optional(),
  notes: z.string().optional(),
  candidateId: z.string().optional(),
  offerId: z.string().optional(),
})

const mockRequests = [
  { id: "br-001", candidateName: "Sarah Johnson", services: ["Flight", "Housing"], moveDate: "2026-06-10", status: "NEW", concierge: "Lisa Park", createdAt: "2026-05-08T01:00:00Z" },
  { id: "br-002", candidateName: "Kevin Hart", services: ["Housing", "Car"], moveDate: "2026-06-15", status: "IN_PROGRESS", concierge: "Lisa Park", createdAt: "2026-05-07T08:00:00Z" },
  { id: "br-003", candidateName: "Nina Patel", services: ["Flight", "Housing", "Car"], moveDate: "2026-07-01", status: "IN_PROGRESS", concierge: "David Kim", createdAt: "2026-05-06T12:00:00Z" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  let data = mockRequests
  if (status) data = data.filter((r) => r.status === status)

  return NextResponse.json({ bookingRequests: data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = bookingRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newRequest = {
      id: `br-${Date.now()}`,
      ...parsed.data,
      status: "NEW",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ bookingRequest: newRequest, message: "Booking request submitted successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
