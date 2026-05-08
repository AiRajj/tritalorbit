import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const MOCK_BOOKING_REQUESTS = [
  {
    id: "br-001",
    candidateName: "Sarah Chen",
    offerId: "offer-memorial-001",
    facility: "Memorial Hospital",
    location: "Houston, TX",
    needsFlight: true,
    needsHousing: true,
    needsCar: true,
    moveDate: "2026-06-12",
    budgetRange: "$1,500-$2,000",
    preferredLocation: "Near Texas Medical Center",
    notes: "Would prefer a furnished apartment with in-unit washer/dryer. Flying from Portland, OR.",
    status: "new",
    createdAt: "2026-05-06T14:30:00Z",
  },
  {
    id: "br-002",
    candidateName: "Marcus Johnson",
    offerId: "offer-cedars-002",
    facility: "Cedars-Sinai Medical Center",
    location: "Los Angeles, CA",
    needsFlight: true,
    needsHousing: true,
    needsCar: false,
    moveDate: "2026-06-20",
    budgetRange: "$2,000+",
    preferredLocation: "West Hollywood or Beverly Grove area",
    notes: "Will use public transit. Need a studio or 1BR near the hospital.",
    status: "in_progress",
    createdAt: "2026-05-04T09:15:00Z",
  },
  {
    id: "br-003",
    candidateName: "Emily Rodriguez",
    offerId: "offer-mayo-003",
    facility: "Mayo Clinic",
    location: "Rochester, MN",
    needsFlight: false,
    needsHousing: true,
    needsCar: true,
    moveDate: "2026-07-01",
    budgetRange: "Under $1,000",
    preferredLocation: "Downtown Rochester",
    notes: "Driving from Chicago. Need affordable housing option, open to shared housing.",
    status: "new",
    createdAt: "2026-05-07T16:45:00Z",
  },
  {
    id: "br-004",
    candidateName: "David Kim",
    offerId: "offer-mass-004",
    facility: "Massachusetts General Hospital",
    location: "Boston, MA",
    needsFlight: true,
    needsHousing: true,
    needsCar: false,
    moveDate: "2026-06-25",
    budgetRange: "$1,500-$2,000",
    preferredLocation: "Cambridge or Somerville",
    notes: "Flying from Seattle. Prefer T-accessible location.",
    status: "completed",
    createdAt: "2026-04-28T11:00:00Z",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      offerId,
      needsFlight,
      needsHousing,
      needsCar,
      moveDate,
      budgetRange,
      preferredLocation,
      notes,
    } = body;

    const newRequest = {
      id: uuidv4(),
      offerId,
      needsFlight: needsFlight || false,
      needsHousing: needsHousing || false,
      needsCar: needsCar || false,
      moveDate,
      budgetRange,
      preferredLocation,
      notes,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    console.log("Booking request created:", newRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Your mobility support request has been submitted! Our concierge team will begin coordinating your needs within 24 hours.",
        request: newRequest,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to submit booking request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    requests: MOCK_BOOKING_REQUESTS,
    total: MOCK_BOOKING_REQUESTS.length,
  });
}
