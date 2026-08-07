import { FieldErrors } from "react-hook-form";

export function getFieldError(errors: FieldErrors, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = errors;
  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  if (current && typeof current === "object" && "message" in current) {
    return (current as { message?: string }).message;
  }
  return undefined;
}
