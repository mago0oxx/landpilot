import { AnalysisFormValues } from "../schemas/analysisSchema";

export interface CreateAnalysisResponse {
  id: string;
}

export class AnalysisApiError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export async function createAnalysis(
  input: AnalysisFormValues,
  useAiResearch = false
): Promise<CreateAnalysisResponse> {
  const response = await fetch("/api/analyses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, useAiResearch }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new AnalysisApiError(body?.error ?? "Failed to run the LPS analysis. Please try again.", body?.code);
  }

  return response.json();
}

export async function setAnalysisPortfolio(id: string, inPortfolio: boolean): Promise<void> {
  const response = await fetch(`/api/analyses/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inPortfolio }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the portfolio status. Please try again.");
  }
}

export async function deleteAnalysis(id: string): Promise<void> {
  const response = await fetch(`/api/analyses/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete the analysis. Please try again.");
  }
}
