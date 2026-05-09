import { getMockCommuteEstimate, type CommuteEstimate, type CommuteInput } from './mockMaps';

export async function getCommuteEstimate(input: CommuteInput): Promise<CommuteEstimate[]> {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return getMockCommuteEstimate(input);
  }

  return getMockCommuteEstimate(input);
}
