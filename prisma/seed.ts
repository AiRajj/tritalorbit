import { hash } from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Password123!", 12);

  await prisma.$transaction([
    prisma.auditLog.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.aIInsight.deleteMany(),
    prisma.retentionRiskScore.deleteMany(),
    prisma.conciergeTask.deleteMany(),
    prisma.bookingRequest.deleteMany(),
    prisma.offerPerk.deleteMany(),
    prisma.offer.deleteMany(),
    prisma.documentVault.deleteMany(),
    prisma.assignment.deleteMany(),
    prisma.travelOption.deleteMany(),
    prisma.carRentalOption.deleteMany(),
    prisma.vendorHousingOption.deleteMany(),
    prisma.landlordHousingOption.deleteMany(),
    prisma.housingOption.deleteMany(),
    prisma.candidate.deleteMany(),
    prisma.agencyMember.deleteMany(),
    prisma.paymentRecord.deleteMany(),
    prisma.subscriptionPlan.deleteMany(),
    prisma.mSPReport.deleteMany(),
    prisma.vendor.deleteMany(),
    prisma.landlord.deleteMany(),
    prisma.passwordResetToken.deleteMany(),
    prisma.activityLog.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.demoRequest.deleteMany(),
    prisma.lead.deleteMany(),
    prisma.agency.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const [admin, owner, recruiter, concierge, mspUser, candidateUser, vendorUser] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Orbit Admin",
        email: "admin@tritalorbit.com",
        role: Role.SUPER_ADMIN,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Avery Agency",
        email: "owner@tritalorbit.com",
        role: Role.AGENCY_OWNER,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Riley Recruiter",
        email: "recruiter@tritalorbit.com",
        role: Role.RECRUITER,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Casey Concierge",
        email: "concierge@tritalorbit.com",
        role: Role.CONCIERGE_MANAGER,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Morgan MSP",
        email: "msp@tritalorbit.com",
        role: Role.MSP_VIEWER,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Jordan Clinician",
        email: "candidate@tritalorbit.com",
        role: Role.CANDIDATE,
        passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Taylor Vendor",
        email: "vendor@tritalorbit.com",
        role: Role.VENDOR_LANDLORD,
        passwordHash,
      },
    }),
  ]);

  const agency = await prisma.agency.create({
    data: {
      name: "TRITAL Care Staffing",
      slug: "trital-care-staffing",
      supportEmail: "support@tritalorbit.com",
      supportPhone: "+1-555-0100",
    },
  });

  await prisma.agencyMember.createMany({
    data: [
      { agencyId: agency.id, userId: owner.id, isPrimary: true },
      { agencyId: agency.id, userId: recruiter.id },
      { agencyId: agency.id, userId: concierge.id },
    ],
  });

  const candidate = await prisma.candidate.create({
    data: {
      agencyId: agency.id,
      userId: candidateUser.id,
      fullName: "Jordan Clinician",
      email: candidateUser.email,
      phone: "+1-555-0112",
      roleTitle: "Travel RN",
      specialty: "ER",
      licenseState: "TX",
      yearsExperience: 6,
      engagementScore: 74,
    },
  });

  const assignment = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      facilityName: "St. Helena Medical Center",
      city: "Austin",
      state: "TX",
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      durationWeeks: 13,
      shift: "Nights",
      specialty: "ER",
      mspClientName: "Prime MSP",
      status: "IN_PROGRESS",
      housingStatus: "IN_PROGRESS",
      travelStatus: "PENDING",
      documentsStatus: "IN_PROGRESS",
      firstWeekReadiness: 62,
    },
  });

  const offer = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      assignmentId: assignment.id,
      candidateId: candidate.id,
      recruiterId: recruiter.id,
      weeklyPay: 3150,
      taxableRate: 1780,
      stipend: 1370,
      estimatedContractValue: 40950,
      status: "SENT",
      sentAt: new Date(),
      confidenceScore: 81,
      aiEnhancedSummary:
        "High-confidence ER assignment with concierge-backed mobility perks and fast launch support.",
      aiCloseStrategy:
        "Address housing and first-week schedule certainty to secure acceptance this week.",
      perks: {
        createMany: {
          data: [
            {
              type: "HOUSING_ASSISTANCE",
              title: "Housing Assistance",
              description: "Verified furnished options near facility",
              included: true,
            },
            {
              type: "FLIGHT_SUPPORT",
              title: "Flight Support",
              description: "Travel planning and booking support",
              included: true,
            },
            {
              type: "CAR_RENTAL",
              title: "Car Rental",
              description: "Reduced-rate vehicle options",
              included: false,
            },
          ],
        },
      },
    },
  });

  const booking = await prisma.bookingRequest.create({
    data: {
      offerId: offer.id,
      assignmentId: assignment.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      ownerId: concierge.id,
      needFlight: true,
      needHousing: true,
      needCar: false,
      budgetRange: "$1,600 - $2,200 / month",
      preferredLocation: "Within 10 miles of facility",
      status: "IN_PROGRESS",
      timelineNote: "Candidate requested updated housing shortlist",
    },
  });

  await prisma.conciergeTask.create({
    data: {
      bookingRequestId: booking.id,
      candidateId: candidate.id,
      ownerId: concierge.id,
      title: "Finalize top 3 housing options",
      details: "Include commute estimates and lease flexibility",
      status: "IN_PROGRESS",
    },
  });

  await prisma.retentionRiskScore.create({
    data: {
      candidateId: candidate.id,
      offerId: offer.id,
      score: 68,
      label: "MEDIUM",
      reasoning: "Start date is close and housing not finalized.",
      suggestedAction: "Prioritize housing close + same-day recruiter check-in.",
      suggestedSms:
        "I can lock in your preferred neighborhood options today and make sure your move is fully supported.",
      suggestedCallScript:
        "Let’s remove your move uncertainty now so this assignment starts strong.",
    },
  });

  await prisma.activityLog.createMany({
    data: [
      {
        action: "OFFER_SENT",
        userId: recruiter.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        offerId: offer.id,
      },
      {
        action: "CANDIDATE_VIEWED_OFFER",
        candidateId: candidate.id,
        assignmentId: assignment.id,
        offerId: offer.id,
      },
      {
        action: "BOOKING_REQUEST_CREATED",
        userId: candidateUser.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        offerId: offer.id,
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: recruiter.id,
        type: "ACTION_REQUIRED",
        title: "Candidate requires housing closure",
        message: "Finalize housing options before assignment start date.",
      },
      {
        userId: concierge.id,
        type: "INFO",
        title: "New booking request assigned",
        message: "Jordan Clinician needs housing + flight support.",
      },
      {
        userId: mspUser.id,
        type: "INFO",
        title: "Monthly supplier report ready",
        message: "MSP dashboard has fresh acceptance and readiness metrics.",
      },
    ],
  });

  await prisma.vendor.create({
    data: {
      agencyId: agency.id,
      userId: vendorUser.id,
      companyName: "Orbit Housing Partners",
      category: "Housing",
      city: "Austin",
      state: "TX",
      verificationStatus: "VERIFIED",
      rating: 4.8,
      contactEmail: vendorUser.email,
      contactPhone: "+1-555-0144",
    },
  });

  const landlord = await prisma.landlord.create({
    data: {
      companyName: "Longhorn Residences",
      city: "Austin",
      state: "TX",
      verificationStatus: "VERIFIED",
      rating: 4.7,
      contactEmail: "leasing@longhornresidences.com",
    },
  });

  const housing = await prisma.housingOption.create({
    data: {
      candidateId: candidate.id,
      assignmentCity: "Austin",
      assignmentState: "TX",
      propertyName: "South Lamar Suites",
      monthlyCost: 1890,
      distanceToFacility: 6.2,
      availableFrom: new Date(),
      verificationStatus: "VERIFIED",
      rating: 4.6,
      contactEmail: "stay@southlamarsuites.com",
    },
  });

  await prisma.landlordHousingOption.create({
    data: {
      landlordId: landlord.id,
      housingOptionId: housing.id,
    },
  });

  await prisma.travelOption.create({
    data: {
      candidateId: candidate.id,
      provider: "SkyMiles Health Travel",
      departureCity: "Nashville",
      arrivalCity: "Austin",
      price: 320,
      refundable: true,
      departureDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
    },
  });

  await prisma.carRentalOption.create({
    data: {
      candidateId: candidate.id,
      provider: "Orbit Rentals",
      city: "Austin",
      state: "TX",
      weeklyCost: 249,
      vehicleType: "Compact SUV",
      availableFrom: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
    },
  });

  await prisma.subscriptionPlan.create({
    data: {
      agencyId: agency.id,
      planName: "Scale",
      seats: 35,
      status: "ACTIVE",
      renewsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      paymentRecords: {
        create: {
          amount: 6000,
          currency: "USD",
          status: "PAID",
          paidAt: new Date(),
        },
      },
    },
  });

  await prisma.mSPReport.create({
    data: {
      agencyId: agency.id,
      periodStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      periodEnd: new Date(),
      acceptanceRate: 76,
      backoutRate: 12,
      timeToReadyDays: 6.1,
      showUpRate: 93,
      readinessRate: 81,
      aiExecutiveSummary:
        "Mobility-enabled assignments continue to outperform baseline on acceptance and show-up metrics.",
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      entityType: "SYSTEM",
      entityId: "seed",
      action: "SEED_COMPLETED",
      diff: { message: "Seed data loaded" },
    },
  });

  await prisma.lead.create({
    data: {
      type: "LEAD",
      firstName: "Parker",
      lastName: "Lane",
      email: "parker@sampleagency.com",
      company: "Sample Agency Group",
      role: "VP Operations",
      message: "Need to reduce offer fallout in hard-to-fill markets.",
    },
  });

  await prisma.demoRequest.create({
    data: {
      fullName: "Morgan Pipeline",
      email: "morgan@primehealthstaff.com",
      company: "Prime Health Staffing",
      role: "Director of Recruitment",
      teamSize: "45",
      monthlyPlacements: "110",
      goals: "Improve assignment readiness and reduce start-date backouts.",
    },
  });

  console.log("Seed complete. Demo accounts use password: Password123!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
