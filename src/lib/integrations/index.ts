/**
 * Integration registry.
 * Each provider checks env vars; if missing or call fails, falls back to mock.
 * Mock outputs are deterministic and realistic for demo + dev surfaces.
 */

export { generateFlightQuotes } from "./flights";
export { generateHousingQuotes } from "./housing";
export { generateCarQuotes } from "./cars";
export { generateHotelQuotes } from "./hotels";
export { estimateDistanceMiles } from "./maps";

export type IntegrationProvider = "mock" | "amadeus" | "duffel" | "booking" | "expedia" | "google";

export function activeFlightProvider(): IntegrationProvider {
  if (process.env.AMADEUS_API_KEY && process.env.AMADEUS_API_SECRET) return "amadeus";
  if (process.env.DUFFEL_API_KEY) return "duffel";
  return "mock";
}

export function activeHotelProvider(): IntegrationProvider {
  if (process.env.BOOKING_API_KEY) return "booking";
  if (process.env.EXPEDIA_RAPID_API_KEY) return "expedia";
  return "mock";
}

export function activeMapsProvider(): IntegrationProvider {
  if (process.env.GOOGLE_MAPS_API_KEY) return "google";
  return "mock";
}
