import { z } from "zod";

export const offerBuilderSchema = z.object({
  recruiterId: z.string().uuid(),
  agencyId: z.string().uuid(),
  candidate: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    role: z.string().min(2),
    specialty: z.string().min(2),
    licenseState: z.string().min(2),
    experienceYears: z.coerce.number().int().min(0)
  }),
  assignment: z.object({
    facilityName: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2),
    startDate: z.string(),
    durationWeeks: z.coerce.number().int().min(1),
    shift: z.string().min(2),
    specialty: z.string().min(2),
    role: z.string().min(2),
    mspClient: z.string().optional()
  }),
  compensation: z.object({
    weeklyPay: z.coerce.number().positive(),
    taxableRate: z.coerce.number().positive(),
    stipend: z.coerce.number().nonnegative(),
    estimatedContractValue: z.coerce.number().positive()
  }),
  perks: z.array(
    z.object({
      name: z.string(),
      enabled: z.boolean(),
      valueNote: z.string().optional()
    })
  )
});

export const bookingRequestSchema = z.object({
  offerId: z.string().uuid(),
  needFlight: z.boolean().default(false),
  needHousing: z.boolean().default(false),
  needCar: z.boolean().default(false),
  moveDate: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredLocation: z.string().optional(),
  notes: z.string().max(1000).optional()
});
