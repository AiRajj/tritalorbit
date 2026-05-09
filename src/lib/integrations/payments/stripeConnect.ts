import { createMockPaymentIntent } from './mockPayments';

export async function createVendorPayout(amount: number, vendorAccountId: string) {
  if (!process.env.STRIPE_CONNECT_CLIENT_ID) {
    return {
      provider: 'mock',
      payoutId: `mock_po_${Date.now()}`,
      amount,
      vendorAccountId,
      status: 'queued'
    };
  }

  const mock = await createMockPaymentIntent({ amount, description: 'Vendor payout' });
  return {
    provider: 'stripe-connect',
    payoutId: mock.intentId,
    amount,
    vendorAccountId,
    status: 'queued'
  };
}
