export type RoleKey =
  | "SUPER_ADMIN"
  | "AGENCY_OWNER"
  | "RECRUITER"
  | "CONCIERGE_MANAGER"
  | "MSP_VIEWER"
  | "CANDIDATE"
  | "VENDOR"
  | "LANDLORD";

export type RiskLabel = "Low" | "Medium" | "High" | "Critical";

export type OfferBoostResult = {
  enhancedSummary: string;
  valueStatement: string;
  recruiterTalkingPoints: string[];
  smsPitch: string;
  emailPitch: string;
  pdfReadyOffer: string;
  closeStrategy: string;
  confidenceScore: number;
};

export type RiskScoreResult = {
  score: number;
  label: RiskLabel;
  reasoning: string;
  suggestedRecruiterAction: string;
  suggestedSms: string;
  suggestedCallScript: string;
};

export type DashboardKpi = {
  label: string;
  value: string;
  trend: string;
  tone?: "blue" | "red" | "green" | "amber" | "slate";
};
