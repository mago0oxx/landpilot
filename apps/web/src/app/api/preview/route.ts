import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  AddressNotFoundError,
  createPreview,
  PreviewRateLimitError,
} from "@/features/preview/services/previewStore";
import { getPostHogServer } from "@/lib/posthogServer";

const bodySchema = z.object({
  address: z.string().trim().min(6, "Enter a full street address, including city and state."),
});

/** Trusts Vercel's x-forwarded-for, whose first entry is the real client IP. */
function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip");
}

/**
 * Public, no-account address check. Deliberately unauthenticated — this is the top of the
 * funnel, and requiring an account before showing anything is what it exists to fix.
 */
export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Enter a valid address." },
      { status: 400 }
    );
  }

  try {
    const { id } = await createPreview(parsed.data.address, clientIp(request));

    await getPostHogServer()?.captureImmediate({
      // Anonymous by definition — the preview id is the only handle we have until signup.
      distinctId: `preview:${id}`,
      event: "preview_completed",
      properties: { previewId: id },
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    if (error instanceof PreviewRateLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }
    if (error instanceof AddressNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    throw error;
  }
}
