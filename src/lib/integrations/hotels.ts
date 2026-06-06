/**
 * Hotel quote integration. Mock returns 3 realistic extended-stay options.
 */

export type HotelQuote = {
  provider: string;
  packageName: string;
  hotelName: string;
  nightlyRate: number;
  totalPrice: number;
  cancellationPolicy: string;
};

type Input = {
  destinationCity: string;
  nights?: number;
};

export async function generateHotelQuotes({ destinationCity, nights }: Input): Promise<HotelQuote[]> {
  const stay = nights ?? 7;
  return [
    {
      provider: "mock",
      packageName: `Extended Stay America · ${destinationCity}`,
      hotelName: "Extended Stay America",
      nightlyRate: 112,
      totalPrice: 112 * stay,
      cancellationPolicy: "Free cancel 24h before check-in"
    },
    {
      provider: "mock",
      packageName: `Residence Inn by Marriott · ${destinationCity}`,
      hotelName: "Residence Inn",
      nightlyRate: 168,
      totalPrice: 168 * stay,
      cancellationPolicy: "Free cancel 48h before check-in"
    },
    {
      provider: "mock",
      packageName: `Sonesta Simply Suites · ${destinationCity}`,
      hotelName: "Sonesta Simply Suites",
      nightlyRate: 95,
      totalPrice: 95 * stay,
      cancellationPolicy: "Non-refundable promotional rate"
    }
  ];
}
