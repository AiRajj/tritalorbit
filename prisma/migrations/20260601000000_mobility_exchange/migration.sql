-- CreateEnum
CREATE TYPE "MobilityRequestType" AS ENUM ('FLIGHT', 'HOUSING', 'CAR_RENTAL', 'HOTEL', 'FULL_RELOCATION_PACKAGE');

-- CreateEnum
CREATE TYPE "MobilityRequestStatus" AS ENUM ('DRAFT', 'OPEN_FOR_BIDS', 'REVIEWING', 'BID_ACCEPTED', 'EXPIRED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "MobilityBidStatus" AS ENUM ('SUBMITTED', 'SHORTLISTED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "MobilityBookingStatus" AS ENUM ('PENDING_PAYMENT', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "MobilityPaymentResponsibility" AS ENUM ('CANDIDATE', 'AGENCY', 'SHARED', 'WALLET_CREDIT');

-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('TRAVEL_AGENCY', 'HOUSING_PROVIDER', 'CAR_RENTAL', 'HOTEL', 'RELOCATION_VENDOR');

-- AlterEnum
ALTER TYPE "AIInsightType" ADD VALUE 'MOBILITY_BID';

-- CreateTable
CREATE TABLE "MobilityRequest" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "assignmentId" TEXT,
    "createdById" TEXT,
    "requestType" "MobilityRequestType" NOT NULL,
    "originCity" TEXT,
    "originState" TEXT,
    "originAirport" TEXT,
    "destinationCity" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "destinationAirport" TEXT,
    "assignmentCity" TEXT NOT NULL,
    "assignmentState" TEXT NOT NULL,
    "facilityName" TEXT,
    "moveDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
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
    "status" "MobilityRequestStatus" NOT NULL DEFAULT 'OPEN_FOR_BIDS',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MobilityRequest_agencyId_status_idx" ON "MobilityRequest"("agencyId", "status");
CREATE INDEX "MobilityRequest_candidateId_idx" ON "MobilityRequest"("candidateId");
CREATE INDEX "MobilityRequest_status_createdAt_idx" ON "MobilityRequest"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MobilityRequest" ADD CONSTRAINT "MobilityRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "MobilityBid" (
    "id" TEXT NOT NULL,
    "mobilityRequestId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendorUserId" TEXT,
    "bidType" "MobilityRequestType" NOT NULL,
    "packageName" TEXT NOT NULL,
    "vendorName" TEXT NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "taxesAndFees" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "platformFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "estimatedSavings" DECIMAL(10,2),
    "airlineName" TEXT,
    "flightNumber" TEXT,
    "departureAirport" TEXT,
    "arrivalAirport" TEXT,
    "departureTime" TIMESTAMP(3),
    "arrivalTime" TIMESTAMP(3),
    "stops" INTEGER,
    "baggageIncluded" BOOLEAN NOT NULL DEFAULT false,
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
    "bidScore" INTEGER,
    "conciergeRecommended" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "status" "MobilityBidStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityBid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MobilityBid_mobilityRequestId_status_idx" ON "MobilityBid"("mobilityRequestId", "status");
CREATE INDEX "MobilityBid_vendorId_status_idx" ON "MobilityBid"("vendorId", "status");

-- AddForeignKey
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_mobilityRequestId_fkey" FOREIGN KEY ("mobilityRequestId") REFERENCES "MobilityRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBid" ADD CONSTRAINT "MobilityBid_vendorUserId_fkey" FOREIGN KEY ("vendorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "MobilityBooking" (
    "id" TEXT NOT NULL,
    "mobilityRequestId" TEXT NOT NULL,
    "acceptedBidId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "assignmentId" TEXT,
    "bookingReference" TEXT NOT NULL,
    "bookingStatus" "MobilityBookingStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
    "paymentResponsibility" "MobilityPaymentResponsibility" NOT NULL DEFAULT 'AGENCY',
    "amount" DECIMAL(10,2) NOT NULL,
    "platformFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "vendorPayout" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bookingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MobilityBooking_acceptedBidId_key" ON "MobilityBooking"("acceptedBidId");
CREATE UNIQUE INDEX "MobilityBooking_bookingReference_key" ON "MobilityBooking"("bookingReference");
CREATE INDEX "MobilityBooking_agencyId_bookingStatus_idx" ON "MobilityBooking"("agencyId", "bookingStatus");
CREATE INDEX "MobilityBooking_candidateId_idx" ON "MobilityBooking"("candidateId");
CREATE INDEX "MobilityBooking_vendorId_idx" ON "MobilityBooking"("vendorId");

-- AddForeignKey
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_mobilityRequestId_fkey" FOREIGN KEY ("mobilityRequestId") REFERENCES "MobilityRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_acceptedBidId_fkey" FOREIGN KEY ("acceptedBidId") REFERENCES "MobilityBid"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MobilityBooking" ADD CONSTRAINT "MobilityBooking_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "VendorBidProfile" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "vendorCategory" "VendorCategory" NOT NULL,
    "serviceStates" TEXT[],
    "serviceCities" TEXT[],
    "apiEnabled" BOOLEAN NOT NULL DEFAULT false,
    "manualBidEnabled" BOOLEAN NOT NULL DEFAULT true,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "averageResponseTimeMin" INTEGER,
    "averageSavingsPct" DOUBLE PRECISION,
    "bookingCompletionRate" DOUBLE PRECISION,
    "chargebackRiskScore" INTEGER,
    "rating" DOUBLE PRECISION,
    "monthlyBidLimit" INTEGER NOT NULL DEFAULT 5,
    "bidsUsedThisMonth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorBidProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorBidProfile_vendorId_key" ON "VendorBidProfile"("vendorId");

-- AddForeignKey
ALTER TABLE "VendorBidProfile" ADD CONSTRAINT "VendorBidProfile_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
