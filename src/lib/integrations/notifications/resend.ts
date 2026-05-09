import { sendMockNotification, type NotificationPayload } from './mockNotifications';

export async function sendEmailNotification(payload: NotificationPayload) {
  if (!process.env.RESEND_API_KEY) {
    return sendMockNotification(payload);
  }

  return sendMockNotification(payload).then((result) => ({ ...result, provider: 'resend' }));
}
