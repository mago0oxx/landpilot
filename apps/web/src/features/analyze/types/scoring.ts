export type EngineId =
  | "location"
  | "development"
  | "financial"
  | "environmental"
  | "market"
  | "legal"
  | "infrastructure";

export interface EngineFactorResult {
  id: string;
  label: string;
  weight: number;
  score: number;
  finding: string;
}

export interface EngineResult {
  engine: EngineId;
  label: string;
  weight: number;
  score: number;
  contribution: number;
  confidencePercent: number;
  redFlags: string[];
  factors: EngineFactorResult[];
}

export type ConfidenceLevel = "High" | "Medium" | "Low";
export type RiskLevel = "Low" | "Medium" | "High";
export type Recommendation = "Strong Buy" | "Buy" | "Consider" | "Pass";

export interface LPSResult {
  score: number;
  confidenceLevel: ConfidenceLevel;
  riskLevel: RiskLevel;
  recommendation: Recommendation;
  explanation: string;
  engines: EngineResult[];
}
