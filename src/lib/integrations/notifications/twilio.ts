import { sendMockNotification, type NotificationPayload } from './mockNotifications';

export async function sendSmsNotification(payload: NotificationPayload) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    return sendMockNotification(payload);
  }

  return sendMockNotification(payload).then((result) => ({ ...result, provider: 'twilio' }));
}
