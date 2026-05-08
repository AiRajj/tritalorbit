/* TRITAL Orbit™ — Demo seed data */
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("[seed] Resetting demo dataset…");

  // Wipe demo data (idempotent)
  await prisma.$transaction([
    prisma.activityLog.deleteMany({}),
    prisma.notification.deleteMany({}),
    prisma.aIInsight.deleteMany({}),
    prisma.retentionRiskScore.deleteMany({}),
    prisma.conciergeTask.deleteMany({}),
    prisma.bookingRequest.deleteMany({}),
    prisma.assignment.deleteMany({}),
    prisma.offerPerk.deleteMany({}),
    prisma.offer.deleteMany({}),
    prisma.candidate.deleteMany({}),
    prisma.housingOption.deleteMany({}),
    prisma.travelOption.deleteMany({}),
    prisma.carRentalOption.deleteMany({}),
    prisma.vendor.deleteMany({}),
    prisma.landlord.deleteMany({}),
    prisma.documentVault.deleteMany({}),
    prisma.mSPReport.deleteMany({}),
    prisma.paymentRecord.deleteMany({}),
    prisma.agencySubscription.deleteMany({}),
    prisma.agencyMember.deleteMany({}),
    prisma.user.deleteMany({}),
    prisma.agency.deleteMany({}),
    prisma.subscriptionPlan.deleteMany({}),
    prisma.lead.deleteMany({}),
    prisma.demoRequest.deleteMany({}),
    prisma.auditLog.deleteMany({}),
  ]);

  // ── Subscription plans ───────────────────────────────────────────────
  const [starter, growth, enterprise] = await Promise.all([
    prisma.subscriptionPlan.create({
      data: {
        tier: "STARTER",
        name: "Starter",
        monthlyPrice: 1800,
        annualPrice: 19800,
        features: ["Offer Boost Builder", "Candidate Hub", "Retention Risk Engine"],
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        tier: "GROWTH",
        name: "Growth",
        monthlyPrice: 4200,
        annualPrice: 46200,
        features: ["Everything in Starter", "Concierge board", "Vendor marketplace", "Assignment Launch"],
        isFeatured: true,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        tier: "ENTERPRISE",
        name: "Enterprise",
        monthlyPrice: 9500,
        annualPrice: 102000,
        features: ["Everything in Growth", "SAML SSO + SCIM", "Custom AI prompts", "Dedicated solutions architect"],
      },
    }),
  ]);

  // ── Agency ───────────────────────────────────────────────────────────
  const agency = await prisma.agency.create({
    data: {
      name: "Mercury Clinical Staffing",
      slug: "mercury-clinical",
      domain: "mercurystaffing.demo",
      brandColor: "#0B3C5D",
      timezone: "America/Chicago",
    },
  });

  // ── Users ────────────────────────────────────────────────────────────
  const password = await bcrypt.hash("orbit-demo-2026", 10);
  const [admin, owner, recruiter, concierge, msp, candidateUser, vendorUser, landlordUser] = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@orbit.demo",
        name: "Aria Chen",
        role: "SUPER_ADMIN",
        passwordHash: password,
      },
    }),
    prisma.user.create({
      data: {
        email: "owner@orbit.demo",
        name: "Marcus Hayes",
        role: "AGENCY_OWNER",
        passwordHash: password,
        agencyId: agency.id,
        title: "Founder & CEO",
      },
    }),
    prisma.user.create({
      data: {
        email: "recruiter@orbit.demo",
        name: "Priya Patel",
        role: "RECRUITER",
        passwordHash: password,
        agencyId: agency.id,
        title: "Senior Recruiter",
      },
    }),
    prisma.user.create({
      data: {
        email: "concierge@orbit.demo",
        name: "Sasha Romero",
        role: "CONCIERGE_MANAGER",
        passwordHash: password,
        agencyId: agency.id,
        title: "Concierge Lead",
      },
    }),
    prisma.user.create({
      data: {
        email: "msp@orbit.demo",
        name: "Devon Walsh",
        role: "MSP_VIEWER",
        passwordHash: password,
        agencyId: agency.id,
        title: "MSP Program Director",
      },
    }),
    prisma.user.create({
      data: {
        email: "clinician@orbit.demo",
        name: "Maya Rivera",
        role: "CANDIDATE",
        passwordHash: password,
      },
    }),
    prisma.user.create({
      data: {
        email: "vendor@orbit.demo",
        name: "Riley Kim",
        role: "VENDOR",
        passwordHash: password,
      },
    }),
    prisma.user.create({
      data: {
        email: "landlord@orbit.demo",
        name: "Jordan Lee",
        role: "LANDLORD",
        passwordHash: password,
      },
    }),
  ]);

  await prisma.agency.update({ where: { id: agency.id }, data: { ownerId: owner.id } });

  await prisma.agencyMember.createMany({
    data: [
      { agencyId: agency.id, userId: owner.id, role: "AGENCY_OWNER" },
      { agencyId: agency.id, userId: recruiter.id, role: "RECRUITER" },
      { agencyId: agency.id, userId: concierge.id, role: "CONCIERGE_MANAGER" },
      { agencyId: agency.id, userId: msp.id, role: "MSP_VIEWER" },
    ],
  });

  // ── Subscription ────────────────────────────────────────────────────
  await prisma.agencySubscription.create({
    data: {
      agencyId: agency.id,
      planId: growth.id,
      status: "ACTIVE",
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // ── Vendors / Landlords ─────────────────────────────────────────────
  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      agencyId: agency.id,
      type: "TRAVEL",
      name: "OrbitWings Travel",
      contactEmail: "ops@orbitwings.demo",
      contactPhone: "+1 (832) 303-6622",
      city: "Houston",
      state: "TX",
      description: "National travel + ground transport partner with healthcare staffing rate cards.",
      rating: 4.8,
      verification: "APPROVED",
    },
  });
  const landlord = await prisma.landlord.create({
    data: {
      userId: landlordUser.id,
      name: "Heights Corporate Stays",
      contactEmail: "stays@heights.demo",
      contactPhone: "+1 (832) 555-0144",
      city: "Houston",
      state: "TX",
      about: "Furnished 1- and 2-bedroom corporate units within 5 miles of major Houston hospitals.",
      rating: 4.7,
      verification: "APPROVED",
    },
  });

  // Housing options
  const housingData: Prisma.HousingOptionCreateManyInput[] = [
    { landlordId: landlord.id, title: "Heights · 2BR Stay", description: "Modern 2-bd, full kitchen, in-unit laundry. 1.4 mi to Memorial Hermann.", city: "Houston", state: "TX", bedrooms: 2, bathrooms: 1, monthlyCost: 2950, distanceMiles: 1.4, available: true, verification: "APPROVED", rating: 4.8 },
    { landlordId: landlord.id, title: "Med Center · 1BR Loft", description: "Loft-style 1-bd with garage, blocks from Texas Medical Center.", city: "Houston", state: "TX", bedrooms: 1, bathrooms: 1, monthlyCost: 2200, distanceMiles: 0.6, available: true, verification: "APPROVED", rating: 4.7 },
    { landlordId: landlord.id, title: "Galleria · Studio", description: "Compact studio, walking distance to dining. Renovated 2025.", city: "Houston", state: "TX", bedrooms: 0, bathrooms: 1, monthlyCost: 1850, distanceMiles: 2.8, available: true, verification: "APPROVED", rating: 4.5 },
    { landlordId: landlord.id, title: "Energy Corridor · 2BR", description: "Quiet 2-bd suburban setting near MD Anderson West.", city: "Houston", state: "TX", bedrooms: 2, bathrooms: 2, monthlyCost: 2750, distanceMiles: 4.5, available: true, verification: "APPROVED", rating: 4.6 },
    { landlordId: landlord.id, title: "Austin · Mueller 1BR", description: "Walkable Mueller district near Dell Seton.", city: "Austin", state: "TX", bedrooms: 1, bathrooms: 1, monthlyCost: 2400, distanceMiles: 1.1, available: true, verification: "APPROVED", rating: 4.8 },
    { landlordId: landlord.id, title: "Dallas · Uptown 1BR", description: "Furnished 1-bd in Uptown Dallas, 1.8mi to Baylor.", city: "Dallas", state: "TX", bedrooms: 1, bathrooms: 1, monthlyCost: 2600, distanceMiles: 1.8, available: true, verification: "APPROVED", rating: 4.7 },
  ];
  await prisma.housingOption.createMany({ data: housingData });

  await prisma.travelOption.createMany({
    data: [
      { vendorId: vendor.id, type: "FLIGHT", origin: "JFK", destination: "IAH", estCost: 320, available: true },
      { vendorId: vendor.id, type: "GROUND", origin: "IAH", destination: "Memorial Hermann", estCost: 65, available: true },
    ],
  });
  await prisma.carRentalOption.createMany({
    data: [
      { vendorId: vendor.id, city: "Houston", state: "TX", carClass: "Compact", weeklyCost: 285, available: true },
      { vendorId: vendor.id, city: "Houston", state: "TX", carClass: "Mid-size SUV", weeklyCost: 385, available: true },
    ],
  });

  // ── Candidates ──────────────────────────────────────────────────────
  await prisma.candidate.create({
    data: {
      userId: candidateUser.id,
      agencyId: agency.id,
      firstName: "Maya",
      lastName: "Rivera",
      email: "clinician@orbit.demo",
      phone: "+1 (713) 555-0142",
      role: "Registered Nurse",
      specialty: "ICU",
      licenseState: "TX",
      yearsExperience: 6,
      city: "Phoenix",
      state: "AZ",
      engagementScore: 78,
    },
  });

  const candidates = await Promise.all(
    [
      ["Jordan", "Patel", "ER RN", "ER", "TX"],
      ["Devon", "Nguyen", "Tele RN", "Tele", "CA"],
      ["Avery", "Brooks", "Cath Lab Tech", "Cath", "FL"],
      ["Kim", "Owens", "Resp Therapist", "RT", "WA"],
      ["Sam", "Wright", "OR RN", "OR", "NY"],
      ["Riley", "Jackson", "MD Hospitalist", "Internal", "TX"],
      ["Morgan", "Cole", "PT", "PT", "TX"],
      ["Cameron", "Diaz", "PA Hospitalist", "Internal", "AZ"],
    ].map(async ([first, last, role, specialty, licenseState]) =>
      prisma.candidate.create({
        data: {
          agencyId: agency.id,
          firstName: first,
          lastName: last,
          email: `${first.toLowerCase()}.${last.toLowerCase()}@orbit.demo`,
          phone: "+1 (713) 555-0" + Math.floor(100 + Math.random() * 900),
          role,
          specialty,
          licenseState,
          yearsExperience: Math.floor(2 + Math.random() * 12),
          engagementScore: Math.floor(40 + Math.random() * 55),
        },
      }),
    ),
  );

  const allCandidates = await prisma.candidate.findMany({ where: { agencyId: agency.id } });

  // ── Offers ──────────────────────────────────────────────────────────
  const facilities = [
    { facility: "Memorial Hermann · Texas Med Center", city: "Houston", state: "TX" },
    { facility: "Dell Seton Medical Center", city: "Austin", state: "TX" },
    { facility: "Baylor University Medical", city: "Dallas", state: "TX" },
    { facility: "Cedars-Sinai Medical Center", city: "Los Angeles", state: "CA" },
    { facility: "Jackson Memorial Hospital", city: "Miami", state: "FL" },
  ];

  const statuses: Array<"DRAFT" | "SENT" | "VIEWED" | "NEGOTIATING" | "ACCEPTED"> = [
    "SENT",
    "VIEWED",
    "NEGOTIATING",
    "ACCEPTED",
    "SENT",
    "VIEWED",
    "ACCEPTED",
    "DRAFT",
  ];

  for (let i = 0; i < allCandidates.length; i++) {
    const c = allCandidates[i];
    const f = facilities[i % facilities.length];
    const status = statuses[i % statuses.length];
    const weeklyPay = 2200 + Math.round(Math.random() * 800);
    const duration = 13;
    const startDate = new Date(Date.now() + (5 + i * 3) * 24 * 60 * 60 * 1000);

    const offer = await prisma.offer.create({
      data: {
        agencyId: agency.id,
        recruiterId: recruiter.id,
        candidateId: c.id,
        facilityName: f.facility,
        city: f.city,
        state: f.state,
        startDate,
        durationWeeks: duration,
        shift: i % 2 === 0 ? "Night, 3x12" : "Day, 4x10",
        specialty: c.specialty,
        mspClient: i % 2 === 0 ? "HealthAlliance MSP" : "Coastal Health VMS",
        weeklyPay: new Prisma.Decimal(weeklyPay),
        taxableRate: new Prisma.Decimal(28 + Math.round(Math.random() * 12)),
        stipend: new Prisma.Decimal(900 + Math.round(Math.random() * 350)),
        totalContractValue: new Prisma.Decimal(weeklyPay * duration),
        flightSupport: i % 2 === 0,
        housingAssist: true,
        carRental: i % 3 === 0,
        relocationConcierge: true,
        firstWeekReadiness: true,
        emergencyHousing: i % 4 === 0,
        loyaltyRewards: i % 5 === 0,
        status,
        sentAt: status !== "DRAFT" ? new Date(Date.now() - i * 36 * 60 * 60 * 1000) : null,
        viewedAt: ["VIEWED", "NEGOTIATING", "ACCEPTED"].includes(status) ? new Date(Date.now() - i * 24 * 60 * 60 * 1000) : null,
        respondedAt: status === "ACCEPTED" ? new Date(Date.now() - i * 12 * 60 * 60 * 1000) : null,
        confidenceScore: 65 + Math.round(Math.random() * 30),
        enhancedSummary: `${duration}-week ${c.specialty} engagement at ${f.facility} in ${f.city}, ${f.state} at $${weeklyPay}/wk. Wrapped in TRITAL Orbit mobility — housing + concierge + first-week readiness — so day one is routine, not chaotic.`,
        candidateValueStmt: `${c.firstName}, this is more than a paycheck — it's a turn-key move. We've handled housing and travel so you can focus on patient care. $${weeklyPay}/wk, with the support that makes ${f.city} feel like home from day one.`,
        smsPitch: `Hey ${c.firstName} — locked in $${weeklyPay}/wk at ${f.facility} in ${f.city}, plus housing assist. Want me to send the breakdown? — TRITAL Orbit`,
        emailPitch: `Subject: Your ${c.specialty} assignment in ${f.city}\n\nHi ${c.firstName},\n\nI built this with you in mind. $${weeklyPay}/wk at ${f.facility}.`,
        closeStrategy: "Lead with mobility. Anchor on lifestyle, not pay. Confirm verbally within 24h.",
        recruiterTalkingPoints: "Lead with housing\n• Anchor on total package value\n• Reduce friction with concierge\n• Close on a specific date",
      },
    });

    if (status === "ACCEPTED") {
      await prisma.assignment.create({
        data: {
          offerId: offer.id,
          candidateId: c.id,
          agencyId: agency.id,
          startDate,
          status: "PRE_START",
          housingStatus: i % 2 === 0 ? "COMPLETE" : "IN_PROGRESS",
          travelStatus: i % 3 === 0 ? "COMPLETE" : "IN_PROGRESS",
          documentsStatus: i % 2 === 0 ? "COMPLETE" : "IN_PROGRESS",
          firstWeekStatus: "IN_PROGRESS",
          readinessScore: 60 + Math.round(Math.random() * 35),
          riskScore: 20 + Math.round(Math.random() * 50),
          riskLevel: i % 5 === 0 ? "HIGH" : "LOW",
        },
      });
    }

    // Risk score for some
    if (i % 3 === 0) {
      const score = i % 9 === 0 ? 82 : 48 + Math.round(Math.random() * 30);
      const level = score >= 75 ? "CRITICAL" : score >= 55 ? "HIGH" : score >= 35 ? "MEDIUM" : "LOW";
      await prisma.retentionRiskScore.create({
        data: {
          candidateId: c.id,
          offerId: offer.id,
          score,
          level,
          reasoning:
            level === "CRITICAL"
              ? `${c.firstName} has signals consistent with a likely backout: housing not requested and start date is approaching.`
              : `${c.firstName} is showing mixed signals. Engagement moderate but mobility friction remains.`,
          suggestedAction:
            level === "CRITICAL"
              ? `Call ${c.firstName} within the next 60 minutes with a personalized housing solution.`
              : `Trigger Orbit Concierge for housing options.`,
          suggestedSms: `Hi ${c.firstName}, I want to make sure housing & travel are zero-stress before start day. Can I lock in a move-in date today?`,
          suggestedCallScript: `Open warmly. Confirm housing, travel, must-haves. Surface Orbit mobility. Close on a specific date.`,
        },
      });
    }

    // Activity log
    await prisma.activityLog.create({
      data: {
        actorId: recruiter.id,
        candidateId: c.id,
        offerId: offer.id,
        action: status === "DRAFT" ? "offer.created" : "offer.sent",
        description: status === "DRAFT" ? "Created offer." : `Offer sent to ${c.firstName}.`,
      },
    });
  }

  // ── Booking Requests + concierge tasks ─────────────────────────────
  const someAccepted = await prisma.offer.findMany({
    where: { agencyId: agency.id, status: { in: ["ACCEPTED", "VIEWED"] } },
    take: 5,
  });
  for (const o of someAccepted) {
    const booking = await prisma.bookingRequest.create({
      data: {
        agencyId: agency.id,
        candidateId: o.candidateId,
        offerId: o.id,
        needHousing: true,
        needFlight: Math.random() > 0.5,
        needCar: Math.random() > 0.6,
        moveDate: o.startDate,
        budgetMin: 1800,
        budgetMax: 3200,
        preferredLocation: `${o.city}, ${o.state}`,
        notes: "Quiet neighborhood preferred, near gym.",
        status: "IN_PROGRESS",
        conciergeOwnerId: concierge.id,
      },
    });
    await prisma.conciergeTask.create({
      data: {
        agencyId: agency.id,
        bookingId: booking.id,
        assigneeId: concierge.id,
        title: `Mobility request · ${o.city}`,
        description: "Shortlist 3 housing options and confirm move-in.",
        status: "IN_PROGRESS",
      },
    });
  }

  await prisma.notification.createMany({
    data: [
      {
        userId: recruiter.id,
        type: "RISK",
        title: "High-risk candidate flagged",
        message: "A candidate is at HIGH risk of backout — call within 4 hours.",
        link: "/recruiter/risk",
      },
      {
        userId: owner.id,
        type: "OFFER",
        title: "Offer accepted",
        message: "Maya R. accepted Memorial Hermann · ICU",
        link: "/agency/offers",
      },
    ],
  });

  await prisma.lead.create({
    data: { name: "Demo Lead", email: "demo@example.com", company: "Sample Health System", message: "Interested in MSP reporting", source: "seed" },
  });
  await prisma.demoRequest.create({
    data: { name: "Demo Request", email: "demo-request@example.com", company: "Demo Co.", role: "VP", teamSize: "11-50", notes: "Pilot interest" },
  });

  await prisma.auditLog.createMany({
    data: [
      { actorId: admin.id, action: "LOGIN", entity: "User", entityId: admin.id, ip: "127.0.0.1" },
      { actorId: owner.id, action: "CREATE", entity: "Offer", entityId: someAccepted[0]?.id ?? null, ip: "127.0.0.1" },
    ],
  });

  console.log("[seed] Demo dataset loaded.\n  Login: owner@orbit.demo / orbit-demo-2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
