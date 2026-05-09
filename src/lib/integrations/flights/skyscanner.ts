import { searchMockFlights, type FlightOption, type FlightSearchInput } from './mockFlights';

export async function searchFlightsWithSkyscanner(input: FlightSearchInput): Promise<FlightOption[]> {
  if (!process.env.SKYSCANNER_API_KEY) {
    return searchMockFlights(input);
  }

  return searchMockFlights(input).then((data) => data.map((item) => ({ ...item, provider: 'skyscanner' })));
}
