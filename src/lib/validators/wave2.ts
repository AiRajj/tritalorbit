import { z } from "zod";

export const externalOfferSchema = z.object({
  candidateId: z.string().uuid().optional(),
  sourceLabel: z.string().min(2),
  agencyName: z.string().min(2),
  role: z.string().min(2),
  specialty: z.string().min(2),
  locationCity: z.string().min(2),
  locationState: z.string().min(2),
  weeklyPay: z.coerce.number().positive(),
  taxableRate: z.coerce.number().nonnegative().optional(),
  stipend: z.coerce.number().nonnegative().optional(),
  durationWeeks: z.coerce.number().int().min(1).max(52).optional(),
  travelSupportScore: z.coerce.number().int().min(0).max(100).optional(),
  housingSupportScore: z.coerce.number().int().min(0).max(100).optional(),
  readinessSupportScore: z.coerce.number().int().min(0).max(100).optional(),
  costOfLivingIndex: z.coerce.number().min(0.5).max(3).optional(),
  rawText: z.string().max(8000).optional()
});

export const offerComparisonSchema = z.object({
  candidateId: z.string().uuid().optional(),
  primaryOfferId: z.string().uuid().optional(),
  internalOfferIds: z.array(z.string().uuid()).default([]),
  externalOfferIds: z.array(z.string().uuid()).default([])
});

export const rewardEventSchema = z.object({
  candidateId: z.string().uuid(),
  type: z.enum([
    "ASSIGNMENT_COMPLETED",
    "QUICK_ACCEPTANCE",
    "VENDOR_BOOKING",
    "REFERRAL",
    "BONUS",
    "MANUAL_ADJUSTMENT"
  ]),
  points: z.coerce.number().int().min(1).max(10000),
  description: z.string().min(3).max(300),
  metadata: z.record(z.string(), z.unknown()).optional()
});

export const rewardRedemptionSchema = z.object({
  rewardName: z.string().min(2).max(120),
  pointsRedeemed: z.coerce.number().int().min(1),
  rewardValue: z.string().min(2).max(200),
  metadata: z.record(z.string(), z.unknown()).optional()
});
