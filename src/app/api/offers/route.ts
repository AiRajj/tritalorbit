import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const offerSchema = z.object({
  candidate: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    role: z.string().min(1),
    specialty: z.string().min(1),
    licenseState: z.string().min(1),
    yearsOfExperience: z.number().min(0),
  }),
  assignment: z.object({
    facilityName: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    startDate: z.string().min(1),
    duration: z.number(),
    shift: z.string().min(1),
    specialty: z.string().min(1),
    mspClient: z.string().optional(),
  }),
  compensation: z.object({
    weeklyPay: z.number().min(0),
    taxableRate: z.number().min(0),
    stipend: z.number().min(0),
    totalContractValue: z.number().min(0),
  }),
  perks: z.object({
    flightSupport: z.boolean(),
    housingAssistance: z.boolean(),
    carRental: z.boolean(),
    relocationConcierge: z.boolean(),
    firstWeekReadiness: z.boolean(),
    emergencyHousing: z.boolean(),
    loyaltyRewards: z.boolean(),
  }),
  aiEnhancement: z
    .object({
      enhancedSummary: z.string().optional(),
      valueStatement: z.string().optional(),
      talkingPoints: z.string().optional(),
      smsPitch: z.string().optional(),
      emailPitch: z.string().optional(),
      closeStrategy: z.string().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = offerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const offerId = uuidv4();
    const token = uuidv4().replace(/-/g, "") + uuidv4().replace(/-/g, "");

    return NextResponse.json(
      {
        success: true,
        data: {
          id: offerId,
          token,
          ...validated.data,
          status: "DRAFT",
          createdAt: new Date().toISOString(),
          candidatePortalUrl: `https://orbit.trital.com/offer/${token}`,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create offer" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const mockOffers = [
    {
      id: "off-001",
      candidate: { firstName: "Sarah", lastName: "Mitchell", role: "RN", specialty: "ICU" },
      assignment: { facilityName: "Cedars-Sinai Medical Center", city: "Los Angeles", state: "CA", duration: 13 },
      compensation: { weeklyPay: 2850, totalContractValue: 37050 },
      status: "SENT",
      createdAt: "2026-04-28T10:30:00Z",
    },
    {
      id: "off-002",
      candidate: { firstName: "James", lastName: "Rodriguez", role: "RT", specialty: "NICU" },
      assignment: { facilityName: "Mayo Clinic", city: "Rochester", state: "MN", duration: 26 },
      compensation: { weeklyPay: 3200, totalContractValue: 83200 },
      status: "ACCEPTED",
      createdAt: "2026-04-25T14:15:00Z",
    },
    {
      id: "off-003",
      candidate: { firstName: "Emily", lastName: "Chen", role: "LPN", specialty: "Med-Surg" },
      assignment: { facilityName: "Johns Hopkins Hospital", city: "Baltimore", state: "MD", duration: 13 },
      compensation: { weeklyPay: 2100, totalContractValue: 27300 },
      status: "DRAFT",
      createdAt: "2026-05-01T09:00:00Z",
    },
    {
      id: "off-004",
      candidate: { firstName: "Marcus", lastName: "Johnson", role: "CNA", specialty: "ER" },
      assignment: { facilityName: "Cleveland Clinic", city: "Cleveland", state: "OH", duration: 8 },
      compensation: { weeklyPay: 1650, totalContractValue: 13200 },
      status: "VIEWED",
      createdAt: "2026-05-03T16:45:00Z",
    },
    {
      id: "off-005",
      candidate: { firstName: "Jessica", lastName: "Patel", role: "RN", specialty: "OR" },
      assignment: { facilityName: "Mass General Hospital", city: "Boston", state: "MA", duration: 52 },
      compensation: { weeklyPay: 3100, totalContractValue: 161200 },
      status: "SENT",
      createdAt: "2026-05-06T11:20:00Z",
    },
  ];

  return NextResponse.json({ success: true, data: mockOffers });
}
