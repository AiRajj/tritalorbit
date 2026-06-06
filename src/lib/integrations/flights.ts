/**
 * Flight quote integration.
 * Real providers (Amadeus, Duffel) hook here. Mock returns 3 realistic options.
 */

export type FlightQuote = {
  provider: string;
  airlineName: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  stops: number;
  totalPrice: number;
  baggageIncluded: boolean;
  cancellationPolicy: string;
};

type Input = {
  originAirport?: string | null;
  destinationAirport?: string | null;
  moveDate?: Date | null;
};

const carrierPool = [
  { code: "DL", name: "Delta" },
  { code: "AA", name: "American Airlines" },
  { code: "UA", name: "United" },
  { code: "WN", name: "Southwest" }
];

export async function generateFlightQuotes(input: Input): Promise<FlightQuote[]> {
  // Real-provider branch would go here.
  return mockFlightQuotes(input);
}

function mockFlightQuotes({ originAirport, destinationAirport, moveDate }: Input): FlightQuote[] {
  const base = moveDate ? new Date(moveDate) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const origin = originAirport || "DFW";
  const dest = destinationAirport || "ATL";

  return carrierPool.slice(0, 3).map((carrier, idx) => {
    const departure = new Date(base);
    departure.setHours(6 + idx * 4, 30 + idx * 5, 0, 0);
    const flightHours = 2 + idx * 0.5;
    const arrival = new Date(departure.getTime() + flightHours * 60 * 60 * 1000);

    return {
      provider: "mock",
      airlineName: carrier.name,
      flightNumber: `${carrier.code}${(1200 + idx * 47).toString()}`,
      departureAirport: origin,
      arrivalAirport: dest,
      departureTime: departure,
      arrivalTime: arrival,
      stops: idx === 2 ? 1 : 0,
      totalPrice: 268 + idx * 47 + (idx === 2 ? -60 : 0),
      baggageIncluded: idx !== 1,
      cancellationPolicy: idx === 0 ? "Refundable within 24h" : "Non-refundable, change fee $75"
    };
  });
}
