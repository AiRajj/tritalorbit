import { NextResponse } from "next/server";

import { prisma, safeDb } from "@/lib/db";
import { createConciergeTaskForBookingRequest } from "@/lib/services/automation";
import { bookingRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const parsed = bookingRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking request", issues: parsed.error.flatten() }, { status: 400 });
  }

  const fallbackId = "booking-request-demo";
  const bookingRequest = await safeDb(async () => {
    const agency =
      (await prisma.agency.findFirst()) ||
      (await prisma.agency.create({ data: { name: "Northstar Clinical Staffing", slug: "northstar-clinical-staffing" } }));
    const candidate =
      (await prisma.candidate.findFirst()) ||
      (await prisma.candidate.create({
        data: {
          agencyId: agency.id,
          name: "Maya Johnson",
          email: "maya.johnson@example.com",
          role: "Travel RN",
          specialty: "ICU",
          licenseState: "AZ",
          yearsExperience: 7
        }
      }));
    const assignment =
      (await prisma.assignment.findFirst()) ||
      (await prisma.assignment.create({
        data: {
          agencyId: agency.id,
          candidateId: candidate.id,
          facilityName: "Northlake Medical Center",
          city: "Phoenix",
          state: "AZ",
          startDate: new Date(parsed.data.moveDate),
          durationWeeks: 13,
          shift: "Nights",
          specialty: "ICU"
        }
      }));
    const created = await prisma.bookingRequest.create({
      data: {
        agencyId: agency.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        offerId: parsed.data.offerId === "orbit-demo-offer" ? undefined : parsed.data.offerId,
        needsFlight: parsed.data.needsFlight,
        needsHousing: parsed.data.needsHousing,
        needsCar: parsed.data.needsCar,
        moveDate: new Date(parsed.data.moveDate),
        budgetRange: parsed.data.budgetRange,
        preferredLocation: parsed.data.preferredLocation,
        notes: parsed.data.notes
      }
    });
    await createConciergeTaskForBookingRequest(created.id);
    return created;
  }, { id: fallbackId, ...parsed.data });

  return NextResponse.json({ ok: true, bookingRequest });
}
