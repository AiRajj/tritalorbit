import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { generateOfferBoost, type OfferData } from "@/lib/ai"

const offerBoostSchema = z.object({
  candidateName: z.string().min(1),
  specialty: z.string().min(1),
  facilityName: z.string().min(1),
  facilityLocation: z.string().min(1),
  payRate: z.number().min(0),
  shiftType: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  housingStipend: z.number().optional(),
  mealStipend: z.number().optional(),
  travelReimbursement: z.number().optional(),
  bonusAmount: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = offerBoostSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const offerData: OfferData = parsed.data
    const result = await generateOfferBoost(offerData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Offer boost error:", error)
    return NextResponse.json({ error: "Failed to generate offer boost" }, { status: 500 })
  }
}
