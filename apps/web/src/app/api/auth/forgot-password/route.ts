import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { EMAIL_FROM, getResend } from "@/lib/email";
import { passwordResetEmailHtml } from "@/lib/emailTemplates";
import { generateResetToken, PASSWORD_RESET_TOKEN_TTL_MS } from "@/lib/passwordReset";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

// Same response regardless of whether the email is registered, has a password, or the send
// failed — so this endpoint can't be used to enumerate which emails have accounts.
const GENERIC_MESSAGE = "If an account exists for that email, we've sent a link to reset your password.";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Google-only accounts (no passwordHash) have nothing to reset — silently skip, same
  // generic response either way.
  if (user?.passwordHash) {
    const { rawToken, tokenHash } = generateResetToken();
    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS),
      },
    });

    const resetUrl = `${request.nextUrl.origin}/reset-password?token=${rawToken}`;
    const resend = getResend();

    if (resend) {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: "Reset your LandPilot password",
        html: passwordResetEmailHtml(resetUrl),
      });
    } else {
      // No RESEND_API_KEY configured yet — log the link so the flow is still testable locally.
      console.log(`[forgot-password] RESEND_API_KEY not set. Reset link for ${user.email}: ${resetUrl}`);
    }
  }

  return NextResponse.json({ message: GENERIC_MESSAGE });
}
