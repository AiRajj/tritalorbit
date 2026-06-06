/**
 * Distance estimation. Mock returns a stable pseudo-distance based on a string hash.
 */

export async function estimateDistanceMiles(originLabel: string, destinationLabel: string): Promise<number> {
  if (process.env.GOOGLE_MAPS_API_KEY) {
    // Real Google Maps Distance Matrix call would go here.
  }
  const seed = (originLabel.length * 7 + destinationLabel.length * 13) % 9;
  return Number((0.6 + seed * 0.4).toFixed(1));
}
