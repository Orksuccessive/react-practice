export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
}

export async function searchCity(
  city: string,
  signal?: AbortSignal
): Promise<Location> {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(city)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `City search failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error(
      `City "${city}" not found`
    );
  }

  return data.results[0];
}

export async function fetchWeather(
  location: Location,
  signal?: AbortSignal
): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,wind_speed_10m,weather_code` +
    `&timezone=auto`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Weather request failed: ${response.status}`
    );
  }

  return response.json();
}