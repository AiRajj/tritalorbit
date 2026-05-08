import { PrismaClient, Role, OfferStatus, BookingStatus, VerificationStatus, ReadinessStatus, TaskStatus, Priority, AIInsightType, NotificationType, LeadSource } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Orbit123!", 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@tritalorbit.com" },
    update: {},
    create: {
      email: "admin@tritalorbit.com",
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      passwordHash
    }
  });

  const agencyOwner = await prisma.user.upsert({
    where: { email: "owner@northstarstaffing.com" },
    update: {},
    create: {
      email: "owner@northstarstaffing.com",
      name: "Avery Collins",
      role: Role.AGENCY_OWNER,
      passwordHash
    }
  });

  const recruiter = await prisma.user.upsert({
    where: { email: "recruiter@northstarstaffing.com" },
    update: {},
    create: {
      email: "recruiter@northstarstaffing.com",
      name: "Maya Thompson",
      role: Role.RECRUITER,
      passwordHash
    }
  });

  const conciergeManager = await prisma.user.upsert({
    where: { email: "concierge@northstarstaffing.com" },
    update: {},
    create: {
      email: "concierge@northstarstaffing.com",
      name: "Jordan Lee",
      role: Role.CONCIERGE_MANAGER,
      passwordHash
    }
  });

  const mspViewer = await prisma.user.upsert({
    where: { email: "msp@caregroup.com" },
    update: {},
    create: {
      email: "msp@caregroup.com",
      name: "Priya Shah",
      role: Role.MSP_VIEWER,
      passwordHash
    }
  });

  const candidateUser = await prisma.user.upsert({
    where: { email: "candidate@nursemail.com" },
    update: {},
    create: {
      email: "candidate@nursemail.com",
      name: "Taylor Morgan",
      role: Role.CANDIDATE,
      passwordHash
    }
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@mobilitystay.com" },
    update: {},
    create: {
      email: "vendor@mobilitystay.com",
      name: "Mobility Stay",
      role: Role.VENDOR_LANDLORD,
      passwordHash
    }
  });

  const agency = await prisma.agency.upsert({
    where: { slug: "northstar-staffing" },
    update: {},
    create: {
      name: "Northstar Staffing",
      slug: "northstar-staffing",
      ownerId: agencyOwner.id
    }
  });

  await prisma.agencyMember.upsert({
    where: { agencyId_userId: { agencyId: agency.id, userId: agencyOwner.id } },
    update: { role: Role.AGENCY_OWNER },
    create: { agencyId: agency.id, userId: agencyOwner.id, role: Role.AGENCY_OWNER, title: "Owner" }
  });

  await prisma.agencyMember.upsert({
    where: { agencyId_userId: { agencyId: agency.id, userId: recruiter.id } },
    update: { role: Role.RECRUITER },
    create: { agencyId: agency.id, userId: recruiter.id, role: Role.RECRUITER, title: "Recruiter" }
  });

  await prisma.agencyMember.upsert({
    where: { agencyId_userId: { agencyId: agency.id, userId: conciergeManager.id } },
    update: { role: Role.CONCIERGE_MANAGER },
    create: { agencyId: agency.id, userId: conciergeManager.id, role: Role.CONCIERGE_MANAGER, title: "Concierge Manager" }
  });

  const candidate = await prisma.candidate.upsert({
    where: { userId: candidateUser.id },
    update: {},
    create: {
      userId: candidateUser.id,
      agencyId: agency.id,
      name: "Taylor Morgan",
      email: candidateUser.email,
      phone: "+1 (555) 012-0109",
      role: "RN",
      specialty: "ICU",
      licenseState: "TX",
      experienceYears: 6,
      engagementScore: 74
    }
  });

  const assignment = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      facilityName: "Baylor Regional Medical Center",
      city: "Dallas",
      state: "TX",
      mspClient: "CareFirst MSP",
      role: "Registered Nurse",
      specialty: "ICU",
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      durationWeeks: 13,
      shift: "Nights",
      readinessStatus: ReadinessStatus.IN_PROGRESS,
      documentsStatus: ReadinessStatus.IN_PROGRESS,
      housingStatus: ReadinessStatus.NOT_STARTED,
      travelStatus: ReadinessStatus.IN_PROGRESS,
      firstWeekReadiness: 62
    }
  });

  const offer = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      recruiterId: recruiter.id,
      status: OfferStatus.SENT,
      weeklyPay: 2875,
      taxableRate: 58.5,
      stipend: 1240,
      estimatedContractValue: 37375,
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      enhancedOfferSummary: "13-week ICU assignment in Dallas with concierge mobility support and fast-track first-week readiness package.",
      candidateValueStatement: "This offer gives you high earnings plus a frictionless relocation and housing start.",
      recruiterTalkingPoints: "Lead with Dallas ICU growth and first-week concierge support.",
      smsPitch: "Taylor, this Dallas ICU role is $2,875/wk plus concierge housing + travel support. Ready to launch?",
      emailPitch: "Your Dallas ICU assignment with TRITAL Orbit support",
      closeStrategy: "Reinforce speed-to-ready and housing certainty in the first call.",
      pdfReadyOffer: "Offer PDF content placeholder",
      candidateConfidenceScore: 82,
      perks: {
        createMany: {
          data: [
            { name: "Flight Support", enabled: true },
            { name: "Housing Assistance", enabled: true },
            { name: "Car Rental", enabled: true },
            { name: "Relocation Concierge", enabled: true },
            { name: "First Week Readiness", enabled: true },
            { name: "Emergency Housing Support", enabled: false },
            { name: "Loyalty Rewards", enabled: true }
          ]
        }
      }
    }
  });

  const vendor = await prisma.vendor.create({
    data: {
      ownerId: vendorUser.id,
      name: "Mobility Stay",
      category: "Housing",
      city: "Dallas",
      state: "TX",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.8,
      contactEmail: vendorUser.email,
      contactPhone: "+1 (555) 012-1123"
    }
  });

  await prisma.landlord.create({
    data: {
      ownerId: vendorUser.id,
      companyName: "Trusted Nurse Housing",
      city: "Dallas",
      state: "TX",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.7,
      contactEmail: "landlord@trustednursehousing.com"
    }
  });

  await prisma.housingOption.create({
    data: {
      assignmentId: assignment.id,
      vendorId: vendor.id,
      title: "Furnished 1BR near Baylor",
      city: "Dallas",
      state: "TX",
      distanceMiles: 2.4,
      monthlyCost: 2100,
      availableFrom: new Date(),
      isVerified: true,
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.9
    }
  });

  await prisma.travelOption.create({
    data: {
      assignmentId: assignment.id,
      vendorId: vendor.id,
      providerName: "Orbit Air Desk",
      city: "Dallas",
      state: "TX",
      estimatedCost: 350,
      availableFrom: new Date(),
      verificationStatus: VerificationStatus.VERIFIED
    }
  });

  await prisma.carRentalOption.create({
    data: {
      assignmentId: assignment.id,
      vendorId: vendor.id,
      providerName: "Premier Wheels",
      city: "Dallas",
      state: "TX",
      weeklyCost: 220,
      availableFrom: new Date(),
      verificationStatus: VerificationStatus.VERIFIED
    }
  });

  const booking = await prisma.bookingRequest.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      offerId: offer.id,
      needFlight: true,
      needHousing: true,
      needCar: false,
      moveDate: assignment.startDate,
      budgetRange: "$1,800 - $2,300",
      preferredLocation: "Within 20 min of facility",
      notes: "Pet-friendly requested",
      status: BookingStatus.IN_PROGRESS
    }
  });

  await prisma.conciergeTask.create({
    data: {
      agencyId: agency.id,
      bookingRequestId: booking.id,
      assignmentId: assignment.id,
      candidateId: candidate.id,
      ownerId: conciergeManager.id,
      title: "Secure housing shortlist",
      description: "Provide 3 verified housing options within budget.",
      status: TaskStatus.IN_PROGRESS,
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24)
    }
  });

  await prisma.retentionRiskScore.create({
    data: {
      candidateId: candidate.id,
      assignmentId: assignment.id,
      offerId: offer.id,
      score: 68,
      label: "Medium",
      reasoning: "Offer viewed but housing still unresolved with less than 2 weeks to start.",
      suggestedAction: "Call candidate within 4 hours and present verified housing shortlist.",
      suggestedSms: "Taylor, we found verified housing options near your Dallas facility. Can we review together in the next 15 minutes?",
      suggestedCallScript: "Open with support confidence, then close on reduced move friction and first-week logistics."
    }
  });

  await prisma.aIInsight.createMany({
    data: [
      {
        type: AIInsightType.OFFER_BOOST,
        agencyId: agency.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        offerId: offer.id,
        title: "Offer positioning enhancement",
        content: "Lead with certainty: verified housing, travel booking, and first-week concierge touchpoint.",
        model: "mock-offer-agent"
      },
      {
        type: AIInsightType.READINESS,
        agencyId: agency.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        title: "Readiness gap summary",
        content: "Housing selection pending; documents at 70%; travel ready for booking.",
        model: "mock-readiness-agent"
      }
    ]
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: recruiter.id,
        type: NotificationType.ACTION_REQUIRED,
        title: "Housing friction detected",
        message: "Candidate viewed offer but has not finalized housing support."
      },
      {
        userId: conciergeManager.id,
        type: NotificationType.INFO,
        title: "New concierge task",
        message: "Secure housing shortlist for Taylor Morgan by tomorrow."
      }
    ]
  });

  await prisma.subscriptionPlan.create({
    data: {
      agencyId: agency.id,
      name: "Enterprise Orbit",
      seats: 42,
      stripePriceId: "price_orbit_enterprise",
      renewalAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      payments: {
        create: {
          agencyId: agency.id,
          amount: 5500,
          currency: "USD",
          status: "SUCCEEDED",
          stripePaymentId: "pi_orbit_seed_001",
          paidAt: new Date()
        }
      }
    }
  });

  await prisma.mSPReport.create({
    data: {
      agencyId: agency.id,
      generatedById: mspViewer.id,
      periodStart: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      periodEnd: new Date(),
      acceptanceRate: 0.84,
      backoutRate: 0.07,
      timeToReadyDays: 4.2,
      firstDayShowRate: 0.93,
      readinessRate: 0.88,
      supplierPerformance: { topSupplier: "Northstar Staffing", score: 91 },
      aiExecutiveSummary: "TRITAL Orbit-supported assignments outperform baseline with stronger readiness and lower backout risk."
    }
  });

  await prisma.activityLog.createMany({
    data: [
      {
        agencyId: agency.id,
        actorId: recruiter.id,
        candidateId: candidate.id,
        offerId: offer.id,
        assignmentId: assignment.id,
        action: "offer.sent",
        metadata: { channel: "email" }
      },
      {
        agencyId: agency.id,
        actorId: candidateUser.id,
        candidateId: candidate.id,
        offerId: offer.id,
        assignmentId: assignment.id,
        action: "candidate.offer.viewed",
        metadata: { source: "candidate-hub" }
      }
    ]
  });

  await prisma.auditLog.create({
    data: {
      agencyId: agency.id,
      actorId: superAdmin.id,
      action: "vendor.verified",
      targetType: "Vendor",
      targetId: vendor.id,
      metadata: { status: "VERIFIED" }
    }
  });

  await prisma.lead.create({
    data: {
      source: LeadSource.PRICING,
      name: "Nina Patel",
      workEmail: "nina@talentopshealth.com",
      company: "TalentOps Health",
      teamSize: "51-200",
      message: "Interested in rollout for 5 states."
    }
  });

  await prisma.demoRequest.create({
    data: {
      name: "Ryan Cooper",
      workEmail: "ryan@staffops.com",
      company: "StaffOps",
      role: "VP Operations",
      monthlyPlacements: 85,
      painPoint: "Backouts in high-cost metro assignments"
    }
  });

  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
