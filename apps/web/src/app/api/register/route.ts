import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { claimPreview } from "@/features/preview/services/previewStore";
import { getPostHogServer } from "@/lib/posthogServer";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  /** Set when the signup came from a free address check, so we can attribute it. */
  previewId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const { name, email, password, previewId } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { name, email, passwordHash } });

  if (previewId) await claimPreview(previewId, user.id);

  await getPostHogServer()?.captureImmediate({
    distinctId: user.id,
    event: "user_signed_up",
    // The share of signups that started from a free address check is the single number
    // that says whether removing the registration wall worked.
    properties: { method: "credentials", fromPreview: Boolean(previewId) },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
