import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const candidateCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  specialty: z.string().min(1),
  licenseNumber: z.string().optional(),
  licenseState: z.string().optional(),
  yearsExperience: z.number().optional(),
  preferredShifts: z.array(z.string()).optional(),
  preferredStates: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_ASSIGNMENT", "DO_NOT_CONTACT"]).default("ACTIVE"),
})

const mockCandidates = [
  { id: "cand-001", firstName: "Sarah", lastName: "Johnson", email: "sarah@email.com", specialty: "ICU RN", licenseState: "OR", yearsExperience: 8, status: "ACTIVE", createdAt: "2026-01-15" },
  { id: "cand-002", firstName: "Kevin", lastName: "Hart", email: "kevin@email.com", specialty: "ER RN", licenseState: "ID", yearsExperience: 5, status: "ACTIVE", createdAt: "2026-02-20" },
  { id: "cand-003", firstName: "Nina", lastName: "Patel", email: "nina@email.com", specialty: "L&D RN", licenseState: "CA", yearsExperience: 3, status: "ON_ASSIGNMENT", createdAt: "2026-03-10" },
  { id: "cand-004", firstName: "Emily", lastName: "Rodriguez", email: "emily@email.com", specialty: "PACU RN", licenseState: "MA", yearsExperience: 12, status: "ACTIVE", createdAt: "2025-11-01" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let data = mockCandidates
  if (status) data = data.filter((c) => c.status === status)
  if (search) {
    const q = search.toLowerCase()
    data = data.filter((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
  }

  return NextResponse.json({ candidates: data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = candidateCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newCandidate = {
      id: `cand-${Date.now()}`,
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ candidate: newCandidate, message: "Candidate created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
