/** Inline-styled HTML — email clients don't load external stylesheets, so every rule has
 * to live on the element itself. Colors match the app's brand tokens (globals.css). */
export function passwordResetEmailHtml(resetUrl: string): string {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#ECEAE3; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ECEAE3; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #ddd8ca;">
            <tr>
              <td style="background-color:#1B3427; padding:24px 32px;">
                <span style="font-size:20px; font-weight:700; color:#ffffff;">Land<span style="color:#C9943A;">Pilot</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px; font-size:20px; color:#1C1C1A;">Reset your password</h1>
                <p style="margin:0 0 24px; font-size:14px; line-height:1.6; color:#57534e;">
                  Someone requested a password reset for your LandPilot account. Click the button below to choose a new one — this link expires in 1 hour.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:12px; background-color:#C9943A;">
                      <a href="${resetUrl}" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:600; color:#1B2A22; text-decoration:none;">
                        Reset your password
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:24px 0 0; font-size:12px; line-height:1.6; color:#a8a29e;">
                  If you didn't request this, you can safely ignore this email — your password won't change.
                </p>
                <p style="margin:16px 0 0; font-size:12px; line-height:1.6; color:#a8a29e; word-break:break-all;">
                  Or paste this link into your browser: ${resetUrl}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}
