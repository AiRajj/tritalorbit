export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  openAiKey: process.env.OPENAI_API_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
};

export function isFeatureConfigured(key: keyof typeof env) {
  return Boolean(env[key]);
}
