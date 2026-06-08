import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding TRITAL Orbit™ database...');

  const hashedPassword = await bcrypt.hash('password123', 12);

  // Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tritalorbit.com' },
    update: {},
    create: {
      email: 'admin@tritalorbit.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  // Agency
  const agency = await prisma.agency.create({
    data: {
      name: 'HealthFirst Staffing',
      slug: 'healthfirst-staffing',
      description: 'Premier healthcare staffing agency',
      contactEmail: 'info@healthfirst.com',
      contactPhone: '(555) 123-4567',
      city: 'Houston',
      state: 'TX',
      isActive: true,
    },
  });

  // Agency Owner
  const agencyOwner = await prisma.user.upsert({
    where: { email: 'owner@healthfirst.com' },
    update: {},
    create: {
      email: 'owner@healthfirst.com',
      name: 'Jennifer Martinez',
      password: hashedPassword,
      role: 'AGENCY_OWNER',
      agencyId: agency.id,
    },
  });

  await prisma.agencyMember.create({
    data: { userId: agencyOwner.id, agencyId: agency.id, role: 'AGENCY_OWNER', isActive: true },
  });

  // Recruiter
  const recruiter = await prisma.user.upsert({
    where: { email: 'recruiter@healthfirst.com' },
    update: {},
    create: {
      email: 'recruiter@healthfirst.com',
      name: 'David Chen',
      password: hashedPassword,
      role: 'RECRUITER',
      agencyId: agency.id,
    },
  });

  await prisma.agencyMember.create({
    data: { userId: recruiter.id, agencyId: agency.id, role: 'RECRUITER', isActive: true },
  });

  // Concierge Manager
  const concierge = await prisma.user.upsert({
    where: { email: 'concierge@tritalorbit.com' },
    update: {},
    create: {
      email: 'concierge@tritalorbit.com',
      name: 'Maria Johnson',
      password: hashedPassword,
      role: 'CONCIERGE_MANAGER',
    },
  });

  // MSP Viewer
  const mspViewer = await prisma.user.upsert({
    where: { email: 'msp@medstaff.com' },
    update: {},
    create: {
      email: 'msp@medstaff.com',
      name: 'Robert Williams',
      password: hashedPassword,
      role: 'MSP_VIEWER',
    },
  });

  // Candidate 1
  const candidateUser1 = await prisma.user.upsert({
    where: { email: 'sarah.mitchell@email.com' },
    update: {},
    create: {
      email: 'sarah.mitchell@email.com',
      name: 'Sarah Mitchell',
      password: hashedPassword,
      role: 'CANDIDATE',
    },
  });

  const candidate1 = await prisma.candidate.create({
    data: {
      userId: candidateUser1.id,
      firstName: 'Sarah',
      lastName: 'Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '(555) 234-5678',
      specialty: 'ICU',
      licenseState: 'TX',
      experience: 5,
      profileComplete: true,
    },
  });

  // Candidate 2
  const candidateUser2 = await prisma.user.upsert({
    where: { email: 'james.thompson@email.com' },
    update: {},
    create: {
      email: 'james.thompson@email.com',
      name: 'James Thompson',
      password: hashedPassword,
      role: 'CANDIDATE',
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      userId: candidateUser2.id,
      firstName: 'James',
      lastName: 'Thompson',
      email: 'james.thompson@email.com',
      phone: '(555) 345-6789',
      specialty: 'ER',
      licenseState: 'CA',
      experience: 8,
      profileComplete: true,
    },
  });

  // Vendor
  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@travelerlodge.com' },
    update: {},
    create: {
      email: 'vendor@travelerlodge.com',
      name: 'Mike Anderson',
      password: hashedPassword,
      role: 'VENDOR',
    },
  });

  const vendor = await prisma.vendor.create({
    data: {
      userId: vendorUser.id,
      name: 'Mike Anderson',
      companyName: 'Traveler Lodge Suites',
      email: 'vendor@travelerlodge.com',
      phone: '(555) 456-7890',
      type: 'HOUSING',
      description: 'Premium furnished apartments for traveling healthcare professionals',
      verified: true,
      rating: 4.8,
      isActive: true,
    },
  });

  // Housing Options
  await prisma.housingOption.createMany({
    data: [
      {
        vendorId: vendor.id,
        title: 'Modern Studio near Memorial Hospital',
        description: 'Fully furnished studio apartment, 5 minutes from Memorial Hospital',
        address: '123 Medical Center Dr',
        city: 'Houston',
        state: 'TX',
        zipCode: '77030',
        monthlyRate: 1800,
        availableFrom: new Date('2026-06-01'),
        bedrooms: 0,
        bathrooms: 1,
        furnished: true,
        petFriendly: false,
        distanceToFacility: 0.5,
        verified: true,
        rating: 4.7,
        images: [],
      },
      {
        vendorId: vendor.id,
        title: '1BR Apartment - Texas Medical Center',
        description: 'Spacious 1-bedroom apartment with parking, washer/dryer, gym',
        address: '456 Hospital Blvd',
        city: 'Houston',
        state: 'TX',
        zipCode: '77030',
        monthlyRate: 2200,
        availableFrom: new Date('2026-06-01'),
        bedrooms: 1,
        bathrooms: 1,
        furnished: true,
        petFriendly: true,
        distanceToFacility: 1.2,
        verified: true,
        rating: 4.9,
        images: [],
      },
    ],
  });

  // Assignments
  const assignment1 = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate1.id,
      facilityName: 'Memorial Hermann Hospital',
      city: 'Houston',
      state: 'TX',
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-09-14'),
      duration: 13,
      shift: 'Night',
      specialty: 'ICU',
      mspClient: 'HCA Healthcare',
      status: 'ACTIVE',
    },
  });

  const assignment2 = await prisma.assignment.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate2.id,
      facilityName: 'Cedars-Sinai Medical Center',
      city: 'Los Angeles',
      state: 'CA',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-09-30'),
      duration: 13,
      shift: 'Day',
      specialty: 'ER',
      mspClient: 'AMN Healthcare',
      status: 'ACTIVE',
    },
  });

  // Offers
  const offer1 = await prisma.offer.create({
    data: {
      agencyId: agency.id,
      candidateId: candidate1.id,
      assignmentId: assignment1.id,
      weeklyPay: 2850,
      taxableRate: 28,
      stipend: 1200,
      totalContractValue: 37050,
      status: 'SENT',
      token: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
      sentAt: new Date(),
    },
  });

  // Offer Perks
  await prisma.offerPerk.createMany({
    data: [
      { offerId: offer1.id, type: 'FLIGHT', isEnabled: true, details: 'Round-trip flight from Dallas to Houston' },
      { offerId: offer1.id, type: 'HOUSING', isEnabled: true, details: 'Furnished apartment near facility' },
      { offerId: offer1.id, type: 'CAR_RENTAL', isEnabled: true, details: 'Weekly car rental included' },
      { offerId: offer1.id, type: 'FIRST_WEEK', isEnabled: true, details: 'Orientation prep, badge, parking pass' },
    ],
  });

  // Subscription Plans
  await prisma.subscriptionPlan.createMany({
    data: [
      {
        name: 'Starter',
        description: 'For small agencies getting started',
        monthlyPrice: 499,
        annualPrice: 4990,
        features: JSON.parse('["25 active offers", "5 users", "Basic AI", "Email support"]'),
        maxUsers: 5,
        maxOffers: 25,
        isActive: true,
      },
      {
        name: 'Professional',
        description: 'For growing agencies',
        monthlyPrice: 1299,
        annualPrice: 12990,
        features: JSON.parse('["100 active offers", "25 users", "Full AI suite", "Priority support", "Concierge access"]'),
        maxUsers: 25,
        maxOffers: 100,
        isActive: true,
      },
      {
        name: 'Enterprise',
        description: 'For large organizations',
        monthlyPrice: 0,
        annualPrice: 0,
        features: JSON.parse('["Unlimited offers", "Unlimited users", "Custom AI models", "Dedicated support", "SSO", "Custom integrations"]'),
        maxUsers: -1,
        maxOffers: -1,
        isActive: true,
      },
    ],
  });

  // Activity Logs
  await prisma.activityLog.createMany({
    data: [
      { userId: recruiter.id, offerId: offer1.id, candidateId: candidate1.id, action: 'OFFER_CREATED', details: 'Created offer for Sarah Mitchell at Memorial Hermann' },
      { userId: recruiter.id, offerId: offer1.id, candidateId: candidate1.id, action: 'OFFER_SENT', details: 'Sent offer to Sarah Mitchell via email and SMS' },
    ],
  });

  // Notifications
  await prisma.notification.createMany({
    data: [
      { userId: recruiter.id, title: 'Offer Sent', message: 'Your offer to Sarah Mitchell has been sent successfully', type: 'SUCCESS', read: false, link: '/agency/offers/' + offer1.id + '/preview' },
      { userId: agencyOwner.id, title: 'New Booking Request', message: 'Sarah Mitchell has requested housing support', type: 'INFO', read: false, link: '/agency/booking-requests' },
      { userId: concierge.id, title: 'New Task Assigned', message: 'Housing booking request for Sarah Mitchell', type: 'INFO', read: false, link: '/concierge/requests' },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('Demo accounts:');
  console.log('  Admin:     admin@tritalorbit.com / password123');
  console.log('  Agency:    owner@healthfirst.com / password123');
  console.log('  Recruiter: recruiter@healthfirst.com / password123');
  console.log('  Concierge: concierge@tritalorbit.com / password123');
  console.log('  MSP:       msp@medstaff.com / password123');
  console.log('  Candidate: sarah.mitchell@email.com / password123');
  console.log('  Vendor:    vendor@travelerlodge.com / password123');
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
