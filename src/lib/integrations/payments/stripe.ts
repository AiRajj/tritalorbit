import { createMockPaymentIntent, type PaymentIntentInput, type PaymentIntentResult } from './mockPayments';

export async function createWalletPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return createMockPaymentIntent(input);
  }

  return createMockPaymentIntent(input).then((result) => ({ ...result, provider: 'stripe' }));
}
