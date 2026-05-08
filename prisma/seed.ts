import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("OrbitDemo!2026", 12);

  const agency = await prisma.agency.upsert({
    where: { slug: "northstar-clinical-staffing" },
    update: {},
    create: {
      name: "Northstar Clinical Staffing",
      slug: "northstar-clinical-staffing",
      billingEmail: "billing@northstar.example"
    }
  });

  const users = [
    ["Serena Admin", "admin@tritalorbit.com", "SUPER_ADMIN"],
    ["Avery Owner", "owner@tritalorbit.com", "AGENCY_OWNER"],
    ["Riley Recruiter", "recruiter@tritalorbit.com", "RECRUITER"],
    ["Cameron Concierge", "concierge@tritalorbit.com", "CONCIERGE_MANAGER"],
    ["Morgan MSP", "msp@tritalorbit.com", "MSP_VIEWER"],
    ["Maya Clinician", "candidate@tritalorbit.com", "CANDIDATE"],
    ["Jordan Vendor", "vendor@tritalorbit.com", "VENDOR"]
  ] as const;

  for (const [name, email, role] of users) {
    const user = await prisma.user.upsert({
      where: { email },
      update: { passwordHash, role },
      create: { name, email, role, passwordHash }
    });
    if (["AGENCY_OWNER", "RECRUITER"].includes(role)) {
      await prisma.agencyMember.upsert({
        where: { agencyId_userId: { agencyId: agency.id, userId: user.id } },
        update: {},
        create: { agencyId: agency.id, userId: user.id, role }
      });
    }
  }

  const candidate = await prisma.candidate.upsert({
    where: { email: "maya.johnson@example.com" },
    update: {},
    create: {
      agencyId: agency.id,
      name: "Maya Johnson",
      email: "maya.johnson@example.com",
      phone: "555-0188",
      role: "Travel RN",
      specialty: "ICU",
      licenseState: "AZ",
      yearsExperience: 7,
      engagementScore: 82
    }
  });

  const assignment = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      facilityName: "Northlake Medical Center",
      city: "Phoenix",
      state: "AZ",
      specialty: "ICU",
      shift: "Nights, 3x12",
      startDate: new Date("2026-06-03"),
      durationWeeks: 13,
      mspClient: "Premier MSP",
      status: "OFFERED",
      housingStatus: "Options sent",
      travelStatus: "Booked",
      documentsStatus: "Pending license",
      readinessScore: 74
    }
  });

  const offer = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      weeklyPay: 2680,
      taxableRate: 42,
      stipend: 1240,
      totalContractValue: 34840,
      status: "SENT",
      enhancedSummary: "Phoenix ICU assignment with housing, travel, car, and first-week readiness support.",
      valueStatement: "A practical life plan, not just a pay package.",
      smsPitch: "Maya, I packaged this offer with mobility support so the move is easier to say yes to.",
      emailPitch: "Review your TRITAL Orbit assignment hub for pay, housing, travel, and support.",
      pdfReadyOffer: "TRITAL Orbit PDF-ready offer export.",
      closeStrategy: "Confirm housing confidence, then ask for acceptance.",
      candidateConfidence: 86
    }
  });

  await prisma.offerPerk.createMany({
    data: [
      { offerId: offer.id, type: "HOUSING_ASSISTANCE", title: "Housing Assistance", description: "Verified options near facility." },
      { offerId: offer.id, type: "FLIGHT_SUPPORT", title: "Flight Support", description: "Travel planning and reimbursement clarity." },
      { offerId: offer.id, type: "CAR_RENTAL", title: "Car Rental", description: "Transportation coordination." }
    ],
    skipDuplicates: true
  });

  await prisma.housingOption.createMany({
    data: [
      {
        assignmentId: assignment.id,
        title: "Arcadia Furnished Clinical Suite",
        city: "Phoenix",
        state: "AZ",
        distanceToFacility: 2.4,
        monthlyCost: 2250,
        verificationStatus: "VERIFIED",
        rating: 4.9
      },
      {
        assignmentId: assignment.id,
        title: "Desert Ridge Extended Stay",
        city: "Phoenix",
        state: "AZ",
        distanceToFacility: 5.1,
        monthlyCost: 1980,
        verificationStatus: "VERIFIED",
        rating: 4.7
      }
    ],
    skipDuplicates: true
  });

  await prisma.mSPReport.create({
    data: {
      agencyId: agency.id,
      title: "May Workforce Mobility Executive Summary",
      dateRange: "May 2026",
      acceptanceRate: 71.2,
      backoutRate: 6.4,
      timeToReadyDays: 4.6,
      firstDayShowRate: 96.1,
      readinessRate: 82,
      supplierScore: 91,
      aiSummary: "Mobility support is improving acceptance and reducing preventable start risk."
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
