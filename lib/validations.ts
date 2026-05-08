import { z } from "zod";

const email = z.string().trim().email();
const requiredText = z.string().trim().min(1);

export const leadSchema = z.object({
  name: requiredText,
  email,
  company: z.string().trim().optional(),
  role: z.string().trim().optional(),
  message: z.string().trim().optional(),
  source: z.string().trim().default("website")
});

export const demoRequestSchema = z.object({
  name: requiredText,
  email,
  company: requiredText,
  role: z.string().trim().optional(),
  teamSize: z.string().trim().optional(),
  currentPain: z.string().trim().optional(),
  preferredTime: z.string().trim().optional()
});

export const registerSchema = z.object({
  name: requiredText,
  email,
  password: z.string().min(8),
  role: z.enum([
    "AGENCY_OWNER",
    "RECRUITER",
    "CONCIERGE_MANAGER",
    "MSP_VIEWER",
    "CANDIDATE",
    "VENDOR"
  ])
});

export const offerCreateSchema = z.object({
  candidate: z.object({
    name: requiredText,
    email,
    phone: z.string().trim().optional(),
    role: requiredText,
    specialty: requiredText,
    licenseState: requiredText,
    yearsExperience: z.coerce.number().min(0).default(0)
  }),
  assignment: z.object({
    facilityName: requiredText,
    city: requiredText,
    state: requiredText,
    startDate: requiredText,
    durationWeeks: z.coerce.number().min(1),
    shift: requiredText,
    specialty: requiredText,
    mspClient: z.string().trim().optional()
  }),
  compensation: z.object({
    weeklyPay: z.coerce.number().min(0),
    taxableRate: z.coerce.number().min(0),
    stipend: z.coerce.number().min(0),
    totalContractValue: z.coerce.number().min(0)
  }),
  perks: z.array(z.string()).default([]),
  ai: z
    .object({
      enhancedSummary: z.string().optional(),
      valueStatement: z.string().optional(),
      recruiterTalkingPoints: z.array(z.string()).optional(),
      smsPitch: z.string().optional(),
      emailPitch: z.string().optional(),
      pdfReadyOffer: z.string().optional(),
      closeStrategy: z.string().optional(),
      confidenceScore: z.coerce.number().optional()
    })
    .optional()
});

export const bookingRequestSchema = z.object({
  offerId: z.string().optional(),
  needsFlight: z.coerce.boolean().default(false),
  needsHousing: z.coerce.boolean().default(false),
  needsCar: z.coerce.boolean().default(false),
  moveDate: requiredText,
  budgetRange: z.string().trim().optional(),
  preferredLocation: z.string().trim().optional(),
  notes: z.string().trim().optional()
});

export const riskScoreSchema = z.object({
  viewedOffer: z.coerce.boolean().default(false),
  hoursSinceSent: z.coerce.number().min(0).default(0),
  housingRequested: z.coerce.boolean().default(false),
  travelRequested: z.coerce.boolean().default(false),
  daysUntilStart: z.coerce.number().default(14),
  weeklyPay: z.coerce.number().default(2400),
  locationDifficulty: z.coerce.number().min(0).max(100).default(50),
  engagementScore: z.coerce.number().min(0).max(100).default(70),
  unansweredMessages: z.coerce.number().min(0).default(0),
  offerStatus: z.string().default("SENT")
});

export type LeadInput = z.infer<typeof leadSchema>;
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type OfferCreateInput = z.infer<typeof offerCreateSchema>;
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
