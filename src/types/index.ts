export type UserRole =
  | "SUPER_ADMIN"
  | "AGENCY_OWNER"
  | "RECRUITER"
  | "CONCIERGE_MANAGER"
  | "MSP_VIEWER"
  | "CANDIDATE"
  | "VENDOR"
  | "LANDLORD"

export type OfferStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | "BACKOUT"

export type BookingStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "WAITING_CANDIDATE"
  | "COMPLETED"
  | "CANCELLED"

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export type ReadinessStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "BLOCKED"

export interface SessionUser {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string | null
  image?: string | null
}

export interface KPIData {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ComponentType<{ className?: string }>
  trend?: "up" | "down" | "neutral"
}

export interface OfferData {
  id: string
  candidateName: string
  candidateEmail: string
  facilityName: string
  city: string
  state: string
  weeklyPay: number
  totalContractValue: number
  startDate: string
  duration: number
  shift: string
  specialty: string
  status: OfferStatus
  riskScore?: number
  riskLevel?: RiskLevel
  perks: OfferPerkData[]
  createdAt: string
}

export interface OfferPerkData {
  id: string
  perkType: string
  title: string
  description?: string
  isEnabled: boolean
  value?: number
}

export interface CandidateData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role?: string
  specialty?: string
  licenseState?: string
  experience?: number
  currentCity?: string
  currentState?: string
  engagementScore: number
}

export interface AssignmentData {
  id: string
  facilityName: string
  city: string
  state: string
  startDate: string
  endDate?: string
  duration: number
  shift: string
  specialty: string
  status: string
  housingStatus: ReadinessStatus
  travelStatus: ReadinessStatus
  documentsStatus: ReadinessStatus
  firstWeekReady: boolean
  candidateName?: string
  riskScore?: number
}

export interface BookingRequestData {
  id: string
  candidateName: string
  offerId: string
  needsFlight: boolean
  needsHousing: boolean
  needsCar: boolean
  moveDate?: string
  budgetMin?: number
  budgetMax?: number
  preferredLocation?: string
  notes?: string
  status: BookingStatus
  conciergeOwner?: string
  assignmentInfo?: string
  createdAt: string
}

export interface HousingOptionData {
  id: string
  title: string
  description?: string
  address?: string
  city: string
  state: string
  monthlyCost: number
  distanceToFacility?: number
  amenities?: string
  isVerified: boolean
  rating?: number
  availability?: string
}

export interface VendorData {
  id: string
  companyName: string
  contactName?: string
  email: string
  phone?: string
  vendorType: string
  city?: string
  state?: string
  verificationStatus: string
  rating?: number
}

export interface RetentionRiskData {
  riskScore: number
  riskLevel: RiskLevel
  reasoning: string
  suggestedAction: string
  suggestedSms: string
  suggestedScript: string
}

export interface AIOfferBoostResult {
  enhancedSummary: string
  valueStatement: string
  recruiterTalkingPoints: string
  smsPitch: string
  emailPitch: string
  candidateConfidenceScore: number
  closeStrategy: string
}

export interface ActivityLogEntry {
  id: string
  action: string
  details: string
  userName?: string
  createdAt: string
}

export interface NotificationData {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  link?: string
  createdAt: string
}
