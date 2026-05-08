import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([
    "SUPER_ADMIN",
    "AGENCY_OWNER",
    "RECRUITER",
    "CONCIERGE_MANAGER",
    "MSP_VIEWER",
    "CANDIDATE",
    "VENDOR_LANDLORD",
  ]),
});

export const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  role: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(["LEAD", "CONTACT", "PRICING"]).default("LEAD"),
});

export const demoRequestSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  monthlyPlacements: z.string().optional(),
  goals: z.string().optional(),
  preferredDate: z.string().optional(),
});

export const offerCreateSchema = z.object({
  candidate: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    roleTitle: z.string().optional(),
    specialty: z.string().optional(),
    licenseState: z.string().optional(),
    yearsExperience: z.coerce.number().min(0).max(50).optional(),
  }),
  assignment: z.object({
    facilityName: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2).max(2),
    startDate: z.string().min(5),
    durationWeeks: z.coerce.number().min(1),
    shift: z.string().min(1),
    specialty: z.string().min(2),
    mspClientName: z.string().optional(),
  }),
  compensation: z.object({
    weeklyPay: z.coerce.number().min(1),
    taxableRate: z.coerce.number().min(0),
    stipend: z.coerce.number().min(0),
    estimatedContractValue: z.coerce.number().min(1),
  }),
  perks: z.array(
    z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      included: z.boolean(),
    }),
  ),
});

export const bookingRequestSchema = z.object({
  offerId: z.string().uuid(),
  needFlight: z.boolean().default(false),
  needHousing: z.boolean().default(false),
  needCar: z.boolean().default(false),
  moveDate: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredLocation: z.string().optional(),
  notes: z.string().optional(),
});
