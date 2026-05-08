import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding TRITAL Orbit database...")

  const hashedPassword = await bcrypt.hash("password123", 12)

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@tritalorbit.com" },
    update: {},
    create: {
      email: "admin@tritalorbit.com",
      name: "System Admin",
      hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  })

  const agency = await prisma.agency.upsert({
    where: { slug: "premier-health-staffing" },
    update: {},
    create: {
      name: "Premier Health Staffing",
      slug: "premier-health-staffing",
      website: "https://premierhealthstaffing.com",
      phone: "(555) 123-4567",
      city: "Houston",
      state: "TX",
      description: "Leading healthcare staffing agency specializing in travel nursing and allied health placements.",
      subscriptionTier: "PROFESSIONAL",
    },
  })

  const agencyOwner = await prisma.user.upsert({
    where: { email: "agency@tritalorbit.com" },
    update: {},
    create: {
      email: "agency@tritalorbit.com",
      name: "Sarah Mitchell",
      hashedPassword,
      role: "AGENCY_OWNER",
      isActive: true,
    },
  })

  await prisma.agencyMember.upsert({
    where: { userId_agencyId: { userId: agencyOwner.id, agencyId: agency.id } },
    update: {},
    create: {
      userId: agencyOwner.id,
      agencyId: agency.id,
      role: "AGENCY_OWNER",
    },
  })

  const recruiterUser = await prisma.user.upsert({
    where: { email: "recruiter@tritalorbit.com" },
    update: {},
    create: {
      email: "recruiter@tritalorbit.com",
      name: "Marcus Johnson",
      hashedPassword,
      role: "RECRUITER",
      isActive: true,
    },
  })

  await prisma.agencyMember.upsert({
    where: { userId_agencyId: { userId: recruiterUser.id, agencyId: agency.id } },
    update: {},
    create: {
      userId: recruiterUser.id,
      agencyId: agency.id,
      role: "RECRUITER",
    },
  })

  const candidateUser = await prisma.user.upsert({
    where: { email: "candidate@tritalorbit.com" },
    update: {},
    create: {
      email: "candidate@tritalorbit.com",
      name: "Emily Chen",
      hashedPassword,
      role: "CANDIDATE",
      isActive: true,
    },
  })

  const candidate = await prisma.candidate.upsert({
    where: { userId: candidateUser.id },
    update: {},
    create: {
      userId: candidateUser.id,
      agencyId: agency.id,
      firstName: "Emily",
      lastName: "Chen",
      email: "candidate@tritalorbit.com",
      phone: "(555) 987-6543",
      role: "Registered Nurse",
      specialty: "ICU",
      licenseState: "TX",
      experience: 6,
      currentCity: "Denver",
      currentState: "CO",
      engagementScore: 72,
    },
  })

  const conciergeUser = await prisma.user.upsert({
    where: { email: "concierge@tritalorbit.com" },
    update: {},
    create: {
      email: "concierge@tritalorbit.com",
      name: "Lisa Park",
      hashedPassword,
      role: "CONCIERGE_MANAGER",
      isActive: true,
    },
  })

  const vendorUser = await prisma.user.upsert({
    where: { email: "vendor@tritalorbit.com" },
    update: {},
    create: {
      email: "vendor@tritalorbit.com",
      name: "David Martinez",
      hashedPassword,
      role: "VENDOR",
      isActive: true,
    },
  })

  await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      companyName: "TravelerStay Housing",
      contactName: "David Martinez",
      email: "vendor@tritalorbit.com",
      phone: "(555) 222-3333",
      website: "https://travelerstay.com",
      vendorType: "HOUSING",
      city: "Houston",
      state: "TX",
      description: "Premium furnished housing for healthcare travelers across Texas.",
      verificationStatus: "VERIFIED",
      rating: 4.8,
    },
  })

  await prisma.user.upsert({
    where: { email: "msp@tritalorbit.com" },
    update: {},
    create: {
      email: "msp@tritalorbit.com",
      name: "Robert Kim",
      hashedPassword,
      role: "MSP_VIEWER",
      isActive: true,
    },
  })

  const assignment1 = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      facilityName: "Memorial Hermann Hospital",
      city: "Houston",
      state: "TX",
      startDate: new Date("2026-06-15"),
      endDate: new Date("2026-09-07"),
      duration: 13,
      shift: "Night 7p-7a",
      specialty: "ICU",
      mspClient: "AMN Healthcare MSP",
      status: "ACTIVE",
      housingStatus: "IN_PROGRESS",
      travelStatus: "COMPLETE",
      documentsStatus: "IN_PROGRESS",
    },
  })

  const offer1 = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate.id,
      assignmentId: assignment1.id,
      status: "SENT",
      weeklyPay: 2450,
      taxableRate: 28.5,
      stipend: 1260,
      totalContractValue: 31850,
      facilityName: "Memorial Hermann Hospital",
      city: "Houston",
      state: "TX",
      startDate: new Date("2026-06-15"),
      duration: 13,
      shift: "Night 7p-7a",
      specialty: "ICU",
      mspClient: "AMN Healthcare MSP",
      enhancedSummary: "This premium ICU travel assignment at Memorial Hermann Hospital in Houston offers a highly competitive $2,450 weekly package with comprehensive mobility support including housing assistance, flight coordination, and first-week readiness planning.",
      valueStatement: "Your assignment includes more than great pay — you'll get housing support near the facility, coordinated travel, and a dedicated concierge to ensure you're ready from day one.",
      recruiterTalkingPoints: "1. Lead with the total package value ($31,850)\n2. Emphasize the housing support — eliminates their biggest stress\n3. Mention the flight coordination\n4. Highlight Memorial Hermann's reputation\n5. Close with the first-week readiness plan",
      smsPitch: "Hi Emily! 🏥 Exciting ICU opportunity at Memorial Hermann in Houston — $2,450/wk + housing support + flight coordination. Total package: $31,850. Want to chat about it?",
      emailPitch: "Subject: ICU Travel Assignment — Memorial Hermann, Houston ($2,450/wk + Mobility Support)\n\nHi Emily,\n\nI have an exceptional ICU opportunity that I think is perfect for you at Memorial Hermann Hospital in Houston, TX.\n\nHere's what makes this special:\n• $2,450/week ($28.50 taxable + $1,260 stipend)\n• 13-week contract starting June 15\n• Night shift (7p-7a)\n• Housing assistance included\n• Flight coordination provided\n• Dedicated first-week readiness plan\n\nTotal contract value: $31,850\n\nThis isn't just a great assignment — it's a full mobility package designed to make your transition seamless.\n\nCan we hop on a quick call this week?\n\nBest,\nMarcus Johnson\nPremier Health Staffing",
      candidateConfidenceScore: 78,
      aiCloseStrategy: "Emily has strong ICU experience and is coming from Denver. Lead with the housing support to address relocation concerns. Mention the night differential and total contract value. Her engagement score suggests she's actively looking — move quickly.",
      sentAt: new Date(),
    },
  })

  await prisma.offerPerk.createMany({
    data: [
      { offerId: offer1.id, perkType: "FLIGHT", title: "Flight Support", description: "Round-trip flight coordination to Houston", isEnabled: true, value: 450 },
      { offerId: offer1.id, perkType: "HOUSING", title: "Housing Assistance", description: "Furnished apartment near Memorial Hermann", isEnabled: true, value: 2200 },
      { offerId: offer1.id, perkType: "CAR", title: "Car Rental", description: "Compact car rental for first 2 weeks", isEnabled: true, value: 600 },
      { offerId: offer1.id, perkType: "CONCIERGE", title: "Relocation Concierge", description: "Dedicated concierge for move coordination", isEnabled: true },
      { offerId: offer1.id, perkType: "READINESS", title: "First Week Readiness", description: "Orientation prep, badge, parking, scrub delivery", isEnabled: true },
    ],
  })

  const candidate2User = await prisma.user.upsert({
    where: { email: "james.wilson@example.com" },
    update: {},
    create: {
      email: "james.wilson@example.com",
      name: "James Wilson",
      hashedPassword,
      role: "CANDIDATE",
      isActive: true,
    },
  })

  const candidate2 = await prisma.candidate.upsert({
    where: { userId: candidate2User.id },
    update: {},
    create: {
      userId: candidate2User.id,
      agencyId: agency.id,
      firstName: "James",
      lastName: "Wilson",
      email: "james.wilson@example.com",
      phone: "(555) 444-5555",
      role: "Registered Nurse",
      specialty: "ER",
      licenseState: "CA",
      experience: 4,
      currentCity: "Phoenix",
      currentState: "AZ",
      engagementScore: 45,
    },
  })

  const assignment2 = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate2.id,
      facilityName: "Cedars-Sinai Medical Center",
      city: "Los Angeles",
      state: "CA",
      startDate: new Date("2026-06-22"),
      endDate: new Date("2026-09-14"),
      duration: 13,
      shift: "Day 7a-7p",
      specialty: "ER",
      mspClient: "Aya Healthcare MSP",
      status: "PENDING",
      housingStatus: "NOT_STARTED",
      travelStatus: "NOT_STARTED",
      documentsStatus: "IN_PROGRESS",
    },
  })

  await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate2.id,
      assignmentId: assignment2.id,
      status: "VIEWED",
      weeklyPay: 2800,
      taxableRate: 32,
      stipend: 1480,
      totalContractValue: 36400,
      facilityName: "Cedars-Sinai Medical Center",
      city: "Los Angeles",
      state: "CA",
      startDate: new Date("2026-06-22"),
      duration: 13,
      shift: "Day 7a-7p",
      specialty: "ER",
      mspClient: "Aya Healthcare MSP",
      candidateConfidenceScore: 52,
      sentAt: new Date(Date.now() - 86400000),
      viewedAt: new Date(Date.now() - 43200000),
    },
  })

  await prisma.retentionRiskScore.create({
    data: {
      offerId: offer1.id,
      candidateId: candidate.id,
      riskScore: 35,
      riskLevel: "MEDIUM",
      reasoning: "Emily has viewed the offer and shown interest in housing options. However, she hasn't requested travel support yet and the start date is approaching. The relocation from Denver to Houston adds moderate friction.",
      suggestedAction: "Follow up with a personal call emphasizing the housing support and first-week readiness package. Address any concerns about the Houston area.",
      suggestedSms: "Hi Emily! Just checking in on the Memorial Hermann opportunity. I know relocating from Denver is a big move — that's why we've arranged housing support near the hospital. Want to chat about the details?",
      suggestedScript: "Emily, I wanted to follow up personally about the ICU position at Memorial Hermann. I know moving from Denver to Houston is significant, and I want to make sure you feel supported. We've arranged furnished housing near the hospital, and our concierge team will handle flight booking and first-week logistics. What questions do you have?",
      viewedOffer: true,
      housingRequested: true,
      travelRequested: false,
      engagementScore: 72,
      unansweredMessages: 1,
    },
  })

  await prisma.bookingRequest.create({
    data: {
      offerId: offer1.id,
      candidateId: candidate.id,
      agencyId: agency.id,
      needsFlight: true,
      needsHousing: true,
      needsCar: true,
      moveDate: new Date("2026-06-12"),
      budgetMin: 1500,
      budgetMax: 2500,
      preferredLocation: "Near Memorial Hermann Hospital, Texas Medical Center area",
      notes: "Prefer a furnished apartment with parking. Will be bringing a small dog.",
      status: "IN_PROGRESS",
      conciergeOwnerId: conciergeUser.id,
    },
  })

  const housingOptions = [
    {
      title: "Furnished Studio — Medical Center",
      description: "Modern furnished studio apartment with full kitchen, in-unit laundry, and fitness center. Pet-friendly with dedicated parking.",
      city: "Houston",
      state: "TX",
      address: "6550 Bertner Ave, Houston, TX 77030",
      zipCode: "77030",
      monthlyCost: 1850,
      distanceToFacility: 0.8,
      amenities: "Furnished, In-unit laundry, Fitness center, Pool, Pet-friendly, Parking, WiFi",
      isVerified: true,
      rating: 4.7,
    },
    {
      title: "1BR Apartment — Montrose",
      description: "Spacious 1-bedroom in trendy Montrose neighborhood. Walking distance to restaurants and shops. 10-minute drive to Medical Center.",
      city: "Houston",
      state: "TX",
      address: "1200 Westheimer Rd, Houston, TX 77006",
      zipCode: "77006",
      monthlyCost: 1650,
      distanceToFacility: 3.2,
      amenities: "Furnished, Parking, Pool, Gym, Pet-friendly",
      isVerified: true,
      rating: 4.5,
    },
    {
      title: "Corporate Housing — Museum District",
      description: "Premium corporate housing near Houston Museum District. All utilities included. Move-in ready with housewares package.",
      city: "Houston",
      state: "TX",
      address: "4800 Main St, Houston, TX 77002",
      zipCode: "77002",
      monthlyCost: 2200,
      distanceToFacility: 1.5,
      amenities: "Furnished, All utilities included, Housewares, Concierge, Parking, WiFi",
      isVerified: true,
      rating: 4.9,
    },
    {
      title: "Shared House — Bellaire",
      description: "Private room in shared healthcare traveler house. Great community of fellow nurses. All bills paid.",
      city: "Houston",
      state: "TX",
      address: "5200 Bellaire Blvd, Bellaire, TX 77401",
      zipCode: "77401",
      monthlyCost: 1200,
      distanceToFacility: 4.1,
      amenities: "Furnished, All bills paid, WiFi, Parking, Washer/Dryer",
      isVerified: true,
      rating: 4.3,
    },
  ]

  for (const housing of housingOptions) {
    await prisma.housingOption.create({ data: housing })
  }

  await prisma.travelOption.createMany({
    data: [
      { type: "Flight", origin: "Denver, CO (DEN)", destination: "Houston, TX (IAH)", cost: 289, description: "Round-trip economy flight" },
      { type: "Flight", origin: "Phoenix, AZ (PHX)", destination: "Los Angeles, CA (LAX)", cost: 195, description: "Round-trip economy flight" },
    ],
  })

  await prisma.carRentalOption.createMany({
    data: [
      { company: "Enterprise", vehicleType: "Compact", dailyRate: 35, weeklyRate: 199, city: "Houston", state: "TX", description: "Free pickup and drop-off" },
      { company: "Hertz", vehicleType: "Midsize", dailyRate: 42, weeklyRate: 245, city: "Houston", state: "TX", description: "Unlimited mileage included" },
      { company: "National", vehicleType: "SUV", dailyRate: 55, weeklyRate: 325, city: "Los Angeles", state: "CA", description: "Airport pickup available" },
    ],
  })

  await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: "Starter",
        tier: "STARTER",
        price: 499,
        features: ["Up to 5 users", "50 offers/month", "Basic mobility support", "Email support", "Standard analytics"],
        maxUsers: 5,
        maxOffers: 50,
      },
      {
        name: "Professional",
        tier: "PROFESSIONAL",
        price: 1499,
        features: ["Up to 25 users", "Unlimited offers", "Full concierge service", "AI insights & optimization", "Priority support", "Advanced analytics", "Custom branding"],
        maxUsers: 25,
      },
      {
        name: "Enterprise",
        tier: "ENTERPRISE",
        price: 0,
        features: ["Unlimited users", "Custom integrations", "Dedicated concierge team", "SLA guarantee", "SSO & SAML", "API access", "Custom reports", "Dedicated success manager"],
      },
    ],
  })

  for (let i = 0; i < 15; i++) {
    await prisma.activityLog.create({
      data: {
        userId: [adminUser.id, agencyOwner.id, recruiterUser.id, candidateUser.id][i % 4],
        offerId: i < 5 ? offer1.id : undefined,
        action: [
          "offer_created", "offer_sent", "offer_viewed", "housing_clicked",
          "booking_requested", "risk_calculated", "candidate_updated",
          "offer_accepted", "concierge_assigned", "document_uploaded",
          "flight_booked", "housing_confirmed", "readiness_checked",
          "ai_insight_generated", "report_exported",
        ][i],
        details: [
          "Created new offer for Emily Chen — Memorial Hermann ICU",
          "Offer sent to Emily Chen via email and SMS",
          "Emily Chen viewed offer #" + offer1.id.slice(0, 8),
          "Emily Chen clicked on housing options",
          "Emily Chen submitted booking request for housing and travel",
          "Retention risk calculated for Emily Chen: Medium (35)",
          "Updated candidate profile for Emily Chen",
          "Offer accepted by Emily Chen",
          "Lisa Park assigned as concierge for booking request",
          "Emily Chen uploaded nursing license document",
          "Flight booked: Denver → Houston, June 12",
          "Housing confirmed: Furnished Studio — Medical Center",
          "Readiness check completed for Emily Chen",
          "AI generated offer enhancement for James Wilson",
          "MSP report exported for Q2 2026",
        ][i],
        createdAt: new Date(Date.now() - i * 3600000),
      },
    })
  }

  for (const user of [adminUser, agencyOwner, recruiterUser, candidateUser]) {
    await prisma.notification.createMany({
      data: [
        {
          userId: user.id,
          title: "Welcome to TRITAL Orbit",
          message: "Your account has been set up successfully. Explore the platform to get started.",
          type: "INFO",
          isRead: true,
        },
        {
          userId: user.id,
          title: "New feature: AI Offer Enhancement",
          message: "Try our new AI-powered offer enhancement to boost acceptance rates.",
          type: "FEATURE",
          link: "/agency/offers/create",
        },
      ],
    })
  }

  await prisma.notification.create({
    data: {
      userId: recruiterUser.id,
      title: "High Risk Alert: James Wilson",
      message: "James Wilson has viewed the Cedars-Sinai offer but hasn't responded in 24 hours. Risk score: 65.",
      type: "ALERT",
      link: "/agency",
    },
  })

  await prisma.lead.createMany({
    data: [
      { name: "Healthcare Corp", email: "info@healthcorp.com", company: "HealthCorp Staffing", phone: "(555) 111-2222", role: "VP Operations", message: "Interested in the professional plan for our team of 15 recruiters.", source: "website_contact" },
      { name: "Maria Santos", email: "maria@travelstaffpro.com", company: "TravelStaff Pro", phone: "(555) 333-4444", role: "Agency Owner", message: "Looking for a mobility solution to reduce our backout rate.", source: "website_contact" },
    ],
  })

  await prisma.demoRequest.create({
    data: {
      name: "Jennifer Adams",
      email: "jadams@regionalhealthsystem.org",
      company: "Regional Health System",
      phone: "(555) 555-6666",
      role: "Director of Workforce",
      companySize: "500-1000",
      currentTools: "Manual spreadsheets, basic ATS",
      message: "We're losing too many travel nurses before start date. Need help with housing and readiness.",
    },
  })

  console.log("✅ Seed data created successfully!")
  console.log("")
  console.log("Demo accounts:")
  console.log("  admin@tritalorbit.com / password123 — Super Admin")
  console.log("  agency@tritalorbit.com / password123 — Agency Owner")
  console.log("  recruiter@tritalorbit.com / password123 — Recruiter")
  console.log("  candidate@tritalorbit.com / password123 — Candidate")
  console.log("  concierge@tritalorbit.com / password123 — Concierge Manager")
  console.log("  vendor@tritalorbit.com / password123 — Vendor")
  console.log("  msp@tritalorbit.com / password123 — MSP Viewer")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
