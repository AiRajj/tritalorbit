-- CreateEnum
CREATE TYPE "ComparisonSourceType" AS ENUM ('INTERNAL_OFFER', 'EXTERNAL_OFFER');

-- CreateEnum
CREATE TYPE "ComparisonStatus" AS ENUM ('DRAFT', 'ANALYZED', 'FINALIZED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RewardsTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'ORBIT_ELITE');

-- CreateEnum
CREATE TYPE "RewardEventType" AS ENUM ('ASSIGNMENT_COMPLETED', 'QUICK_ACCEPTANCE', 'VENDOR_BOOKING', 'REFERRAL', 'BONUS', 'MANUAL_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "RewardRedemptionStatus" AS ENUM ('REQUESTED', 'APPROVED', 'FULFILLED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ExternalOfferDocument" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "uploadedById" TEXT,
    "sourceLabel" TEXT NOT NULL,
    "agencyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "weeklyPay" DECIMAL(10,2) NOT NULL,
    "taxableRate" DECIMAL(10,2),
    "stipend" DECIMAL(10,2),
    "durationWeeks" INTEGER,
    "travelSupportScore" INTEGER NOT NULL DEFAULT 50,
    "housingSupportScore" INTEGER NOT NULL DEFAULT 50,
    "readinessSupportScore" INTEGER NOT NULL DEFAULT 50,
    "costOfLivingIndex" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "rawText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalOfferDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferComparison" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "primaryOfferId" TEXT,
    "createdById" TEXT,
    "status" "ComparisonStatus" NOT NULL DEFAULT 'DRAFT',
    "recommendationTitle" TEXT,
    "executiveSummary" TEXT,
    "bestOverallLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OfferComparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferComparisonEntry" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "sourceType" "ComparisonSourceType" NOT NULL,
    "internalOfferId" TEXT,
    "externalOfferId" TEXT,
    "label" TEXT NOT NULL,
    "weeklyPay" DECIMAL(10,2) NOT NULL,
    "stipend" DECIMAL(10,2) NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "travelSupportScore" INTEGER NOT NULL DEFAULT 50,
    "housingSupportScore" INTEGER NOT NULL DEFAULT 50,
    "readinessSupportScore" INTEGER NOT NULL DEFAULT 50,
    "costOfLivingIndex" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "totalValueScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lifestyleScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferComparisonEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferComparisonInsight" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 1,
    "aiModel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfferComparisonInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardsAccount" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "tier" "RewardsTier" NOT NULL DEFAULT 'BRONZE',
    "pointsBalance" INTEGER NOT NULL DEFAULT 0,
    "lifetimePoints" INTEGER NOT NULL DEFAULT 0,
    "streakAssignments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardsAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardEvent" (
    "id" TEXT NOT NULL,
    "rewardsAccountId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "type" "RewardEventType" NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "awardedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardRedemption" (
    "id" TEXT NOT NULL,
    "rewardsAccountId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,
    "rewardName" TEXT NOT NULL,
    "pointsRedeemed" INTEGER NOT NULL,
    "rewardValue" TEXT NOT NULL,
    "status" "RewardRedemptionStatus" NOT NULL DEFAULT 'REQUESTED',
    "metadata" JSONB,
    "requestedById" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fulfilledAt" TIMESTAMP(3),

    CONSTRAINT "RewardRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExternalOfferDocument_candidateId_createdAt_idx" ON "ExternalOfferDocument"("candidateId", "createdAt");

-- CreateIndex
CREATE INDEX "OfferComparison_candidateId_status_idx" ON "OfferComparison"("candidateId", "status");

-- CreateIndex
CREATE INDEX "OfferComparisonEntry_comparisonId_sourceType_idx" ON "OfferComparisonEntry"("comparisonId", "sourceType");

-- CreateIndex
CREATE INDEX "OfferComparisonInsight_comparisonId_rank_idx" ON "OfferComparisonInsight"("comparisonId", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "RewardsAccount_candidateId_key" ON "RewardsAccount"("candidateId");

-- CreateIndex
CREATE INDEX "RewardEvent_candidateId_createdAt_idx" ON "RewardEvent"("candidateId", "createdAt");

-- CreateIndex
CREATE INDEX "RewardEvent_agencyId_type_idx" ON "RewardEvent"("agencyId", "type");

-- CreateIndex
CREATE INDEX "RewardRedemption_candidateId_status_idx" ON "RewardRedemption"("candidateId", "status");

-- CreateIndex
CREATE INDEX "RewardRedemption_agencyId_requestedAt_idx" ON "RewardRedemption"("agencyId", "requestedAt");

-- AddForeignKey
ALTER TABLE "ExternalOfferDocument" ADD CONSTRAINT "ExternalOfferDocument_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalOfferDocument" ADD CONSTRAINT "ExternalOfferDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparison" ADD CONSTRAINT "OfferComparison_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparison" ADD CONSTRAINT "OfferComparison_primaryOfferId_fkey" FOREIGN KEY ("primaryOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparison" ADD CONSTRAINT "OfferComparison_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonEntry" ADD CONSTRAINT "OfferComparisonEntry_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "OfferComparison"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonEntry" ADD CONSTRAINT "OfferComparisonEntry_internalOfferId_fkey" FOREIGN KEY ("internalOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonEntry" ADD CONSTRAINT "OfferComparisonEntry_externalOfferId_fkey" FOREIGN KEY ("externalOfferId") REFERENCES "ExternalOfferDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferComparisonInsight" ADD CONSTRAINT "OfferComparisonInsight_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "OfferComparison"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardsAccount" ADD CONSTRAINT "RewardsAccount_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardEvent" ADD CONSTRAINT "RewardEvent_rewardsAccountId_fkey" FOREIGN KEY ("rewardsAccountId") REFERENCES "RewardsAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardEvent" ADD CONSTRAINT "RewardEvent_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardEvent" ADD CONSTRAINT "RewardEvent_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardEvent" ADD CONSTRAINT "RewardEvent_awardedById_fkey" FOREIGN KEY ("awardedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_rewardsAccountId_fkey" FOREIGN KEY ("rewardsAccountId") REFERENCES "RewardsAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

