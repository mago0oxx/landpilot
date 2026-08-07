import { NextRequest, NextResponse } from "next/server";
import { extractListingText } from "@/features/analyze/services/extractListingText";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await request.json();
  if (typeof body?.text !== "string") {
    return NextResponse.json({ error: "text (string) is required." }, { status: 400 });
  }

  const result = await extractListingText(body.text);
  return NextResponse.json(result);
}
