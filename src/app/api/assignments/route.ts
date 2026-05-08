import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const assignmentCreateSchema = z.object({
  candidateId: z.string().min(1),
  offerId: z.string().min(1),
  facilityName: z.string().min(1),
  facilityLocation: z.string().min(1),
  specialty: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  payRate: z.number().min(0),
  status: z.enum(["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"]).default("PENDING"),
})

const mockAssignments = [
  { id: "asgn-001", candidateName: "Sarah Johnson", facilityName: "Memorial Medical Center", location: "Portland, OR", specialty: "ICU RN", startDate: "2026-06-15", endDate: "2026-09-14", payRate: 2850, status: "PENDING" },
  { id: "asgn-002", candidateName: "Nina Patel", facilityName: "Cedar Sinai", location: "Los Angeles, CA", specialty: "L&D RN", startDate: "2026-07-01", endDate: "2026-09-30", payRate: 3200, status: "PENDING" },
  { id: "asgn-003", candidateName: "Emily Rodriguez", facilityName: "Mass General", location: "Boston, MA", specialty: "PACU RN", startDate: "2026-06-20", endDate: "2026-09-19", payRate: 2950, status: "ACTIVE" },
  { id: "asgn-004", candidateName: "Ashley Brown", facilityName: "Johns Hopkins", location: "Baltimore, MD", specialty: "OR Tech", startDate: "2026-06-28", endDate: "2026-09-27", payRate: 2200, status: "PENDING" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let data = mockAssignments
  if (status) data = data.filter((a) => a.status === status)
  if (search) {
    const q = search.toLowerCase()
    data = data.filter((a) => a.candidateName.toLowerCase().includes(q) || a.facilityName.toLowerCase().includes(q))
  }

  return NextResponse.json({ assignments: data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = assignmentCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newAssignment = {
      id: `asgn-${Date.now()}`,
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ assignment: newAssignment, message: "Assignment created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
