import {
  PrismaClient,
  Role,
  OfferStatus,
  BookingStatus,
  VerificationStatus,
  ReadinessStatus,
  TaskStatus,
  Priority,
  AIInsightType,
  NotificationType,
  LeadSource,
  MobilityRequestType,
  MobilityRequestStatus,
  MobilityBidStatus,
  MobilityBookingStatus,
  MobilityPaymentResponsibility,
  UrgencyLevel,
  VendorCategory
} from "@prisma/client";
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

  // --- Module 12: Live Mobility Exchange seed ---

  const travelVendorUser = await prisma.user.upsert({
    where: { email: "ops@orbitair.com" },
    update: {},
    create: {
      email: "ops@orbitair.com",
      name: "Orbit Air Desk",
      role: Role.VENDOR_LANDLORD,
      passwordHash
    }
  });

  const carVendorUser = await prisma.user.upsert({
    where: { email: "fleet@premierwheels.com" },
    update: {},
    create: {
      email: "fleet@premierwheels.com",
      name: "Premier Wheels",
      role: Role.VENDOR_LANDLORD,
      passwordHash
    }
  });

  const travelVendor = await prisma.vendor.upsert({
    where: { id: "11111111-1111-1111-1111-111111110011" },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111110011",
      ownerId: travelVendorUser.id,
      name: "Orbit Air Desk",
      category: "Travel Agency",
      city: "Dallas",
      state: "TX",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.7,
      contactEmail: travelVendorUser.email,
      contactPhone: "+1 (555) 012-2210"
    }
  });

  const carVendor = await prisma.vendor.upsert({
    where: { id: "11111111-1111-1111-1111-111111110012" },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111110012",
      ownerId: carVendorUser.id,
      name: "Premier Wheels",
      category: "Car Rental",
      city: "Dallas",
      state: "TX",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.5,
      contactEmail: carVendorUser.email
    }
  });

  await prisma.vendorBidProfile.upsert({
    where: { vendorId: vendor.id },
    update: {},
    create: {
      vendorId: vendor.id,
      vendorCategory: VendorCategory.HOUSING_PROVIDER,
      serviceStates: ["TX", "OK", "AR"],
      serviceCities: ["Dallas", "Austin", "Houston", "Oklahoma City"],
      manualBidEnabled: true,
      verificationStatus: VerificationStatus.VERIFIED,
      averageResponseTimeMin: 45,
      averageSavingsPct: 12,
      bookingCompletionRate: 0.94,
      chargebackRiskScore: 12,
      rating: 4.8,
      monthlyBidLimit: 100,
      bidsUsedThisMonth: 14
    }
  });

  await prisma.vendorBidProfile.upsert({
    where: { vendorId: travelVendor.id },
    update: {},
    create: {
      vendorId: travelVendor.id,
      vendorCategory: VendorCategory.TRAVEL_AGENCY,
      serviceStates: ["TX", "OK", "AR", "LA", "TN", "GA", "FL"],
      serviceCities: ["Dallas", "Austin", "Houston", "Atlanta", "Nashville", "Miami"],
      apiEnabled: true,
      manualBidEnabled: true,
      verificationStatus: VerificationStatus.VERIFIED,
      averageResponseTimeMin: 28,
      averageSavingsPct: 9,
      bookingCompletionRate: 0.91,
      chargebackRiskScore: 8,
      rating: 4.7,
      monthlyBidLimit: 200,
      bidsUsedThisMonth: 47
    }
  });

  await prisma.vendorBidProfile.upsert({
    where: { vendorId: carVendor.id },
    update: {},
    create: {
      vendorId: carVendor.id,
      vendorCategory: VendorCategory.CAR_RENTAL,
      serviceStates: ["TX", "OK"],
      serviceCities: ["Dallas", "Austin", "Houston"],
      manualBidEnabled: true,
      verificationStatus: VerificationStatus.VERIFIED,
      averageResponseTimeMin: 65,
      averageSavingsPct: 7,
      bookingCompletionRate: 0.88,
      chargebackRiskScore: 18,
      rating: 4.5,
      monthlyBidLimit: 50,
      bidsUsedThisMonth: 12
    }
  });

  const mobilityRequest = await prisma.mobilityRequest.create({
    data: {
      candidateId: candidate.id,
      agencyId: agency.id,
      assignmentId: assignment.id,
      createdById: candidateUser.id,
      requestType: MobilityRequestType.FULL_RELOCATION_PACKAGE,
      originCity: "Phoenix",
      originState: "AZ",
      originAirport: "PHX",
      destinationCity: "Dallas",
      destinationState: "TX",
      destinationAirport: "DFW",
      assignmentCity: "Dallas",
      assignmentState: "TX",
      facilityName: assignment.facilityName,
      moveDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
      startDate: assignment.startDate,
      budgetMin: 2000,
      budgetMax: 2600,
      preferredAirline: "Delta",
      baggageNeeded: true,
      checkedBags: 2,
      housingNeeded: true,
      carNeeded: true,
      petFriendly: true,
      preferredCommuteMinutes: 25,
      notes: "Pet-friendly required. Prefer nonstop. Move-in must be 48h before shift one.",
      urgencyLevel: UrgencyLevel.HIGH,
      status: MobilityRequestStatus.OPEN_FOR_BIDS,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72)
    }
  });

  // Flight bids
  await prisma.mobilityBid.createMany({
    data: [
      {
        mobilityRequestId: mobilityRequest.id,
        vendorId: travelVendor.id,
        vendorUserId: travelVendorUser.id,
        bidType: MobilityRequestType.FLIGHT,
        packageName: "Delta DL1247 PHX → DFW",
        vendorName: travelVendor.name,
        totalPrice: 268,
        airlineName: "Delta",
        flightNumber: "DL1247",
        departureAirport: "PHX",
        arrivalAirport: "DFW",
        departureTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 7),
        arrivalTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 10.5),
        stops: 0,
        baggageIncluded: true,
        cancellationPolicy: "Refundable within 24h",
        refundability: "Refundable within 24h",
        bidScore: 88,
        conciergeRecommended: true,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
        status: MobilityBidStatus.SUBMITTED
      },
      {
        mobilityRequestId: mobilityRequest.id,
        vendorId: travelVendor.id,
        vendorUserId: travelVendorUser.id,
        bidType: MobilityRequestType.FLIGHT,
        packageName: "American AA1247 PHX → DFW",
        vendorName: travelVendor.name,
        totalPrice: 312,
        airlineName: "American Airlines",
        flightNumber: "AA1247",
        departureAirport: "PHX",
        arrivalAirport: "DFW",
        departureTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 11),
        arrivalTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6 + 1000 * 60 * 60 * 14.5),
        stops: 0,
        baggageIncluded: false,
        cancellationPolicy: "Non-refundable, change fee $75",
        refundability: "Non-refundable",
        bidScore: 72,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
        status: MobilityBidStatus.SUBMITTED
      }
    ]
  });

  // Housing bids
  await prisma.mobilityBid.createMany({
    data: [
      {
        mobilityRequestId: mobilityRequest.id,
        vendorId: vendor.id,
        vendorUserId: vendorUser.id,
        bidType: MobilityRequestType.HOUSING,
        packageName: "Furnished 1BR · Walk to facility",
        vendorName: vendor.name,
        totalPrice: 2100 * 4,
        housingAddress: "812 Memorial Pkwy, Dallas, TX",
        housingDistanceToFacility: 0.8,
        housingMonthlyCost: 2100,
        leaseFlexibility: "Month-to-month",
        cancellationPolicy: "Free cancel up to 14 days before move-in",
        refundability: "Free cancel up to 14 days",
        bidScore: 92,
        conciergeRecommended: true,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
        status: MobilityBidStatus.SUBMITTED
      },
      {
        mobilityRequestId: mobilityRequest.id,
        vendorId: vendor.id,
        vendorUserId: vendorUser.id,
        bidType: MobilityRequestType.HOUSING,
        packageName: "Premium 1BR with pool + gym",
        vendorName: vendor.name,
        totalPrice: 2450 * 4,
        housingAddress: "415 Lakeside Drive, Dallas, TX",
        housingDistanceToFacility: 2.4,
        housingMonthlyCost: 2450,
        leaseFlexibility: "13-week minimum",
        cancellationPolicy: "50% refundable up to 7 days before move-in",
        refundability: "Partially refundable",
        bidScore: 81,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
        status: MobilityBidStatus.SUBMITTED
      }
    ]
  });

  // Car bid
  await prisma.mobilityBid.create({
    data: {
      mobilityRequestId: mobilityRequest.id,
      vendorId: carVendor.id,
      vendorUserId: carVendorUser.id,
      bidType: MobilityRequestType.CAR_RENTAL,
      packageName: "Compact SUV · 13 weeks",
      vendorName: carVendor.name,
      totalPrice: 225 * 13,
      carRentalCompany: "Premier Wheels",
      carClass: "Compact SUV",
      cancellationPolicy: "Free cancel up to 24h before pickup",
      refundability: "Free cancel up to 24h",
      bidScore: 78,
      conciergeRecommended: true,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 72),
      status: MobilityBidStatus.SUBMITTED
    }
  });

  // A second, BID_ACCEPTED request that became a booking — used by /admin/mobility-exchange + agency views
  const completedRequest = await prisma.mobilityRequest.create({
    data: {
      candidateId: candidate.id,
      agencyId: agency.id,
      assignmentId: assignment.id,
      createdById: recruiter.id,
      requestType: MobilityRequestType.HOUSING,
      destinationCity: "Austin",
      destinationState: "TX",
      assignmentCity: "Austin",
      assignmentState: "TX",
      facilityName: "Mercy General",
      moveDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
      budgetMax: 2200,
      housingNeeded: true,
      urgencyLevel: UrgencyLevel.MEDIUM,
      status: MobilityRequestStatus.BID_ACCEPTED
    }
  });

  const winningBid = await prisma.mobilityBid.create({
    data: {
      mobilityRequestId: completedRequest.id,
      vendorId: vendor.id,
      vendorUserId: vendorUser.id,
      bidType: MobilityRequestType.HOUSING,
      packageName: "Riverside furnished studio",
      vendorName: vendor.name,
      totalPrice: 1980 * 4,
      housingAddress: "240 Riverside Drive, Austin, TX",
      housingDistanceToFacility: 1.2,
      housingMonthlyCost: 1980,
      leaseFlexibility: "Month-to-month",
      cancellationPolicy: "Free cancel up to 30 days before move-in",
      bidScore: 94,
      conciergeRecommended: true,
      status: MobilityBidStatus.ACCEPTED
    }
  });

  await prisma.mobilityBooking.create({
    data: {
      mobilityRequestId: completedRequest.id,
      acceptedBidId: winningBid.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      vendorId: vendor.id,
      assignmentId: assignment.id,
      bookingStatus: MobilityBookingStatus.CONFIRMED,
      paymentResponsibility: MobilityPaymentResponsibility.AGENCY,
      amount: 1980 * 4,
      platformFee: Math.round(1980 * 4 * 0.05),
      vendorPayout: Math.round(1980 * 4 * 0.95),
      bookingNotes: "Agency-funded. Concierge confirmed move-in."
    }
  });

  await prisma.activityLog.createMany({
    data: [
      {
        agencyId: agency.id,
        actorId: candidateUser.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        action: "mobility.request.created",
        metadata: { mobilityRequestId: mobilityRequest.id, bidsSeeded: 5 }
      },
      {
        agencyId: agency.id,
        actorId: recruiter.id,
        candidateId: candidate.id,
        assignmentId: assignment.id,
        action: "mobility.bid.accepted",
        metadata: { bidId: winningBid.id, amount: 1980 * 4 }
      }
    ]
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
