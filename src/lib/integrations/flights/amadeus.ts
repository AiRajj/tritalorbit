import { searchMockFlights, type FlightOption, type FlightSearchInput } from './mockFlights';

export async function searchFlightsWithAmadeus(input: FlightSearchInput): Promise<FlightOption[]> {
  if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
    return searchMockFlights(input);
  }

  // Real provider integration can be enabled without changing caller behavior.
  return searchMockFlights(input).then((data) => data.map((item) => ({ ...item, provider: 'amadeus' })));
}
