import { UserRole, OfferStatus, BookingStatus, RiskLevel } from "@prisma/client";

export type { UserRole, OfferStatus, BookingStatus, RiskLevel };

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: UserRole;
  agencyId?: string | null;
}

export interface DashboardStats {
  total: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
}

export interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
  description?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

export interface OfferPerkType {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  value?: number;
  isEnabled: boolean;
}

export interface AIOfferBoostResult {
  enhancedSummary: string;
  valueStatement: string;
  recruiterTalkingPoints: string;
  smsPitch: string;
  emailPitch: string;
  closeStrategy: string;
  confidenceScore: number;
}

export interface RetentionRiskResult {
  score: number;
  riskLevel: RiskLevel;
  reasoning: string;
  suggestedAction: string;
  suggestedSMS: string;
  suggestedCallScript: string;
}

export interface AssignmentReadinessResult {
  overallStatus: string;
  score: number;
  housingGap: boolean;
  travelGap: boolean;
  documentGap: boolean;
  actionItems: string[];
}
