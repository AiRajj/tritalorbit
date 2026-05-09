export type HotelSearchInput = {
  city: string;
  state?: string;
  checkInDate: string;
  checkOutDate: string;
};

export type HotelOption = {
  provider: string;
  hotelName: string;
  nightlyRate: number;
  refundable: boolean;
  distanceToFacilityMiles: number;
};

export async function searchMockHotels(input: HotelSearchInput): Promise<HotelOption[]> {
  return [
    {
      provider: 'mock',
      hotelName: `${input.city} Clinical Suites`,
      nightlyRate: 142,
      refundable: true,
      distanceToFacilityMiles: 2.4
    },
    {
      provider: 'mock',
      hotelName: `${input.city} Assignment Stay`,
      nightlyRate: 118,
      refundable: false,
      distanceToFacilityMiles: 3.8
    }
  ];
}
