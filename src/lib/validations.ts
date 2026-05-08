import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    role: z.enum([
      "AGENCY_OWNER",
      "RECRUITER",
      "CONCIERGE_MANAGER",
      "CANDIDATE",
      "VENDOR",
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const offerPerkSchema = z.object({
  type: z.enum([
    "FLIGHT",
    "HOUSING",
    "CAR_RENTAL",
    "RELOCATION",
    "FIRST_WEEK",
    "EMERGENCY_HOUSING",
    "LOYALTY",
  ]),
  isEnabled: z.boolean().default(true),
  details: z.string().optional(),
  cost: z.number().min(0).optional(),
});

export const offerCreateSchema = z.object({
  agencyId: z.string().uuid(),
  candidateId: z.string().uuid(),
  assignmentId: z.string().uuid(),
  weeklyPay: z.number().min(0, "Weekly pay must be positive"),
  taxableRate: z.number().min(0, "Taxable rate must be positive"),
  stipend: z.number().min(0, "Stipend must be positive"),
  totalContractValue: z.number().min(0, "Total contract value must be positive"),
  aiEnhancedSummary: z.string().optional(),
  aiValueStatement: z.string().optional(),
  aiSMSPitch: z.string().optional(),
  aiEmailPitch: z.string().optional(),
  aiCloseStrategy: z.string().optional(),
  candidateConfidenceScore: z.number().min(0).max(100).optional(),
  perks: z.array(offerPerkSchema).optional(),
});

export const bookingRequestSchema = z.object({
  offerId: z.string().uuid(),
  candidateId: z.string().uuid(),
  needFlight: z.boolean().default(false),
  needHousing: z.boolean().default(false),
  needCar: z.boolean().default(false),
  moveDate: z.string().datetime().optional(),
  budgetRange: z.string().optional(),
  preferredLocation: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  phone: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  message: z.string().max(2000).optional(),
  preferredDate: z.string().datetime().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const candidateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  specialty: z.string().optional(),
  licenseState: z.string().optional(),
  experience: z.number().int().min(0).optional(),
  resumeUrl: z.string().url().optional(),
});

export const vendorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  type: z.enum(["HOUSING", "TRAVEL", "CAR_RENTAL", "RELOCATION", "OTHER"]),
  description: z.string().max(2000).optional(),
  website: z.string().url().optional(),
});

export const housingOptionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  monthlyRate: z.number().min(0, "Monthly rate must be positive"),
  availableFrom: z.string().datetime(),
  availableTo: z.string().datetime().optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  furnished: z.boolean().default(false),
  petFriendly: z.boolean().default(false),
  distanceToFacility: z.number().min(0).optional(),
  images: z.array(z.string().url()).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OfferCreateInput = z.infer<typeof offerCreateSchema>;
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CandidateProfileInput = z.infer<typeof candidateProfileSchema>;
export type VendorInput = z.infer<typeof vendorSchema>;
export type HousingOptionInput = z.infer<typeof housingOptionSchema>;
