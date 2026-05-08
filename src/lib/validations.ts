import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  role: z.enum(["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"]).default("RECRUITER"),
  organizationName: z.string().min(2, "Organization name is required").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const leadSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional().or(z.literal("")),
  title: z.string().optional().or(z.literal("")),
  source: z.enum(["WEBSITE", "REFERRAL", "COLD_CALL", "LINKEDIN", "CONFERENCE", "OTHER"]).default("WEBSITE"),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]).default("NEW"),
  notes: z.string().optional().or(z.literal("")),
  estimatedValue: z.coerce.number().min(0, "Value must be positive").optional(),
  state: z.string().optional().or(z.literal("")),
  industry: z.string().optional().or(z.literal("")),
})

export const demoRequestSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  companySize: z.enum(["1-50", "51-200", "201-500", "501-1000", "1000+"]).optional(),
  message: z.string().optional().or(z.literal("")),
  preferredDate: z.string().optional().or(z.literal("")),
  preferredTime: z.string().optional().or(z.literal("")),
})

export const candidateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional().or(z.literal("")),
  specialty: z.string().min(1, "Specialty is required"),
  licenseNumber: z.string().optional().or(z.literal("")),
  licenseState: z.string().optional().or(z.literal("")),
  yearsExperience: z.coerce.number().min(0).optional(),
  preferredShifts: z.array(z.string()).optional(),
  preferredStates: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  notes: z.string().optional().or(z.literal("")),
  status: z.enum(["ACTIVE", "INACTIVE", "ON_ASSIGNMENT", "DO_NOT_CONTACT"]).default("ACTIVE"),
})

export const offerSchema = z.object({
  candidateId: z.string().min(1, "Candidate is required"),
  facilityName: z.string().min(2, "Facility name is required"),
  facilityLocation: z.string().min(2, "Facility location is required"),
  specialty: z.string().min(1, "Specialty is required"),
  shiftType: z.string().min(1, "Shift type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  payRate: z.coerce.number().min(0, "Pay rate must be positive"),
  billRate: z.coerce.number().min(0, "Bill rate must be positive").optional(),
  hoursPerWeek: z.coerce.number().min(1).max(80).optional(),
  overtimeRate: z.coerce.number().min(0).optional(),
  housingStipend: z.coerce.number().min(0).optional(),
  mealStipend: z.coerce.number().min(0).optional(),
  travelReimbursement: z.coerce.number().min(0).optional(),
  bonusAmount: z.coerce.number().min(0).optional(),
  notes: z.string().optional().or(z.literal("")),
  expiresAt: z.string().optional().or(z.literal("")),
})

export const bookingRequestSchema = z.object({
  candidateId: z.string().min(1, "Candidate is required"),
  facilityName: z.string().min(2, "Facility name is required"),
  facilityLocation: z.string().min(2, "Facility location is required"),
  specialty: z.string().min(1, "Specialty is required"),
  shiftType: z.string().min(1, "Shift type is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  payRate: z.coerce.number().min(0, "Pay rate must be positive"),
  billRate: z.coerce.number().min(0, "Bill rate must be positive"),
  clientId: z.string().optional().or(z.literal("")),
  requirements: z.string().optional().or(z.literal("")),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type LeadInput = z.infer<typeof leadSchema>
export type DemoRequestInput = z.infer<typeof demoRequestSchema>
export type CandidateInput = z.infer<typeof candidateSchema>
export type OfferInput = z.infer<typeof offerSchema>
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>
export type ContactInput = z.infer<typeof contactSchema>
