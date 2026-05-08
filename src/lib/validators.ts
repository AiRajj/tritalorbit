import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
});

export const demoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  teamSize: z.string().optional().nullable(),
  preferredTime: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "At least 8 characters"),
  role: z.enum([
    "AGENCY_OWNER",
    "RECRUITER",
    "CONCIERGE_MANAGER",
    "CANDIDATE",
    "VENDOR",
    "LANDLORD",
    "MSP_VIEWER",
  ]).default("AGENCY_OWNER"),
  agencyName: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const offerCreateSchema = z.object({
  // Candidate
  candidateFirstName: z.string().min(1),
  candidateLastName: z.string().min(1),
  candidateEmail: z.string().email(),
  candidatePhone: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  licenseState: z.string().optional().nullable(),
  yearsExperience: z.coerce.number().int().nonnegative().optional().nullable(),

  // Assignment
  facilityName: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  startDate: z.string().optional().nullable(),
  durationWeeks: z.coerce.number().int().positive().optional().nullable(),
  shift: z.string().optional().nullable(),
  mspClient: z.string().optional().nullable(),

  // Comp
  weeklyPay: z.coerce.number().nonnegative().optional().nullable(),
  taxableRate: z.coerce.number().nonnegative().optional().nullable(),
  stipend: z.coerce.number().nonnegative().optional().nullable(),

  // Perks
  flightSupport: z.coerce.boolean().optional(),
  housingAssist: z.coerce.boolean().optional(),
  carRental: z.coerce.boolean().optional(),
  relocationConcierge: z.coerce.boolean().optional(),
  firstWeekReadiness: z.coerce.boolean().optional(),
  emergencyHousing: z.coerce.boolean().optional(),
  loyaltyRewards: z.coerce.boolean().optional(),
});

export type OfferCreateInput = z.infer<typeof offerCreateSchema>;

export const bookingSchema = z.object({
  needFlight: z.coerce.boolean().optional(),
  needHousing: z.coerce.boolean().optional(),
  needCar: z.coerce.boolean().optional(),
  moveDate: z.string().optional().nullable(),
  budgetMin: z.coerce.number().optional().nullable(),
  budgetMax: z.coerce.number().optional().nullable(),
  preferredLocation: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});
