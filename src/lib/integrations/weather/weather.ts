import { getMockWeatherForecast, type WeatherForecast } from './mockWeather';

export async function getWeatherForecast(location: string): Promise<WeatherForecast> {
  if (!process.env.WEATHER_API_KEY) {
    return getMockWeatherForecast(location);
  }

  return getMockWeatherForecast(location);
}
