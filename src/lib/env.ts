export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  openAiKey: process.env.OPENAI_API_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  amadeusApiKey: process.env.AMADEUS_API_KEY,
  amadeusApiSecret: process.env.AMADEUS_API_SECRET,
  duffelApiKey: process.env.DUFFEL_API_KEY,
  skyscannerApiKey: process.env.SKYSCANNER_API_KEY,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  bookingApiKey: process.env.BOOKING_API_KEY,
  expediaRapidApiKey: process.env.EXPEDIA_RAPID_API_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  stripeConnectClientId: process.env.STRIPE_CONNECT_CLIENT_ID,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER
};

export function isFeatureConfigured(key: keyof typeof env) {
  return Boolean(env[key]);
}
