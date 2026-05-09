-- CreateEnum
CREATE TYPE "MobilityRequestType" AS ENUM ('FLIGHT', 'HOUSING', 'CAR_RENTAL', 'HOTEL', 'FULL_RELOCATION_PACKAGE');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MobilityRequestWorkflowStatus" AS ENUM ('DRAFT', 'OPEN_FOR_BIDS', 'REVIEWING', 'BID_ACCEPTED', 'EXPIRED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "MobilityBidType" AS ENUM ('FLIGHT', 'HOUSING', 'CAR_RENTAL', 'HOTEL', 'FULL_PACKAGE');

-- CreateEnum
CREATE TYPE "MobilityBidWorkflowStatus" AS ENUM ('SUBMITTED', 'SHORTLISTED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "MobilityBookingStatus" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentResponsibility" AS ENUM ('CANDIDATE', 'AGENCY', 'SHARED', 'WALLET_CREDIT');

-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('TRAVEL_AGENCY', 'HOUSING_PROVIDER', 'CAR_RENTAL', 'HOTEL', 'RELOCATION_VENDOR');

-- CreateEnum
CREATE TYPE "WalletOwnerType" AS ENUM ('CANDIDATE', 'AGENCY', 'VENDOR');

-- CreateEnum
CREATE TYPE "WalletStatus" AS ENUM ('ACTIVE', 'FROZEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "WalletCreditType" AS ENUM ('FLIGHT', 'HOUSING', 'HOTEL', 'CAR_RENTAL', 'RELOCATION', 'EMERGENCY', 'GENERAL');

-- CreateEnum
CREATE TYPE "WalletCreditStatus" AS ENUM ('ACTIVE', 'USED', 'PARTIALLY_USED', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WalletTransactionType" AS ENUM ('CREDIT_ADDED', 'CREDIT_USED', 'REFUND', 'VENDOR_PAYOUT', 'PLATFORM_FEE', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "VerificationReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NEEDS_REVIEW');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ClinicianSubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'TRIALING', 'PAST_DUE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'TRAVEL_AGENCY_VENDOR';
ALTER TYPE "Role" ADD VALUE 'HOUSING_PROVIDER';
ALTER TYPE "Role" ADD VALUE 'HOTEL_PARTNER';
ALTER TYPE "Role" ADD VALUE 'CAR_RENTAL_PARTNER';
ALTER TYPE "Role" ADD VALUE 'RELOCATION_PARTNER';
ALTER TYPE "Role" ADD VALUE 'FINANCE_BILLING_ADMIN';

-- CreateTable
CREATE TABLE "MobilityRequest" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "offerId" TEXT,
    "createdByUserId" TEXT,
    "requestType" "MobilityRequestType" NOT NULL,
    "originCity" TEXT,
    "originState" TEXT,
    "originAirport" TEXT,
    "destinationCity" TEXT,
    "destinationState" TEXT,
    "destinationAirport" TEXT,
    "assignmentCity" TEXT NOT NULL,
    "assignmentState" TEXT NOT NULL,
    "facilityName" TEXT NOT NULL,
    "moveDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "budgetMin" DECIMAL(10,2),
    "budgetMax" DECIMAL(10,2),
    "preferredAirline" TEXT,
    "baggageNeeded" BOOLEAN NOT NULL DEFAULT false,
    "checkedBags" INTEGER NOT NULL DEFAULT 0,
    "housingNeeded" BOOLEAN NOT NULL DEFAULT false,
    "carNeeded" BOOLEAN NOT NULL DEFAULT false,
    "hotelNeeded" BOOLEAN NOT NULL DEFAULT false,
    "petFriendly" BOOLEAN NOT NULL DEFAULT false,
    "accessibilityNeeds" TEXT,
    "preferredCommuteMinutes" INTEGER,
    "notes" TEXT,
    "urgencyLevel" "UrgencyLevel" NOT NULL DEFAULT 'MEDIUM',
    "status" "MobilityRequestWorkflowStatus" NOT NULL DEFAULT 'DRAFT',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilityBid" (
    "id" TEXT NOT NULL,
    "mobilityRequestId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendorUserId" TEXT,
    "bidType" "MobilityBidType" NOT NULL,
    "packageName" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "taxesAndFees" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "platformFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "estimatedSavings" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "airlineName" TEXT,
    "flightNumber" TEXT,
    "departureAirport" TEXT,
    "arrivalAirport" TEXT,
    "departureTime" TIMESTAMP(3),
    "arrivalTime" TIMESTAMP(3),
    "stops" INTEGER NOT NULL DEFAULT 0,
    "baggageIncluded" INTEGER NOT NULL DEFAULT 0,
    "housingAddress" TEXT,
    "housingDistanceToFacility" DOUBLE PRECISION,
    "housingMonthlyCost" DECIMAL(10,2),
    "leaseFlexibility" TEXT,
    "carRentalCompany" TEXT,
    "carClass" TEXT,
    "hotelName" TEXT,
    "nightlyRate" DECIMAL(10,2),
    "cancellationPolicy" TEXT,
    "refundability" TEXT,
    "includedServices" JSONB,
    "notes" TEXT,
    "bidScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "conciergeRecommended" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "MobilityBidWorkflowStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityBid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilityBooking" (
    "id" TEXT NOT NULL,
    "mobilityRequestId" TEXT NOT NULL,
    "acceptedBidId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "createdByUserId" TEXT,
    "bookingReference" TEXT NOT NULL,
    "bookingStatus" "MobilityBookingStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "paymentResponsibility" "PaymentResponsibility" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "platformFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "vendorPayout" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bookingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorBidProfile" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendorCategory" "VendorCategory" NOT NULL,
    "serviceStates" TEXT[],
    "serviceCities" TEXT[],
    "apiEnabled" BOOLEAN NOT NULL DEFAULT false,
    "manualBidEnabled" BOOLEAN NOT NULL DEFAULT true,
    "verificationStatus" "VerificationReviewStatus" NOT NULL DEFAULT 'PENDING',
    "averageResponseTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageSavings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bookingCompletionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "chargebackRiskScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyBidLimit" INTEGER NOT NULL DEFAULT 5,
    "bidsUsedThisMonth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorBidProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "ownerType" "WalletOwnerType" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "agencyId" TEXT,
    "candidateId" TEXT,
    "vendorId" TEXT,
    "balance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "WalletStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletCredit" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "assignmentId" TEXT,
    "creditType" "WalletCreditType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "usedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "status" "WalletCreditStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "walletCreditId" TEXT,
    "agencyId" TEXT,
    "candidateId" TEXT,
    "vendorId" TEXT,
    "type" "WalletTransactionType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "description" TEXT NOT NULL,
    "status" "WalletEntryStatus" NOT NULL DEFAULT 'POSTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferComparisonV2" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "assignmentId" TEXT,
    "offerId" TEXT,
    "title" TEXT NOT NULL,
    "comparisonStatus" "ComparisonStatus" NOT NULL DEFAULT 'DRAFT',
    "aiSummary" TEXT,
    "bestOfferId" TEXT,
    "disclaimerAccepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferComparisonV2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalOffer" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "sourceAgencyName" TEXT NOT NULL,
    "weeklyPay" DECIMAL(10,2) NOT NULL,
    "taxableRate" DECIMAL(10,2),
    "stipend" DECIMAL(10,2),
    "estimatedGross" DECIMAL(12,2),
    "locationCity" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "facilityName" TEXT,
    "duration" INTEGER,
    "shift" TEXT,
    "startDate" TIMESTAMP(3),
    "housingIncluded" BOOLEAN NOT NULL DEFAULT false,
    "travelIncluded" BOOLEAN NOT NULL DEFAULT false,
    "carIncluded" BOOLEAN NOT NULL DEFAULT false,
    "relocationIncluded" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "uploadedDocumentUrl" TEXT,
    "extractedText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExternalOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferComparisonResult" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "offerId" TEXT,
    "externalOfferId" TEXT,
    "netValueScore" DOUBLE PRECISION NOT NULL,
    "lifestyleScore" DOUBLE PRECISION NOT NULL,
    "mobilityScore" DOUBLE PRECISION NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "costOfLivingEstimate" DOUBLE PRECISION,
    "housingDifficulty" DOUBLE PRECISION,
    "travelDifficulty" DOUBLE PRECISION,
    "commuteDifficulty" DOUBLE PRECISION,
    "recommendation" TEXT,
    "aiReasoning" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferComparisonResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirstWeekGuide" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "facilityParkingInfo" TEXT,
    "firstDayInstructions" TEXT,
    "nearestGrocery" TEXT,
    "nearestPharmacy" TEXT,
    "nearestUrgentCare" TEXT,
    "scrubsNearby" TEXT,
    "localTransportationTips" TEXT,
    "weatherSummary" TEXT,
    "safetyNotes" TEXT,
    "emergencyContacts" TEXT,
    "firstWeekConfidenceScore" INTEGER NOT NULL DEFAULT 0,
    "generatedByAI" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FirstWeekGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FirstWeekChecklistItem" (
    "id" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FirstWeekChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelocationPlan" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "originCity" TEXT,
    "originState" TEXT,
    "destinationCity" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "moveTimeline" TEXT,
    "cityOrientation" TEXT,
    "weatherExpectations" TEXT,
    "packingChecklist" TEXT,
    "housingGuidance" TEXT,
    "transportationGuidance" TEXT,
    "firstWeekPreparation" TEXT,
    "risks" TEXT,
    "nextBestActions" TEXT,
    "generatedByAI" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelocationPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferIntelligence" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "closeProbability" DOUBLE PRECISION NOT NULL,
    "engagementScore" DOUBLE PRECISION NOT NULL,
    "mobilityFrictionScore" DOUBLE PRECISION NOT NULL,
    "payCompetitivenessScore" DOUBLE PRECISION NOT NULL,
    "urgencyScore" DOUBLE PRECISION NOT NULL,
    "recommendedAction" TEXT,
    "recommendedSMS" TEXT,
    "recommendedEmail" TEXT,
    "recommendedCallScript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferIntelligence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferOutreachLog" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "offerIntelligenceId" TEXT,
    "actorId" TEXT,
    "channel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferOutreachLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorVerification" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentUrl" TEXT,
    "status" "VerificationReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT,
    "raisedByUserId" TEXT NOT NULL,
    "disputeType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyId" TEXT,
    "vendorId" TEXT,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerHousingListing" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "agencyId" TEXT,
    "propertyType" TEXT NOT NULL,
    "furnished" BOOLEAN NOT NULL DEFAULT false,
    "monthlyCost" DECIMAL(10,2) NOT NULL,
    "deposit" DECIMAL(10,2),
    "utilitiesIncluded" BOOLEAN NOT NULL DEFAULT false,
    "leaseFlexibility" TEXT,
    "petFriendly" BOOLEAN NOT NULL DEFAULT false,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "distanceToFacility" DOUBLE PRECISION,
    "availabilityStart" TIMESTAMP(3),
    "availabilityEnd" TIMESTAMP(3),
    "safetyNotes" TEXT,
    "photosJson" JSONB,
    "verificationStatus" "VerificationReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerHousingListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousingInquiry" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT,
    "vendorId" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HousingInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClinicianSubscription" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT,
    "status" "ClinicianSubscriptionStatus" NOT NULL DEFAULT 'TRIALING',
    "planName" TEXT NOT NULL DEFAULT 'FREE',
    "stripeCustomerId" TEXT,
    "stripeSubId" TEXT,
    "periodEndsAt" TIMESTAMP(3),
    "annualPlan" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicianSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MobilityRequest_agencyId_status_idx" ON "MobilityRequest"("agencyId", "status");

-- CreateIndex
CREATE INDEX "MobilityRequest_candidateId_expiresAt_idx" ON "MobilityRequest"("candidateId", "expiresAt");

-- CreateIndex
CREATE INDEX "MobilityBid_vendorId_status_idx" ON "MobilityBid"("vendorId", "status");

-- CreateIndex
CREATE INDEX "MobilityBid_mobilityRequestId_bidScore_idx" ON "MobilityBid"("mobilityRequestId", "bidScore");

-- CreateIndex
CREATE UNIQUE INDEX "MobilityBooking_bookingReference_key" ON "MobilityBooking"("bookingReference");

-- CreateIndex
CREATE INDEX "MobilityBooking_agencyId_bookingStatus_idx" ON "MobilityBooking"("agencyId", "bookingStatus");

-- CreateIndex
CREATE INDEX "MobilityBooking_candidateId_bookingStatus_idx" ON "MobilityBooking"("candidateId", "bookingStatus");

-- CreateIndex
CREATE UNIQUE INDEX "VendorBidProfile_vendorId_key" ON "VendorBidProfile"("vendorId");

-- CreateIndex
CREATE INDEX "Wallet_ownerType_ownerId_idx" ON "Wallet"("ownerType", "ownerId");

-- CreateIndex
CREATE INDEX "WalletCredit_candidateId_status_idx" ON "WalletCredit"("candidateId", "status");

-- CreateIndex
CREATE INDEX "WalletTransaction_walletId_createdAt_idx" ON "WalletTransaction"("walletId", "createdAt");

-- CreateIndex
CREATE INDEX "OfferComparisonV2_candidateId_comparisonStatus_idx" ON "OfferComparisonV2"("candidateId", "comparisonStatus");

-- CreateIndex
CREATE INDEX "OfferIntelligence_agencyId_closeProbability_idx" ON "OfferIntelligence"("agencyId", "closeProbability");

-- CreateIndex
CREATE UNIQUE INDEX "ClinicianSubscription_candidateId_key" ON "ClinicianSubscription"("candidateId");

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_mobilityRequestId_fkey" FOREIGN KEY ("mobilityRequestId") REFERENCES "MobilityRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_vendorUserId_fkey" FOREIGN KEY ("vendorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_mobilityRequestId_fkey" FOREIGN KEY ("mobilityRequestId") REFERENCES "MobilityRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_acceptedBidId_fkey" FOREIGN KEY ("acceptedBidId") REFERENCES "MobilityBid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorBidProfile" ADD CONSTRAINT "VendorBidProfile_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCredit" ADD CONSTRAINT "WalletCredit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCredit" ADD CONSTRAINT "WalletCredit_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCredit" ADD CONSTRAINT "WalletCredit_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletCredit" ADD CONSTRAINT "WalletCredit_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_walletCreditId_fkey" FOREIGN KEY ("walletCreditId") REFERENCES "WalletCredit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD CONSTRAINT "WalletTransaction_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonV2" ADD CONSTRAINT "OfferComparisonV2_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonV2" ADD CONSTRAINT "OfferComparisonV2_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonV2" ADD CONSTRAINT "OfferComparisonV2_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonV2" ADD CONSTRAINT "OfferComparisonV2_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalOffer" ADD CONSTRAINT "ExternalOffer_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "OfferComparisonV2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonResult" ADD CONSTRAINT "OfferComparisonResult_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "OfferComparisonV2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstWeekGuide" ADD CONSTRAINT "FirstWeekGuide_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstWeekGuide" ADD CONSTRAINT "FirstWeekGuide_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstWeekGuide" ADD CONSTRAINT "FirstWeekGuide_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FirstWeekChecklistItem" ADD CONSTRAINT "FirstWeekChecklistItem_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "FirstWeekGuide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationPlan" ADD CONSTRAINT "RelocationPlan_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelocationPlan" ADD CONSTRAINT "RelocationPlan_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferIntelligence" ADD CONSTRAINT "OfferIntelligence_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferIntelligence" ADD CONSTRAINT "OfferIntelligence_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferIntelligence" ADD CONSTRAINT "OfferIntelligence_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferIntelligence" ADD CONSTRAINT "OfferIntelligence_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferOutreachLog" ADD CONSTRAINT "OfferOutreachLog_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferOutreachLog" ADD CONSTRAINT "OfferOutreachLog_offerIntelligenceId_fkey" FOREIGN KEY ("offerIntelligenceId") REFERENCES "OfferIntelligence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorVerification" ADD CONSTRAINT "VendorVerification_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorVerification" ADD CONSTRAINT "VendorVerification_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "MobilityBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_raisedByUserId_fkey" FOREIGN KEY ("raisedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerHousingListing" ADD CONSTRAINT "PartnerHousingListing_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerHousingListing" ADD CONSTRAINT "PartnerHousingListing_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingInquiry" ADD CONSTRAINT "HousingInquiry_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "PartnerHousingListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingInquiry" ADD CONSTRAINT "HousingInquiry_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingInquiry" ADD CONSTRAINT "HousingInquiry_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HousingInquiry" ADD CONSTRAINT "HousingInquiry_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicianSubscription" ADD CONSTRAINT "ClinicianSubscription_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicianSubscription" ADD CONSTRAINT "ClinicianSubscription_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

