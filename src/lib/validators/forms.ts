import { z } from "zod";

export const leadSchema = z.object({
  source: z.enum(["PRICING", "CONTACT", "WEBSITE"]).default("WEBSITE"),
  name: z.string().min(2),
  workEmail: z.string().email(),
  company: z.string().min(2),
  teamSize: z.string().optional(),
  message: z.string().max(1000).optional()
});

export const demoRequestSchema = z.object({
  name: z.string().min(2),
  workEmail: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  monthlyPlacements: z.coerce.number().int().min(0).optional(),
  painPoint: z.string().max(1000).optional()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  workEmail: z.string().email(),
  company: z.string().min(2),
  message: z.string().min(10).max(2000)
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});
