/** "sell" = one-time flip return at construction completion. "rent" = ongoing annual
 * cash-on-cash return from holding and renting. These are different kinds of number
 * (total vs. annual) — never averaged or ranked against each other directly. */
export type ScenarioExitStrategy = "sell" | "rent";

export interface ScenarioResult {
  id: string;
  label: string;
  units: number;
  exitStrategy: ScenarioExitStrategy | null;
  viable: boolean;
  viabilityNote?: string;
  /** Total ROI % for "sell" scenarios, or annualized cash-on-cash % for "rent" scenarios. */
  roiPercent: number;
  totalInvestment: number;
  /** One-time profit ($) for "sell" scenarios, or projected annual net income ($) for "rent". */
  profitOrAnnualIncome: number;
}
