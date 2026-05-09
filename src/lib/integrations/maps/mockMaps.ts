export type CommuteInput = {
  origin: string;
  destination: string;
};

export type CommuteEstimate = {
  mode: 'DRIVING' | 'TRANSIT';
  minutes: number;
  distanceMiles: number;
};

export async function getMockCommuteEstimate(input: CommuteInput): Promise<CommuteEstimate[]> {
  void input;
  return [
    { mode: 'DRIVING', minutes: 18, distanceMiles: 7.6 },
    { mode: 'TRANSIT', minutes: 29, distanceMiles: 7.6 }
  ];
}
