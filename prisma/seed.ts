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
  MobilityBidStatus,
  MobilityPackageType,
  MobilityRequestStatus,
  WalletAccountType,
  WalletEntryStatus,
  WalletEntryType
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

  const travelVendorB = await prisma.vendor.create({
    data: {
      name: "Skyline OTA",
      category: "Travel",
      city: "Chicago",
      state: "IL",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.6,
      contactEmail: "ops@skylineota.com"
    }
  });

  const travelVendorC = await prisma.vendor.create({
    data: {
      name: "MedTravel Pro",
      category: "Travel",
      city: "Atlanta",
      state: "GA",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.5,
      contactEmail: "bids@medtravelpro.com"
    }
  });

  const travelRequest = await prisma.travelBidRequest.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      offerId: offer.id,
      createdById: recruiter.id,
      status: MobilityRequestStatus.BID_ACTIVE,
      originAirport: "DFW",
      preferredAirport: "LGA",
      departureDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9),
      returnDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 102),
      needCar: true,
      needHotel: false,
      baggageCount: 2,
      carType: "Compact SUV",
      specialRequirements: "Nonstop preferred, evening arrival.",
      agencyTravelCredit: 450,
      bidExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18)
    }
  });

  const bidA = await prisma.travelBid.create({
    data: {
      requestId: travelRequest.id,
      vendorId: vendor.id,
      submittedById: vendorUser.id,
      status: MobilityBidStatus.ACTIVE,
      packageType: MobilityPackageType.FLIGHT_CAR,
      airline: "Delta",
      flightType: "Nonstop",
      stops: 0,
      totalPrice: 312,
      includesCar: true,
      includesHotel: false,
      carProvider: "Hertz",
      notes: "Carry-on plus one checked bag included.",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 14),
      recommendedByConcierge: true
    }
  });

  await prisma.travelBid.create({
    data: {
      requestId: travelRequest.id,
      vendorId: travelVendorB.id,
      status: MobilityBidStatus.ACTIVE,
      packageType: MobilityPackageType.FLIGHT_ONLY,
      airline: "United",
      flightType: "1 Stop",
      stops: 1,
      totalPrice: 284,
      includesCar: false,
      includesHotel: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 15)
    }
  });

  await prisma.travelBid.create({
    data: {
      requestId: travelRequest.id,
      vendorId: travelVendorC.id,
      status: MobilityBidStatus.ACTIVE,
      packageType: MobilityPackageType.FLIGHT_HOTEL,
      airline: "American",
      flightType: "Nonstop",
      stops: 0,
      totalPrice: 326,
      includesCar: false,
      includesHotel: true,
      hotelName: "Hyatt Place Queens",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12)
    }
  });

  await prisma.travelBidRequest.update({
    where: { id: travelRequest.id },
    data: {
      status: MobilityRequestStatus.BOOKED,
      selectedBidId: bidA.id
    }
  });

  await prisma.travelBid.update({
    where: { id: bidA.id },
    data: {
      status: MobilityBidStatus.SELECTED,
      selectedAt: new Date()
    }
  });

  const agencyWallet = await prisma.walletAccount.upsert({
    where: { agencyId: agency.id },
    update: {
      accountType: WalletAccountType.AGENCY,
      balance: 5000,
      escrowBalance: 450
    },
    create: {
      agencyId: agency.id,
      accountType: WalletAccountType.AGENCY,
      balance: 5000,
      escrowBalance: 450
    }
  });

  const candidateWallet = await prisma.walletAccount.upsert({
    where: { candidateId: candidate.id },
    update: {
      accountType: WalletAccountType.CANDIDATE,
      balance: 450
    },
    create: {
      candidateId: candidate.id,
      accountType: WalletAccountType.CANDIDATE,
      balance: 450
    }
  });

  await prisma.walletLedgerEntry.createMany({
    data: [
      {
        walletAccountId: agencyWallet.id,
        agencyId: agency.id,
        candidateId: candidate.id,
        travelRequestId: travelRequest.id,
        travelBidId: bidA.id,
        entryType: WalletEntryType.FUNDING,
        status: WalletEntryStatus.POSTED,
        amount: 5500,
        description: "Agency wallet preload",
        referenceCode: "fund_seed_001",
        createdById: agencyOwner.id
      },
      {
        walletAccountId: agencyWallet.id,
        agencyId: agency.id,
        candidateId: candidate.id,
        travelRequestId: travelRequest.id,
        entryType: WalletEntryType.CREDIT_GRANT,
        status: WalletEntryStatus.POSTED,
        amount: -450,
        description: "Travel credit grant escrow reserve",
        createdById: recruiter.id
      },
      {
        walletAccountId: candidateWallet.id,
        agencyId: agency.id,
        candidateId: candidate.id,
        travelRequestId: travelRequest.id,
        travelBidId: bidA.id,
        entryType: WalletEntryType.CREDIT_GRANT,
        status: WalletEntryStatus.POSTED,
        amount: 450,
        description: "Agency travel credit grant",
        createdById: recruiter.id
      }
    ]
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

  const externalOfferA = await prisma.externalOfferDocument.create({
    data: {
      candidateId: candidate.id,
      uploadedById: candidateUser.id,
      sourceLabel: "Aya Offer Upload",
      agencyName: "Aya Healthcare",
      role: "Registered Nurse",
      specialty: "ICU",
      locationCity: "Phoenix",
      locationState: "AZ",
      weeklyPay: 2760,
      taxableRate: 55,
      stipend: 980,
      durationWeeks: 13,
      travelSupportScore: 48,
      housingSupportScore: 52,
      readinessSupportScore: 45,
      costOfLivingIndex: 1.05,
      rawText: "Aya ICU 13-week assignment with limited housing support."
    }
  });

  const externalOfferB = await prisma.externalOfferDocument.create({
    data: {
      candidateId: candidate.id,
      uploadedById: candidateUser.id,
      sourceLabel: "AMN Offer Upload",
      agencyName: "AMN Healthcare",
      role: "Registered Nurse",
      specialty: "ICU",
      locationCity: "New York",
      locationState: "NY",
      weeklyPay: 3015,
      taxableRate: 62,
      stipend: 1040,
      durationWeeks: 13,
      travelSupportScore: 60,
      housingSupportScore: 42,
      readinessSupportScore: 50,
      costOfLivingIndex: 1.4,
      rawText: "AMN NYC ICU assignment with high rate and high cost-of-living."
    }
  });

  const comparison = await prisma.offerComparison.create({
    data: {
      candidateId: candidate.id,
      primaryOfferId: offer.id,
      createdById: candidateUser.id,
      status: "ANALYZED",
      recommendationTitle: "Best Overall Assignment Experience",
      executiveSummary:
        "TRITAL Orbit-supported Dallas assignment offers stronger mobility support and readiness certainty after normalizing for cost of living.",
      bestOverallLabel: "Baylor Regional Medical Center (Dallas, TX)",
      entries: {
        createMany: {
          data: [
            {
              sourceType: "INTERNAL_OFFER",
              internalOfferId: offer.id,
              label: "Baylor Regional Medical Center (Dallas, TX)",
              weeklyPay: 2875,
              stipend: 1240,
              durationWeeks: 13,
              city: "Dallas",
              state: "TX",
              travelSupportScore: 78,
              housingSupportScore: 80,
              readinessSupportScore: 82,
              costOfLivingIndex: 1.08,
              totalValueScore: 97.2,
              lifestyleScore: 88.4,
              notes: "Internal Orbit offer"
            },
            {
              sourceType: "EXTERNAL_OFFER",
              externalOfferId: externalOfferA.id,
              label: "Aya Healthcare (Phoenix, AZ)",
              weeklyPay: 2760,
              stipend: 980,
              durationWeeks: 13,
              city: "Phoenix",
              state: "AZ",
              travelSupportScore: 48,
              housingSupportScore: 52,
              readinessSupportScore: 45,
              costOfLivingIndex: 1.05,
              totalValueScore: 92.6,
              lifestyleScore: 63.8,
              notes: "External offer"
            },
            {
              sourceType: "EXTERNAL_OFFER",
              externalOfferId: externalOfferB.id,
              label: "AMN Healthcare (New York, NY)",
              weeklyPay: 3015,
              stipend: 1040,
              durationWeeks: 13,
              city: "New York",
              state: "NY",
              travelSupportScore: 60,
              housingSupportScore: 42,
              readinessSupportScore: 50,
              costOfLivingIndex: 1.4,
              totalValueScore: 83.1,
              lifestyleScore: 58.6,
              notes: "External offer"
            }
          ]
        }
      }
    }
  });

  await prisma.offerComparisonInsight.createMany({
    data: [
      {
        comparisonId: comparison.id,
        heading: "Compensation vs. lifestyle",
        detail: "The Dallas offer has slightly lower headline pay than NYC but materially better cost-adjusted value and support.",
        rank: 1,
        aiModel: "mock-compare-agent"
      },
      {
        comparisonId: comparison.id,
        heading: "Readiness confidence",
        detail: "Orbit mobility support and first-week readiness services create the strongest start-date confidence profile.",
        rank: 2,
        aiModel: "mock-compare-agent"
      }
    ]
  });

  const rewardsAccount = await prisma.rewardsAccount.upsert({
    where: { candidateId: candidate.id },
    update: {
      tier: "SILVER",
      pointsBalance: 1430,
      lifetimePoints: 1840,
      streakAssignments: 3
    },
    create: {
      candidateId: candidate.id,
      tier: "SILVER",
      pointsBalance: 1430,
      lifetimePoints: 1840,
      streakAssignments: 3
    }
  });

  await prisma.rewardEvent.createMany({
    data: [
      {
        rewardsAccountId: rewardsAccount.id,
        candidateId: candidate.id,
        agencyId: agency.id,
        type: "ASSIGNMENT_COMPLETED",
        points: 500,
        description: "Completed 13-week ICU assignment",
        awardedById: recruiter.id
      },
      {
        rewardsAccountId: rewardsAccount.id,
        candidateId: candidate.id,
        agencyId: agency.id,
        type: "QUICK_ACCEPTANCE",
        points: 150,
        description: "Accepted assignment within 6 hours",
        awardedById: recruiter.id
      },
      {
        rewardsAccountId: rewardsAccount.id,
        candidateId: candidate.id,
        agencyId: agency.id,
        type: "VENDOR_BOOKING",
        points: 90,
        description: "Booked through verified mobility vendor",
        awardedById: conciergeManager.id
      }
    ]
  });

  await prisma.rewardRedemption.create({
    data: {
      rewardsAccountId: rewardsAccount.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      rewardName: "Airport Transfer Credit",
      pointsRedeemed: 300,
      rewardValue: "$60 transfer voucher",
      status: "FULFILLED",
      requestedById: candidateUser.id,
      fulfilledAt: new Date()
    }
  });

  const travelAgencyUser = await prisma.user.upsert({
    where: { email: "travel.partner@orbitvendors.com" },
    update: { role: Role.TRAVEL_AGENCY_VENDOR },
    create: {
      email: "travel.partner@orbitvendors.com",
      name: "Orbit Travel Partner",
      role: Role.TRAVEL_AGENCY_VENDOR,
      passwordHash
    }
  });

  const housingProviderUser = await prisma.user.upsert({
    where: { email: "housing.partner@orbitvendors.com" },
    update: { role: Role.HOUSING_PROVIDER },
    create: {
      email: "housing.partner@orbitvendors.com",
      name: "Orbit Housing Partner",
      role: Role.HOUSING_PROVIDER,
      passwordHash
    }
  });

  const travelAgencyVendor = await prisma.vendor.create({
    data: {
      ownerId: travelAgencyUser.id,
      name: "Orbit Global Travel",
      category: "Travel Agency",
      city: "New York",
      state: "NY",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.7,
      contactEmail: travelAgencyUser.email
    }
  });

  const housingVendor = await prisma.vendor.create({
    data: {
      ownerId: housingProviderUser.id,
      name: "SafeShift Housing",
      category: "Housing Provider",
      city: "Dallas",
      state: "TX",
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.9,
      contactEmail: housingProviderUser.email
    }
  });

  await prisma.vendorBidProfile.upsert({
    where: { vendorId: travelAgencyVendor.id },
    update: {
      vendorCategory: "TRAVEL_AGENCY",
      serviceStates: ["TX", "NY", "AZ"],
      serviceCities: ["Dallas", "New York", "Phoenix"],
      monthlyBidLimit: 100,
      bidsUsedThisMonth: 17,
      averageSavings: 12.4
    },
    create: {
      vendorId: travelAgencyVendor.id,
      vendorCategory: "TRAVEL_AGENCY",
      serviceStates: ["TX", "NY", "AZ"],
      serviceCities: ["Dallas", "New York", "Phoenix"],
      apiEnabled: false,
      manualBidEnabled: true,
      verificationStatus: "APPROVED",
      averageResponseTime: 9.5,
      averageSavings: 12.4,
      bookingCompletionRate: 0.93,
      chargebackRiskScore: 0.12,
      rating: 4.7,
      monthlyBidLimit: 100,
      bidsUsedThisMonth: 17
    }
  });

  const mobilityRequest = await prisma.mobilityRequest.create({
    data: {
      candidateId: candidate.id,
      agencyId: agency.id,
      assignmentId: assignment.id,
      offerId: offer.id,
      createdByUserId: recruiter.id,
      requestType: "FLIGHT",
      originCity: "Dallas",
      originState: "TX",
      originAirport: "DFW",
      destinationCity: "New York",
      destinationState: "NY",
      destinationAirport: "LGA",
      assignmentCity: "New York",
      assignmentState: "NY",
      facilityName: "Metro Health Downtown",
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
      budgetMin: 300,
      budgetMax: 520,
      baggageNeeded: true,
      checkedBags: 1,
      urgencyLevel: "HIGH",
      status: "OPEN_FOR_BIDS",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18)
    }
  });

  const mobilityBid = await prisma.mobilityBid.create({
    data: {
      mobilityRequestId: mobilityRequest.id,
      vendorId: travelAgencyVendor.id,
      vendorUserId: travelAgencyUser.id,
      bidType: "FLIGHT",
      packageName: "Nonstop + 1 checked bag",
      vendorName: "Orbit Global Travel",
      totalPrice: 344,
      taxesAndFees: 36,
      platformFee: 11,
      estimatedSavings: 58,
      airlineName: "Delta",
      flightNumber: "DL1432",
      departureAirport: "DFW",
      arrivalAirport: "LGA",
      departureTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9),
      arrivalTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9 + 1000 * 60 * 60 * 3),
      stops: 0,
      baggageIncluded: 1,
      bidScore: 92,
      conciergeRecommended: true,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12),
      status: "SHORTLISTED"
    }
  });

  const mobilityBooking = await prisma.mobilityBooking.create({
    data: {
      mobilityRequestId: mobilityRequest.id,
      acceptedBidId: mobilityBid.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      vendorId: travelAgencyVendor.id,
      assignmentId: assignment.id,
      createdByUserId: recruiter.id,
      bookingReference: `ORBSEED-${Date.now().toString().slice(-6)}`,
      bookingStatus: "CONFIRMED",
      paymentResponsibility: "AGENCY",
      amount: 344,
      platformFee: 11,
      vendorPayout: 333
    }
  });

  const candidateWalletV2 = await prisma.wallet.create({
    data: {
      ownerType: "CANDIDATE",
      ownerId: candidate.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      balance: 460
    }
  });

  const walletCredit = await prisma.walletCredit.create({
    data: {
      walletId: candidateWalletV2.id,
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      creditType: "FLIGHT",
      amount: 300,
      usedAmount: 180,
      status: "PARTIALLY_USED",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25)
    }
  });

  await prisma.walletTransaction.createMany({
    data: [
      {
        walletId: candidateWalletV2.id,
        walletCreditId: walletCredit.id,
        agencyId: agency.id,
        candidateId: candidate.id,
        type: "CREDIT_ADDED",
        amount: 300,
        description: "Agency-sponsored flight credit"
      },
      {
        walletId: candidateWalletV2.id,
        walletCreditId: walletCredit.id,
        agencyId: agency.id,
        candidateId: candidate.id,
        vendorId: travelAgencyVendor.id,
        type: "CREDIT_USED",
        amount: 180,
        description: "Credit used toward accepted mobility booking"
      }
    ]
  });

  const comparisonV2 = await prisma.offerComparisonV2.create({
    data: {
      candidateId: candidate.id,
      agencyId: agency.id,
      assignmentId: assignment.id,
      offerId: offer.id,
      title: "Dallas vs Phoenix ICU",
      comparisonStatus: "ANALYZED",
      aiSummary: "Dallas assignment has better readiness support and lower relocation risk.",
      bestOfferId: offer.id,
      disclaimerAccepted: true
    }
  });

  const externalOffer = await prisma.externalOffer.create({
    data: {
      comparisonId: comparisonV2.id,
      sourceAgencyName: "RapidCare Staffing",
      weeklyPay: 2920,
      taxableRate: 60,
      stipend: 1000,
      estimatedGross: 3920,
      locationCity: "Phoenix",
      locationState: "AZ",
      facilityName: "Phoenix Heart Center",
      duration: 13,
      shift: "Nights",
      housingIncluded: false,
      travelIncluded: true,
      notes: "No dedicated first-week support"
    }
  });

  await prisma.offerComparisonResult.createMany({
    data: [
      {
        comparisonId: comparisonV2.id,
        offerId: offer.id,
        netValueScore: 91.5,
        lifestyleScore: 87.2,
        mobilityScore: 93.4,
        riskScore: 21.4,
        costOfLivingEstimate: 1.08,
        recommendation: "Best overall assignment experience",
        aiReasoning: "Better mobility and first-week support offset a small pay delta."
      },
      {
        comparisonId: comparisonV2.id,
        externalOfferId: externalOffer.id,
        netValueScore: 86.4,
        lifestyleScore: 72.5,
        mobilityScore: 68.3,
        riskScore: 38.7,
        costOfLivingEstimate: 1.05,
        recommendation: "Higher headline pay but weaker readiness support",
        aiReasoning: "Increased uncertainty around housing and onboarding logistics."
      }
    ]
  });

  const firstWeekGuide = await prisma.firstWeekGuide.create({
    data: {
      assignmentId: assignment.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      facilityParkingInfo: "Lot C after 6am, badge scan required.",
      firstDayInstructions: "Arrive 45 minutes early, bring credentials and onboarding packet.",
      nearestGrocery: "Fresh Market on Oak St",
      nearestPharmacy: "24/7 MedCare Pharmacy",
      nearestUrgentCare: "City urgent care 2.1 miles away",
      localTransportationTips: "Best route uses I-35 express lane after 6:30am.",
      weatherSummary: "Expect warm days and storm risk after 5pm.",
      safetyNotes: "Use lit staff parking zones for evening shifts.",
      emergencyContacts: "Recruiter +1 555 0142, Concierge +1 555 0198",
      firstWeekConfidenceScore: 89,
      generatedByAI: false
    }
  });

  await prisma.firstWeekChecklistItem.createMany({
    data: [
      {
        guideId: firstWeekGuide.id,
        title: "Confirm housing check-in time",
        category: "HOUSING",
        completed: true
      },
      {
        guideId: firstWeekGuide.id,
        title: "Upload emergency contact details",
        category: "READINESS",
        completed: false
      },
      {
        guideId: firstWeekGuide.id,
        title: "Verify first-day commute route",
        category: "TRANSPORT",
        completed: true
      }
    ]
  });

  await prisma.relocationPlan.create({
    data: {
      candidateId: candidate.id,
      assignmentId: assignment.id,
      originCity: "Dallas",
      originState: "TX",
      destinationCity: "New York",
      destinationState: "NY",
      moveTimeline: "Day -14 lock housing, Day -7 finalize travel, Day -2 checklist review",
      cityOrientation: "Primary essentials are concentrated within 3 miles of facility.",
      weatherExpectations: "Mild mornings and occasional showers.",
      packingChecklist: "Layered scrubs, light jacket, onboarding folder.",
      housingGuidance: "Prioritize furnished units under 25-minute commute.",
      transportationGuidance: "Use rental car for first 3 days before transit pass activation.",
      firstWeekPreparation: "Confirm parking badge and pharmacy locations.",
      risks: "Traffic surge around shift change windows.",
      nextBestActions: "Finalize check-in confirmation and backup transport plan.",
      generatedByAI: true
    }
  });

  const intelligence = await prisma.offerIntelligence.create({
    data: {
      offerId: offer.id,
      candidateId: candidate.id,
      assignmentId: assignment.id,
      agencyId: agency.id,
      closeProbability: 0.72,
      engagementScore: 0.81,
      mobilityFrictionScore: 0.36,
      payCompetitivenessScore: 0.67,
      urgencyScore: 0.84,
      recommendedAction: "Offer emergency housing backup and flight credit for final confidence.",
      recommendedSMS: "We can secure your first week with backup housing and travel credit today.",
      recommendedEmail: "Your assignment launch plan is ready with full mobility support.",
      recommendedCallScript: "Lead with certainty and first-week readiness safeguards."
    }
  });

  await prisma.offerOutreachLog.create({
    data: {
      offerId: offer.id,
      offerIntelligenceId: intelligence.id,
      actorId: recruiter.id,
      channel: "SMS",
      message: "Shared first-week support package and travel credit details.",
      actionCompleted: true
    }
  });

  await prisma.vendorVerification.create({
    data: {
      vendorId: travelAgencyVendor.id,
      documentType: "Business License",
      documentUrl: "https://example.com/docs/travel-license.pdf",
      status: "APPROVED",
      reviewedById: superAdmin.id,
      reviewedAt: new Date(),
      notes: "Verified for assignment-based travel bidding."
    }
  });

  await prisma.dispute.create({
    data: {
      bookingId: mobilityBooking.id,
      raisedByUserId: candidateUser.id,
      disputeType: "ScheduleChange",
      description: "Departure window changed after acceptance; requesting review.",
      status: "UNDER_REVIEW"
    }
  });

  const partnerListing = await prisma.partnerHousingListing.create({
    data: {
      vendorId: housingVendor.id,
      agencyId: agency.id,
      propertyType: "Furnished Apartment",
      furnished: true,
      monthlyCost: 2350,
      deposit: 500,
      utilitiesIncluded: true,
      leaseFlexibility: "Month-to-month after first month",
      petFriendly: true,
      parking: true,
      distanceToFacility: 2.8,
      safetyNotes: "Gated access and 24-hour security desk.",
      verificationStatus: "APPROVED"
    }
  });

  await prisma.housingInquiry.create({
    data: {
      listingId: partnerListing.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      vendorId: housingVendor.id,
      message: "Can this unit support move-in 5 days before assignment start?",
      status: "OPEN"
    }
  });

  await prisma.clinicianSubscription.upsert({
    where: { candidateId: candidate.id },
    update: {
      agencyId: agency.id,
      status: "ACTIVE",
      planName: "ORBIT_PLUS_MONTHLY",
      annualPlan: false,
      periodEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    },
    create: {
      candidateId: candidate.id,
      agencyId: agency.id,
      status: "ACTIVE",
      planName: "ORBIT_PLUS_MONTHLY",
      annualPlan: false,
      periodEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  });

  for (let i = 1; i <= 10; i += 1) {
    await prisma.agency.upsert({
      where: { slug: `demo-agency-${i}` },
      update: {},
      create: {
        name: `Demo Agency ${i}`,
        slug: `demo-agency-${i}`,
        ownerId: agencyOwner.id
      }
    });
  }

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
