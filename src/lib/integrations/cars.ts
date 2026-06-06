/**
 * Car rental quote integration. Mock returns 3 realistic options.
 */

export type CarQuote = {
  provider: string;
  packageName: string;
  carRentalCompany: string;
  carClass: string;
  weeklyRate: number;
  totalPrice: number;
  cancellationPolicy: string;
};

type Input = {
  destinationCity: string;
  destinationState: string;
  durationWeeks?: number;
};

export async function generateCarQuotes({ destinationCity, durationWeeks }: Input): Promise<CarQuote[]> {
  const weeks = Math.max(1, durationWeeks ?? 13);
  return [
    {
      provider: "mock",
      packageName: `Compact SUV · ${destinationCity}`,
      carRentalCompany: "Enterprise",
      carClass: "Compact SUV",
      weeklyRate: 225,
      totalPrice: 225 * weeks,
      cancellationPolicy: "Free cancel up to 24h before pickup"
    },
    {
      provider: "mock",
      packageName: `Mid-size Sedan · ${destinationCity}`,
      carRentalCompany: "Hertz",
      carClass: "Mid-size",
      weeklyRate: 198,
      totalPrice: 198 * weeks,
      cancellationPolicy: "Non-refundable, 7-day modification window"
    },
    {
      provider: "mock",
      packageName: `Hybrid Compact · ${destinationCity}`,
      carRentalCompany: "Avis",
      carClass: "Hybrid Compact",
      weeklyRate: 245,
      totalPrice: 245 * weeks,
      cancellationPolicy: "Free cancel up to 48h before pickup"
    }
  ];
}
