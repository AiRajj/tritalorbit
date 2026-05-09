import { searchMockHotels, type HotelOption, type HotelSearchInput } from './mockHotels';

export async function searchHotelsWithBooking(input: HotelSearchInput): Promise<HotelOption[]> {
  if (!process.env.BOOKING_API_KEY) {
    return searchMockHotels(input);
  }

  return searchMockHotels(input).then((rows) => rows.map((row) => ({ ...row, provider: 'booking' })));
}
