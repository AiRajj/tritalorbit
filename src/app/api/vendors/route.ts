import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const vendorCreateSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["HOUSING", "CAR_RENTAL", "TRAVEL", "OTHER"]),
  city: z.string().min(1),
  state: z.string().min(1),
  description: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  website: z.string().optional(),
})

const mockVendors = [
  { id: "v-001", name: "HomeFinder Pro", type: "HOUSING", city: "Portland", state: "OR", rating: 4.9, verified: true, status: "ACTIVE", listings: 18, createdAt: "2025-01-15" },
  { id: "v-002", name: "TravelNurse Homes", type: "HOUSING", city: "Los Angeles", state: "CA", rating: 4.7, verified: true, status: "ACTIVE", listings: 34, createdAt: "2025-03-20" },
  { id: "v-003", name: "AutoRent Healthcare", type: "CAR_RENTAL", city: "Nationwide", state: "US", rating: 4.5, verified: true, status: "ACTIVE", listings: 0, createdAt: "2025-02-10" },
  { id: "v-004", name: "SkyBridge Travel", type: "TRAVEL", city: "Nationwide", state: "US", rating: 4.6, verified: true, status: "ACTIVE", listings: 0, createdAt: "2025-04-05" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const state = searchParams.get("state")
  const verified = searchParams.get("verified")

  let data = mockVendors
  if (type) data = data.filter((v) => v.type === type)
  if (state) data = data.filter((v) => v.state === state)
  if (verified === "true") data = data.filter((v) => v.verified)

  return NextResponse.json({ vendors: data, total: data.length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = vendorCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newVendor = {
      id: `v-${Date.now()}`,
      ...parsed.data,
      rating: 0,
      verified: false,
      status: "PENDING",
      listings: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ vendor: newVendor, message: "Vendor created successfully" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
