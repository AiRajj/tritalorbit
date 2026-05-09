import { z } from "zod";

export const firstWeekGuideSchema = z.object({
  assignmentId: z.string().uuid(),
  candidateId: z.string().uuid(),
  agencyId: z.string().uuid(),
  facilityParkingInfo: z.string().max(500).optional(),
  firstDayInstructions: z.string().max(2000).optional(),
  nearestGrocery: z.string().max(200).optional(),
  nearestPharmacy: z.string().max(200).optional(),
  nearestUrgentCare: z.string().max(200).optional(),
  localTransportationTips: z.string().max(800).optional(),
  weatherSummary: z.string().max(800).optional(),
  safetyNotes: z.string().max(800).optional(),
  emergencyContacts: z.string().max(800).optional()
});

export const relocationAssistantInputSchema = z.object({
  assignmentId: z.string().uuid(),
  candidateId: z.string().uuid(),
  originCity: z.string().min(2).max(120),
  originState: z.string().min(2).max(120),
  destinationCity: z.string().min(2).max(120),
  destinationState: z.string().min(2).max(120),
  budget: z.coerce.number().min(0).optional(),
  petNeeds: z.string().max(200).optional(),
  commutePreference: z.string().max(120).optional(),
  shift: z.string().max(120).optional()
});

export const offerOutreachSchema = z.object({
  offerId: z.string().uuid(),
  offerIntelligenceId: z.string().uuid().optional(),
  channel: z.enum(["SMS", "EMAIL", "CALL", "NOTE"]),
  message: z.string().min(4).max(2400),
  actionCompleted: z.boolean().optional()
});

export const partnerHousingListingSchema = z.object({
  vendorId: z.string().uuid(),
  propertyType: z.string().min(2).max(120),
  furnished: z.boolean(),
  monthlyCost: z.coerce.number().positive(),
  deposit: z.coerce.number().min(0).optional(),
  utilitiesIncluded: z.boolean().optional(),
  leaseFlexibility: z.string().max(200).optional(),
  petFriendly: z.boolean().optional(),
  parking: z.boolean().optional(),
  distanceToFacility: z.coerce.number().min(0).optional(),
  safetyNotes: z.string().max(800).optional()
});
