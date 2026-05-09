-- CreateEnum
CREATE TYPE "MobilityRequestStatus" AS ENUM ('OPEN', 'BID_ACTIVE', 'EXPIRED', 'BOOKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MobilityBidStatus" AS ENUM ('ACTIVE', 'SELECTED', 'REJECTED', 'EXPIRED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "MobilityPackageType" AS ENUM ('FLIGHT_ONLY', 'FLIGHT_CAR', 'FLIGHT_HOTEL', 'FULL_RELOCATION');

-- CreateEnum
CREATE TYPE "WalletAccountType" AS ENUM ('AGENCY', 'CANDIDATE');

-- CreateEnum
CREATE TYPE "WalletEntryType" AS ENUM ('FUNDING', 'CREDIT_GRANT', 'REDEMPTION', 'PAYOUT', 'ADJUSTMENT', 'REFUND');

-- CreateEnum
CREATE TYPE "WalletEntryStatus" AS ENUM ('PENDING', 'POSTED', 'REVERSED', 'FAILED');

-- CreateTable
CREATE TABLE "TravelBidRequest" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "offerId" TEXT,
    "createdById" TEXT,
    "status" "MobilityRequestStatus" NOT NULL DEFAULT 'OPEN',
    "originAirport" TEXT,
    "preferredAirport" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3),
    "needCar" BOOLEAN NOT NULL DEFAULT false,
    "needHotel" BOOLEAN NOT NULL DEFAULT false,
    "baggageCount" INTEGER NOT NULL DEFAULT 1,
    "carType" TEXT,
    "hotelNights" INTEGER,
    "specialRequirements" TEXT,
    "agencyTravelCredit" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "bidExpiresAt" TIMESTAMP(3) NOT NULL,
    "selectedBidId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelBidRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelBid" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "submittedById" TEXT,
    "status" "MobilityBidStatus" NOT NULL DEFAULT 'ACTIVE',
    "packageType" "MobilityPackageType" NOT NULL DEFAULT 'FLIGHT_ONLY',
    "airline" TEXT NOT NULL,
    "flightType" TEXT NOT NULL,
    "stops" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "includesCar" BOOLEAN NOT NULL DEFAULT false,
    "includesHotel" BOOLEAN NOT NULL DEFAULT false,
    "carProvider" TEXT,
    "hotelName" TEXT,
    "notes" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "recommendedByConcierge" BOOLEAN NOT NULL DEFAULT false,
    "selectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelBid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletAccount" (
    "id" TEXT NOT NULL,
    "agencyId" TEXT,
    "candidateId" TEXT,
    "accountType" "WalletAccountType" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "balance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "escrowBalance" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletLedgerEntry" (
    "id" TEXT NOT NULL,
    "walletAccountId" TEXT NOT NULL,
    "agencyId" TEXT,
    "candidateId" TEXT,
    "travelRequestId" TEXT,
    "travelBidId" TEXT,
    "entryType" "WalletEntryType" NOT NULL,
    "status" "WalletEntryStatus" NOT NULL DEFAULT 'POSTED',
    "amount" DECIMAL(12,2) NOT NULL,
    "description" TEXT NOT NULL,
    "referenceCode" TEXT,
    "metadata" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelBidRequest_selectedBidId_key" ON "TravelBidRequest"("selectedBidId");

-- CreateIndex
CREATE INDEX "TravelBidRequest_assignmentId_status_idx" ON "TravelBidRequest"("assignmentId", "status");

-- CreateIndex
CREATE INDEX "TravelBidRequest_agencyId_bidExpiresAt_idx" ON "TravelBidRequest"("agencyId", "bidExpiresAt");

-- CreateIndex
CREATE INDEX "TravelBid_requestId_status_idx" ON "TravelBid"("requestId", "status");

-- CreateIndex
CREATE INDEX "TravelBid_vendorId_createdAt_idx" ON "TravelBid"("vendorId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WalletAccount_agencyId_key" ON "WalletAccount"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletAccount_candidateId_key" ON "WalletAccount"("candidateId");

-- CreateIndex
CREATE INDEX "WalletAccount_accountType_idx" ON "WalletAccount"("accountType");

-- CreateIndex
CREATE INDEX "WalletLedgerEntry_walletAccountId_createdAt_idx" ON "WalletLedgerEntry"("walletAccountId", "createdAt");

-- CreateIndex
CREATE INDEX "WalletLedgerEntry_agencyId_candidateId_idx" ON "WalletLedgerEntry"("agencyId", "candidateId");

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBidRequest" ADD CONSTRAINT "TravelBidRequest_selectedBidId_fkey" FOREIGN KEY ("selectedBidId") REFERENCES "TravelBid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBid" ADD CONSTRAINT "TravelBid_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TravelBidRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBid" ADD CONSTRAINT "TravelBid_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelBid" ADD CONSTRAINT "TravelBid_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletAccount" ADD CONSTRAINT "WalletAccount_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletAccount" ADD CONSTRAINT "WalletAccount_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_walletAccountId_fkey" FOREIGN KEY ("walletAccountId") REFERENCES "WalletAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_travelRequestId_fkey" FOREIGN KEY ("travelRequestId") REFERENCES "TravelBidRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_travelBidId_fkey" FOREIGN KEY ("travelBidId") REFERENCES "TravelBid"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletLedgerEntry" ADD CONSTRAINT "WalletLedgerEntry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

