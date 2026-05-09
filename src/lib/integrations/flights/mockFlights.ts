export type FlightSearchInput = {
  originAirport: string;
  destinationAirport: string;
  departureDate: string;
  returnDate?: string;
};

export type FlightOption = {
  provider: string;
  airline: string;
  flightNumber: string;
  price: number;
  stops: number;
  departureTime: string;
  arrivalTime: string;
};

export async function searchMockFlights(input: FlightSearchInput): Promise<FlightOption[]> {
  const seed = `${input.originAirport}-${input.destinationAirport}`;
  return [
    {
      provider: 'mock',
      airline: 'Orbit Air',
      flightNumber: `OR-${seed.slice(0, 3).toUpperCase()}-101`,
      price: 342,
      stops: 0,
      departureTime: `${input.departureDate}T08:20:00.000Z`,
      arrivalTime: `${input.departureDate}T12:05:00.000Z`
    },
    {
      provider: 'mock',
      airline: 'HealthMiles',
      flightNumber: `HM-${seed.slice(0, 3).toUpperCase()}-219`,
      price: 298,
      stops: 1,
      departureTime: `${input.departureDate}T11:40:00.000Z`,
      arrivalTime: `${input.departureDate}T17:50:00.000Z`
    }
  ];
}
