import { Resend } from "resend";

let resendInstance: Resend | null = null;

/** Lazily constructed, same graceful-degradation pattern as getStripe() — returns null instead
 * of throwing when RESEND_API_KEY isn't set, so callers can fall back to logging the email
 * content server-side (useful for local dev before a real key is configured). */
export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export const EMAIL_FROM = process.env.EMAIL_FROM || "LandPilot <onboarding@resend.dev>";
