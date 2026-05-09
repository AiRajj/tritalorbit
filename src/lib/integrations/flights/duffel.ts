import { searchMockFlights, type FlightOption, type FlightSearchInput } from './mockFlights';

export async function searchFlightsWithDuffel(input: FlightSearchInput): Promise<FlightOption[]> {
  if (!process.env.DUFFEL_API_KEY) {
    return searchMockFlights(input);
  }

  return searchMockFlights(input).then((data) => data.map((item) => ({ ...item, provider: 'duffel' })));
}
