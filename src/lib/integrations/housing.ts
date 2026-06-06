/**
 * Housing quote integration. Mock returns 3 realistic furnished options near a destination.
 */

export type HousingQuote = {
  provider: string;
  packageName: string;
  housingAddress: string;
  monthlyCost: number;
  distanceToFacility: number;
  leaseFlexibility: string;
  totalPrice: number;
  petFriendly: boolean;
  cancellationPolicy: string;
};

type Input = {
  destinationCity: string;
  destinationState: string;
  facilityName?: string | null;
  petFriendly?: boolean;
  budgetMax?: number | null;
  durationWeeks?: number;
};

export async function generateHousingQuotes(input: Input): Promise<HousingQuote[]> {
  return mockHousingQuotes(input);
}

function mockHousingQuotes({ destinationCity, destinationState, petFriendly, budgetMax, durationWeeks }: Input): HousingQuote[] {
  const months = Math.max(1, Math.round((durationWeeks ?? 13) / 4));

  const options = [
    {
      name: "Furnished 1BR · Walk to facility",
      monthly: 2100,
      distance: 0.8,
      flex: "Month-to-month",
      pet: true,
      cancel: "Free cancel up to 14 days before move-in"
    },
    {
      name: "Premium 1BR Apartment · Pool + Gym",
      monthly: 2450,
      distance: 2.4,
      flex: "13-week minimum",
      pet: petFriendly ?? false,
      cancel: "50% refundable up to 7 days before move-in"
    },
    {
      name: "Suburban 2BR Townhome · Quiet Block",
      monthly: 1880,
      distance: 4.6,
      flex: "Flexible exit with 30-day notice",
      pet: true,
      cancel: "Free cancel up to 30 days before move-in"
    }
  ];

  return options
    .filter((o) => (budgetMax ? o.monthly <= Number(budgetMax) + 200 : true))
    .map((o) => ({
      provider: "mock",
      packageName: o.name,
      housingAddress: `${Math.floor(100 + Math.random() * 4900)} Memorial Pkwy, ${destinationCity}, ${destinationState}`,
      monthlyCost: o.monthly,
      distanceToFacility: o.distance,
      leaseFlexibility: o.flex,
      totalPrice: o.monthly * months,
      petFriendly: o.pet,
      cancellationPolicy: o.cancel
    }));
}
