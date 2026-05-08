import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

export async function sendPasswordResetEmail({ to, resetUrl }: { to: string; resetUrl: string }) {
  if (!resend) {
    return { mocked: true };
  }

  await resend.emails.send({
    from: "TRITAL Orbit <no-reply@tritalorbit.com>",
    to,
    subject: "Reset your TRITAL Orbit password",
    html: `<p>You requested a password reset for TRITAL Orbit.</p><p><a href="${resetUrl}">Reset Password</a></p>`
  });

  return { mocked: false };
}
