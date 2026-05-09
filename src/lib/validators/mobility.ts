import { z } from "zod";

export const travelBidRequestSchema = z.object({
  assignmentId: z.string().uuid(),
  offerId: z.string().uuid().optional(),
  preferredAirport: z.string().min(3),
  originAirport: z.string().min(3).optional(),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  needCar: z.boolean().default(false),
  needHotel: z.boolean().default(false),
  baggageCount: z.coerce.number().int().min(0).max(5).default(1),
  carType: z.string().optional(),
  hotelNights: z.coerce.number().int().min(0).optional(),
  specialRequirements: z.string().max(1000).optional(),
  agencyTravelCredit: z.coerce.number().min(0).default(0),
  bidExpiresAt: z.string().optional()
});

export const travelBidCreateSchema = z.object({
  requestId: z.string().uuid(),
  packageType: z.enum(["FLIGHT_ONLY", "FLIGHT_CAR", "FLIGHT_HOTEL", "FULL_RELOCATION"]),
  airline: z.string().min(2),
  flightType: z.string().min(2),
  stops: z.coerce.number().int().min(0).max(4).default(0),
  totalPrice: z.coerce.number().positive(),
  includesCar: z.boolean().default(false),
  includesHotel: z.boolean().default(false),
  carProvider: z.string().optional(),
  hotelName: z.string().optional(),
  notes: z.string().max(1000).optional(),
  expiresAt: z.string()
});

export const selectTravelBidSchema = z.object({
  bidId: z.string().uuid()
});

export const walletFundingSchema = z.object({
  amount: z.coerce.number().positive(),
  description: z.string().min(3).max(200).default("Agency wallet funding"),
  referenceCode: z.string().max(100).optional()
});

export const walletCreditGrantSchema = z.object({
  candidateId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  description: z.string().min(3).max(200).default("Travel credit grant"),
  travelRequestId: z.string().uuid().optional()
});

export const walletRedemptionSchema = z.object({
  amount: z.coerce.number().positive(),
  description: z.string().min(3).max(200).default("Candidate travel redemption"),
  travelRequestId: z.string().uuid().optional(),
  travelBidId: z.string().uuid().optional()
});
