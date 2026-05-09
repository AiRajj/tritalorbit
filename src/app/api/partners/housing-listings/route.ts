import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { partnerHousingListingSchema } from "@/lib/validators/phase3";

export async function GET() {
  const listings = await prisma.partnerHousingListing.findMany({
    include: { vendor: true },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return NextResponse.json({ listings });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = partnerHousingListingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid listing payload" }, { status: 400 });
  }

  const listing = await prisma.partnerHousingListing.create({
    data: {
      vendorId: parsed.data.vendorId,
      propertyType: parsed.data.propertyType,
      furnished: parsed.data.furnished,
      monthlyCost: parsed.data.monthlyCost,
      deposit: parsed.data.deposit,
      utilitiesIncluded: parsed.data.utilitiesIncluded ?? false,
      leaseFlexibility: parsed.data.leaseFlexibility,
      petFriendly: parsed.data.petFriendly ?? false,
      parking: parsed.data.parking ?? false,
      distanceToFacility: parsed.data.distanceToFacility,
      safetyNotes: parsed.data.safetyNotes
    }
  });

  return NextResponse.json({ listing }, { status: 201 });
}
