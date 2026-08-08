// Temporary — verifies Sentry is actually capturing server-side errors in production.
// Removed once confirmed.
export async function GET() {
  throw new Error("Sentry verification test error — safe to ignore.");
}
