import { NextRequest, NextResponse } from "next/server";
import { EMPTY_LOOKUP_RESULT, lookupProperty, PropertyLookupResult } from "@/lib/propertyLookup";

export type { PropertyLookupResult };

/**
 * Thin HTTP wrapper over `lookupProperty` for the authenticated analyze form, which
 * calls this on address blur to auto-fill the fields it can. The lookup itself lives in
 * lib/propertyLookup.ts so the public address check (/api/preview) can call it directly
 * server-side instead of making an HTTP round-trip to this route.
 */
export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();
  if (!address) return NextResponse.json(EMPTY_LOOKUP_RESULT);

  return NextResponse.json(await lookupProperty(address));
}
