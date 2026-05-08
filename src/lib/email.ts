import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendPlatformEmail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    return { mock: true };
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: input.to,
    subject: input.subject,
    html: input.html,
  });

  return { mock: false };
}
