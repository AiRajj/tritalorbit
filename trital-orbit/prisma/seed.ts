import { PrismaClient, UserRole, OfferStatus, BookingStatus, RiskLevel, VendorType, SubscriptionTier, SubscriptionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding TRITAL Orbit™ demo data...");

  // Clean up
  await prisma.activityLog.deleteMany();
  await prisma.retentionRiskScore.deleteMany();
  await prisma.offerPerk.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.bookingRequest.deleteMany();
  await prisma.conciergeTask.deleteMany();
  await prisma.agencyMember.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.housingOption.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.agencySubscription.deleteMany();
  await prisma.subscriptionPlan.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.demoRequest.deleteMany();
  await prisma.lead.deleteMany();

  const passwordHash = await bcrypt.hash("demo1234", 12);

  // Create Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@tritalorbit.com",
      name: "Alex Rivera",
      firstName: "Alex",
      lastName: "Rivera",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  // Create Demo Agency
  const agency = await prisma.agency.create({
    data: {
      name: "PrimeStaff Healthcare",
      slug: "primestaff-healthcare",
      email: "info@primestaff.com",
      phone: "1-800-555-0100",
      website: "https://primestaff.com",
      city: "Dallas",
      state: "TX",
      isActive: true,
      isVerified: true,
    },
  });

  // Create Agency Owner
  const agencyOwner = await prisma.user.create({
    data: {
      email: "owner@primestaff.com",
      name: "Sarah Mitchell",
      firstName: "Sarah",
      lastName: "Mitchell",
      passwordHash,
      role: UserRole.AGENCY_OWNER,
      isActive: true,
    },
  });

  await prisma.agencyMember.create({
    data: {
      agencyId: agency.id,
      userId: agencyOwner.id,
      role: UserRole.AGENCY_OWNER,
      title: "VP of Talent Acquisition",
    },
  });

  // Create Recruiter
  const recruiter = await prisma.user.create({
    data: {
      email: "recruiter@primestaff.com",
      name: "James Carter",
      firstName: "James",
      lastName: "Carter",
      passwordHash,
      role: UserRole.RECRUITER,
      isActive: true,
    },
  });

  const recruiterMember = await prisma.agencyMember.create({
    data: {
      agencyId: agency.id,
      userId: recruiter.id,
      role: UserRole.RECRUITER,
      title: "Senior Recruiter",
    },
  });

  // Create Concierge Manager
  const conciergeUser = await prisma.user.create({
    data: {
      email: "concierge@primestaff.com",
      name: "Maya Patel",
      firstName: "Maya",
      lastName: "Patel",
      passwordHash,
      role: UserRole.CONCIERGE_MANAGER,
      isActive: true,
    },
  });

  await prisma.agencyMember.create({
    data: {
      agencyId: agency.id,
      userId: conciergeUser.id,
      role: UserRole.CONCIERGE_MANAGER,
      title: "Concierge Manager",
    },
  });

  // Create Candidate Users
  const candidateUser1 = await prisma.user.create({
    data: {
      email: "maria.santos@email.com",
      name: "Maria Santos",
      firstName: "Maria",
      lastName: "Santos",
      passwordHash,
      role: UserRole.CANDIDATE,
      phone: "+1 (555) 234-5678",
      isActive: true,
    },
  });

  const candidate1 = await prisma.candidate.create({
    data: {
      userId: candidateUser1.id,
      agencyId: agency.id,
      firstName: "Maria",
      lastName: "Santos",
      email: "maria.santos@email.com",
      phone: "+1 (555) 234-5678",
      specialty: "ICU",
      role: "RN",
      licenseState: "TX",
      yearsExperience: 6,
      isActive: true,
    },
  });

  const candidateUser2 = await prisma.user.create({
    data: {
      email: "david.chen@email.com",
      name: "David Chen",
      firstName: "David",
      lastName: "Chen",
      passwordHash,
      role: UserRole.CANDIDATE,
      isActive: true,
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      userId: candidateUser2.id,
      agencyId: agency.id,
      firstName: "David",
      lastName: "Chen",
      email: "david.chen@email.com",
      specialty: "Orthopedics",
      role: "PT",
      licenseState: "CA",
      yearsExperience: 4,
      isActive: true,
    },
  });

  const candidateUser3 = await prisma.user.create({
    data: {
      email: "lisa.park@email.com",
      name: "Lisa Park",
      firstName: "Lisa",
      lastName: "Park",
      passwordHash,
      role: UserRole.CANDIDATE,
      isActive: true,
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      userId: candidateUser3.id,
      agencyId: agency.id,
      firstName: "Lisa",
      lastName: "Park",
      email: "lisa.park@email.com",
      specialty: "Anesthesia",
      role: "CRNA",
      licenseState: "IL",
      yearsExperience: 9,
      isActive: true,
    },
  });

  // Create Subscription Plans
  const starterPlan = await prisma.subscriptionPlan.create({
    data: {
      name: "Starter",
      tier: SubscriptionTier.STARTER,
      price: 299,
      yearlyPrice: 249,
      features: { maxRecruiters: 3, maxOffersPerMonth: 50, aiBoost: true, concierge: false },
      maxUsers: 3,
      maxOffers: 50,
      isActive: true,
    },
  });

  const growthPlan = await prisma.subscriptionPlan.create({
    data: {
      name: "Growth",
      tier: SubscriptionTier.GROWTH,
      price: 799,
      yearlyPrice: 666,
      features: { maxRecruiters: 15, maxOffersPerMonth: 500, aiBoost: true, concierge: true, mspReporting: true },
      maxUsers: 15,
      maxOffers: 500,
      isActive: true,
    },
  });

  await prisma.agencySubscription.create({
    data: {
      agencyId: agency.id,
      planId: growthPlan.id,
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create Vendor
  const vendorUser = await prisma.user.create({
    data: {
      email: "vendor@phoenixhousing.com",
      name: "Phoenix Corporate Housing",
      firstName: "Phoenix",
      lastName: "Housing",
      passwordHash,
      role: UserRole.VENDOR,
      isActive: true,
    },
  });

  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      name: "Phoenix Corporate Housing",
      email: "bookings@phoenixhousing.com",
      type: VendorType.HOUSING,
      city: "Phoenix",
      state: "AZ",
      isActive: true,
      isVerified: true,
      rating: 4.8,
      reviewCount: 127,
    },
  });

  // Create Housing Options
  await prisma.housingOption.create({
    data: {
      vendorId: vendor.id,
      title: "Phoenix Medical District Suite",
      description: "Fully furnished 1BR apartment 0.8 miles from St. Mary's Medical Center. High-speed WiFi, gym, parking included.",
      city: "Phoenix",
      state: "AZ",
      address: "1240 N Central Ave",
      zipCode: "85004",
      distanceToFacility: 0.8,
      monthlyRate: 2200,
      weeklyRate: 550,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Parking", "In-unit Laundry", "Air Conditioning"],
      isAvailable: true,
      isVerified: true,
      rating: 4.9,
      furnished: true,
      utilitiesIncluded: true,
    },
  });

  // Create Offers
  const startDate1 = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  const offer1 = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      recruiterId: recruiterMember.id,
      candidateId: candidate1.id,
      candidateName: "Maria Santos",
      candidateEmail: "maria.santos@email.com",
      candidatePhone: "+1 (555) 234-5678",
      candidateRole: "RN",
      candidateSpecialty: "ICU",
      candidateLicenseState: "TX",
      candidateExperience: 6,
      facilityName: "St. Mary's Medical Center",
      facilityCity: "Phoenix",
      facilityState: "AZ",
      startDate: startDate1,
      duration: 13,
      shiftType: "Nights (7pm-7am)",
      specialty: "ICU",
      mspClient: "Healthcare Partners MSP",
      weeklyPay: 2800,
      taxableRate: 650,
      stipend: 2150,
      totalContractValue: 36400,
      status: OfferStatus.SENT,
      sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      aiEnhancedSummary: "This 13-week ICU assignment in Phoenix, AZ isn't just a competitive contract — it's a fully supported career move. Maria joins St. Mary's Medical Center with $2,800/week gross, confirmed housing 0.8 miles from the facility, roundtrip flight coverage, and a dedicated concierge team available from acceptance through her first week on the unit.",
      aiValueStatement: "When you accept this offer, you're not just accepting a pay rate — you're accepting a fully supported life transition with housing, travel, and concierge support handled before you even arrive.",
      aiSMSPitch: "Hi Maria! Your Phoenix ICU offer is ready — $2,800/wk + housing + flight. Full details at your link. Ready to chat? 🏥",
      aiCloseStrategy: "Lead with the housing solution — Maria's biggest concern for Phoenix assignments is housing uncertainty. Have 2-3 verified options ready to send immediately. Follow up within 4 hours of sending the offer.",
      candidateConfidenceScore: 78,
      perks: {
        create: [
          { type: "HOUSING", title: "Housing Assistance", description: "Verified furnished housing 0.8 miles from St. Mary's", isEnabled: true },
          { type: "FLIGHT", title: "Flight Support", description: "Roundtrip flight covered from origin to Phoenix", isEnabled: true },
          { type: "FIRST_WEEK", title: "First Week Readiness", description: "Day-1 support package with orientation kit", isEnabled: true },
        ],
      },
    },
  });

  await prisma.retentionRiskScore.create({
    data: {
      candidateId: candidate1.id,
      offerId: offer1.id,
      score: 82,
      riskLevel: RiskLevel.CRITICAL,
      reasoning: "Candidate has not viewed the offer in 6 hours despite being sent. With only 5 days to start date and no housing confirmed, this represents a critical risk of backout.",
      suggestedAction: "Call immediately. Lead with housing options — have the Phoenix Medical District Suite link ready. Confirm she received the offer text.",
      suggestedSMS: "Hi Maria! Just checking in on your Phoenix offer — I have the perfect apartment picked out near St. Mary's. Do you have 5 mins today?",
      suggestedCallScript: "\"Hi Maria, I wanted to personally follow up on your offer. I have an incredible housing option 0.8 miles from the facility that I think you'll love — can I send that over now?\"",
      hasViewedOffer: false,
      hoursSinceOfferSent: 6,
      housingRequested: false,
      travelRequested: false,
      daysToStartDate: 5,
      weeklyPay: 2800,
      locationDifficulty: 6,
      engagementScore: 35,
      unansweredMessages: 1,
    },
  });

  const offer2 = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      recruiterId: recruiterMember.id,
      candidateId: candidate2.id,
      candidateName: "David Chen",
      candidateEmail: "david.chen@email.com",
      candidateRole: "PT",
      candidateSpecialty: "Orthopedics",
      facilityName: "Valley Health System",
      facilityCity: "Dallas",
      facilityState: "TX",
      startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      duration: 13,
      shiftType: "Days (7am-7pm)",
      specialty: "Orthopedics",
      weeklyPay: 2200,
      totalContractValue: 28600,
      status: OfferStatus.ACCEPTED,
      sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      viewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      acceptedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      perks: {
        create: [
          { type: "HOUSING", title: "Housing Assistance", description: "Furnished apartment in Dallas Medical District", isEnabled: true },
          { type: "CAR_RENTAL", title: "Car Rental", description: "Compact vehicle for 13-week duration", isEnabled: true },
        ],
      },
    },
  });

  await prisma.retentionRiskScore.create({
    data: {
      candidateId: candidate2.id,
      offerId: offer2.id,
      score: 18,
      riskLevel: RiskLevel.LOW,
      reasoning: "Candidate accepted the offer and has housing and car rental confirmed. Engagement is high and all logistics are on track.",
      suggestedAction: "Send a welcome message and confirm day-1 check-in details.",
      suggestedSMS: "Hi David! Welcome aboard! Your Dallas housing is confirmed. Reach out if you need anything before your June start. 🎉",
      suggestedCallScript: "\"Hi David, congratulations on accepting the Valley Health offer! I just wanted to confirm your housing is all set and answer any final questions before your start date.\"",
      hasViewedOffer: true,
      hoursSinceOfferSent: 48,
      housingRequested: true,
      travelRequested: false,
      daysToStartDate: 21,
      weeklyPay: 2200,
      locationDifficulty: 3,
      engagementScore: 88,
      unansweredMessages: 0,
    },
  });

  const offer3 = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateName: "Lisa Park",
      candidateEmail: "lisa.park@email.com",
      candidateRole: "CRNA",
      candidateSpecialty: "Anesthesia",
      facilityName: "Northwestern Memorial Hospital",
      facilityCity: "Chicago",
      facilityState: "IL",
      startDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      duration: 26,
      shiftType: "Days",
      specialty: "Anesthesia",
      weeklyPay: 4100,
      totalContractValue: 106600,
      status: OfferStatus.VIEWED,
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      viewedAt: new Date(Date.now() - 30 * 60 * 1000),
      perks: {
        create: [
          { type: "HOUSING", title: "Housing Assistance", description: "Premium furnished apartment in Chicago Loop", isEnabled: true },
          { type: "FLIGHT", title: "Flight Support", description: "Roundtrip flight included", isEnabled: true },
          { type: "RELOCATION", title: "Relocation Concierge", description: "Full move coordination support", isEnabled: true },
          { type: "LOYALTY", title: "Loyalty Rewards", description: "Points toward future assignments", isEnabled: true },
        ],
      },
    },
  });

  // Create Booking Request
  await prisma.bookingRequest.create({
    data: {
      offerId: offer1.id,
      candidateId: candidate1.id,
      agencyId: agency.id,
      needsHousing: true,
      needsFlight: true,
      needsCar: false,
      moveDate: startDate1,
      budgetRange: "$2,000-$3,000/mo",
      preferredLocation: "Close to St. Mary's Medical Center",
      notes: "Looking for pet-friendly option if possible",
      status: BookingStatus.NEW,
    },
  });

  // Activity Logs
  await prisma.activityLog.createMany({
    data: [
      { agencyId: agency.id, userId: recruiter.id, offerId: offer1.id, type: "OFFER_CREATED", description: "Offer created for Maria Santos at St. Mary's Medical Center" },
      { agencyId: agency.id, userId: recruiter.id, offerId: offer1.id, type: "OFFER_SENT", description: "Offer sent to Maria Santos" },
      { agencyId: agency.id, userId: recruiter.id, offerId: offer2.id, type: "OFFER_CREATED", description: "Offer created for David Chen at Valley Health System" },
      { agencyId: agency.id, offerId: offer2.id, type: "OFFER_ACCEPTED", description: "David Chen accepted the Dallas PT offer" },
      { agencyId: agency.id, offerId: offer3.id, type: "OFFER_VIEWED", description: "Lisa Park viewed the Chicago CRNA offer" },
    ],
  });

  // Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: agencyOwner.id,
        offerId: offer1.id,
        type: "HIGH_RISK_ALERT",
        title: "Critical Risk Alert — Maria Santos",
        message: "Maria Santos has not viewed her offer in 6 hours. Start date in 5 days. Housing not confirmed. Risk score: 82/100.",
        isRead: false,
      },
      {
        userId: agencyOwner.id,
        offerId: offer2.id,
        type: "OFFER_ACCEPTED",
        title: "Offer Accepted — David Chen",
        message: "David Chen accepted the Dallas PT offer. Assignment readiness checklist has been created.",
        isRead: false,
      },
      {
        userId: agencyOwner.id,
        type: "BOOKING_REQUEST",
        title: "New Booking Request",
        message: "Maria Santos has submitted a housing + flight support request for her Phoenix assignment.",
        isRead: true,
      },
    ],
  });

  // Demo Requests
  await prisma.demoRequest.createMany({
    data: [
      {
        firstName: "Jennifer",
        lastName: "Walsh",
        email: "jennifer.walsh@healthfirststaffing.com",
        company: "HealthFirst Staffing",
        role: "CEO",
        teamSize: "16-50",
        status: "PENDING",
      },
      {
        firstName: "Marcus",
        lastName: "Johnson",
        email: "mjohnson@medforce.com",
        company: "MedForce Staffing",
        role: "VP of Operations",
        teamSize: "51-100",
        status: "SCHEDULED",
        isScheduled: true,
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
  console.log("");
  console.log("📋 Demo Credentials:");
  console.log("   Super Admin:  admin@tritalorbit.com / demo1234");
  console.log("   Agency Owner: owner@primestaff.com / demo1234");
  console.log("   Recruiter:    recruiter@primestaff.com / demo1234");
  console.log("   Concierge:    concierge@primestaff.com / demo1234");
  console.log("   Candidate:    maria.santos@email.com / demo1234");
  console.log("   Vendor:       vendor@phoenixhousing.com / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
