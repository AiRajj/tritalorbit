export type NotificationPayload = {
  to: string;
  subject?: string;
  message: string;
};

export async function sendMockNotification(payload: NotificationPayload) {
  return {
    provider: 'mock',
    delivered: true,
    reference: `mock_msg_${Date.now()}`,
    preview: payload.message.slice(0, 80)
  };
}
