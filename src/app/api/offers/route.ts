import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const offerCreateSchema = z.object({
  candidateName: z.string().min(1),
  candidateEmail: z.string().email(),
  candidatePhone: z.string().optional(),
  candidateRole: z.string().optional(),
  candidateSpecialty: z.string().optional(),
  licenseState: z.string().optional(),
  experienceYears: z.number().optional(),
  facilityName: z.string().min(1),
  facilityCity: z.string().optional(),
  facilityState: z.string().optional(),
  startDate: z.string().optional(),
  durationWeeks: z.number().optional(),
  shift: z.string().optional(),
  assignmentSpecialty: z.string().optional(),
  mspClient: z.string().optional(),
  weeklyPay: z.number().min(0),
  taxableRate: z.number().optional(),
  stipend: z.number().optional(),
  totalContractValue: z.number().optional(),
  flightSupport: z.boolean().optional(),
  housingAssistance: z.boolean().optional(),
  carRental: z.boolean().optional(),
  relocationConcierge: z.boolean().optional(),
  firstWeekReadiness: z.boolean().optional(),
  emergencyHousing: z.boolean().optional(),
  loyaltyRewards: z.boolean().optional(),
  aiBoost: z.any().optional(),
})

const mockOffers = [
  { id: "offer-001", candidateName: "Sarah Johnson", facilityName: "Memorial Medical Center", facilityLocation: "Portland, OR", specialty: "ICU RN", weeklyPay: 2850, status: "SENT", startDate: "2026-06-15", createdAt: "2026-05-05T10:30:00Z" },
  { id: "offer-002", candidateName: "Kevin Hart", facilityName: "St. Luke's Hospital", facilityLocation: "Boise, ID", specialty: "ER RN", weeklyPay: 2400, status: "VIEWED", startDate: "2026-06-15", createdAt: "2026-05-03T14:00:00Z" },
  { id: "offer-003", candidateName: "Nina Patel", facilityName: "Cedar Sinai", facilityLocation: "Los Angeles, CA", specialty: "L&D RN", weeklyPay: 3200, status: "ACCEPTED", startDate: "2026-07-01", createdAt: "2026-04-28T09:00:00Z" },
  { id: "offer-004", candidateName: "Emily Rodriguez", facilityName: "Mass General", facilityLocation: "Boston, MA", specialty: "PACU RN", weeklyPay: 2950, status: "ACCEPTED", startDate: "2026-06-20", createdAt: "2026-04-25T16:00:00Z" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let data = mockOffers
  if (status) data = data.filter((o) => o.status === status)
  if (search) data = data.filter((o) => o.candidateName.toLowerCase().includes(search.toLowerCase()) || o.facilityName.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json({ offers: data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = offerCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newOffer = {
      id: `offer-${Date.now()}`,
      ...parsed.data,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ offer: newOffer, message: "Offer created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
