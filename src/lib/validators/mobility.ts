import { z } from "zod";

export const mobilityRequestCreateSchema = z.object({
  agencyId: z.string().uuid(),
  candidateId: z.string().uuid(),
  assignmentId: z.string().uuid().optional(),
  requestType: z.enum(["FLIGHT", "HOUSING", "CAR_RENTAL", "HOTEL", "FULL_RELOCATION_PACKAGE"]),
  originCity: z.string().max(120).optional(),
  originState: z.string().max(40).optional(),
  originAirport: z.string().max(8).optional(),
  destinationCity: z.string().min(2).max(120),
  destinationState: z.string().min(2).max(40),
  destinationAirport: z.string().max(8).optional(),
  assignmentCity: z.string().min(2).max(120),
  assignmentState: z.string().min(2).max(40),
  facilityName: z.string().max(160).optional(),
  moveDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budgetMin: z.coerce.number().nonnegative().optional(),
  budgetMax: z.coerce.number().nonnegative().optional(),
  preferredAirline: z.string().max(80).optional(),
  baggageNeeded: z.boolean().optional(),
  checkedBags: z.coerce.number().int().min(0).max(5).optional(),
  housingNeeded: z.boolean().optional(),
  carNeeded: z.boolean().optional(),
  hotelNeeded: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  accessibilityNeeds: z.string().max(500).optional(),
  preferredCommuteMinutes: z.coerce.number().int().min(0).max(180).optional(),
  notes: z.string().max(2000).optional(),
  urgencyLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  durationWeeks: z.coerce.number().int().min(1).max(104).optional()
});

export const mobilityBidCreateSchema = z.object({
  mobilityRequestId: z.string().uuid(),
  bidType: z.enum(["FLIGHT", "HOUSING", "CAR_RENTAL", "HOTEL", "FULL_RELOCATION_PACKAGE"]),
  packageName: z.string().min(3).max(160),
  totalPrice: z.coerce.number().positive(),
  taxesAndFees: z.coerce.number().nonnegative().optional(),
  airlineName: z.string().max(80).optional(),
  flightNumber: z.string().max(20).optional(),
  departureAirport: z.string().max(8).optional(),
  arrivalAirport: z.string().max(8).optional(),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  stops: z.coerce.number().int().min(0).max(4).optional(),
  baggageIncluded: z.boolean().optional(),
  housingAddress: z.string().max(240).optional(),
  housingDistanceToFacility: z.coerce.number().nonnegative().optional(),
  housingMonthlyCost: z.coerce.number().nonnegative().optional(),
  leaseFlexibility: z.string().max(120).optional(),
  carRentalCompany: z.string().max(80).optional(),
  carClass: z.string().max(40).optional(),
  hotelName: z.string().max(120).optional(),
  nightlyRate: z.coerce.number().nonnegative().optional(),
  cancellationPolicy: z.string().max(240).optional(),
  refundability: z.string().max(120).optional(),
  notes: z.string().max(800).optional()
});

export const mobilityBidAcceptSchema = z.object({
  paymentResponsibility: z.enum(["AGENCY", "CANDIDATE", "SHARED", "WALLET_CREDIT"]).default("AGENCY")
});
