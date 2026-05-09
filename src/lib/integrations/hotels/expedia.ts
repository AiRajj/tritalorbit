import { searchMockHotels, type HotelOption, type HotelSearchInput } from './mockHotels';

export async function searchHotelsWithExpedia(input: HotelSearchInput): Promise<HotelOption[]> {
  if (!process.env.EXPEDIA_RAPID_API_KEY) {
    return searchMockHotels(input);
  }

  return searchMockHotels(input).then((rows) => rows.map((row) => ({ ...row, provider: 'expedia' })));
}
