export type PaymentIntentInput = {
  amount: number;
  currency?: string;
  description: string;
};

export type PaymentIntentResult = {
  provider: string;
  intentId: string;
  status: 'requires_confirmation' | 'succeeded';
};

export async function createMockPaymentIntent(input: PaymentIntentInput): Promise<PaymentIntentResult> {
  return {
    provider: 'mock',
    intentId: `mock_pi_${Math.round(input.amount * 100)}_${Date.now()}`,
    status: 'requires_confirmation'
  };
}
