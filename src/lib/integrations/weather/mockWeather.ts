export type WeatherForecast = {
  summary: string;
  highF: number;
  lowF: number;
  packingTips: string[];
};

export async function getMockWeatherForecast(location: string): Promise<WeatherForecast> {
  void location;
  return {
    summary: 'Mild mornings with occasional rain.',
    highF: 72,
    lowF: 55,
    packingTips: ['Bring a light rain jacket.', 'Pack non-slip footwear.', 'Carry layered scrubs for cooler shifts.']
  };
}
