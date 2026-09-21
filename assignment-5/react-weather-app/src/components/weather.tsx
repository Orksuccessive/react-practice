import {
  useQuery,
} from "@tanstack/react-query";

import {
  fetchWeather,
  searchCity,
} from "../api/weather";

import {
  useState,
} from "react";

function Weather() {
  const [cityInput, setCityInput] =
    useState("");

  const [city, setCity] =
    useState("");

  const locationQuery =
    useQuery({
      queryKey: ["location", city],

      queryFn: ({ signal }) =>
        searchCity(city, signal),

      enabled: Boolean(city),

      staleTime: 5 * 60 * 1000,

      retry: 3,

      retryDelay: (attemptIndex) =>
        Math.min(
          1000 * 2 ** attemptIndex,
          30000
        ),
    });

  const weatherQuery =
    useQuery({
      queryKey: [
        "weather",
        locationQuery.data?.latitude,
        locationQuery.data?.longitude,
      ],

      queryFn: ({ signal }) =>
        fetchWeather(
          locationQuery.data!,
          signal
        ),

      enabled: Boolean(
        locationQuery.data
      ),

      staleTime: 5 * 60 * 1000,

      retry: 3,

      retryDelay: (attemptIndex) =>
        Math.min(
          1000 * 2 ** attemptIndex,
          30000
        ),
    });

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const trimmed =
      cityInput.trim();

    if (!trimmed) {
      return;
    }

    setCity(trimmed);
  };

  return (
    <main className="weather-container">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={cityInput}
          onChange={(event) =>
            setCityInput(
              event.target.value
            )
          }
          placeholder="Enter city"
        />

        <button type="submit">
          Search
        </button>
      </form>

      {/* Location loading */}
      {locationQuery.isLoading && (
        <p>Finding city...</p>
      )}

      {/* Location error */}
      {locationQuery.isError && (
        <p role="alert">
          {locationQuery.error.message}
        </p>
      )}

      {/* Weather loading */}
      {weatherQuery.isLoading && (
        <p>Loading weather...</p>
      )}

      {/* Weather error */}
      {weatherQuery.isError && (
        <section>
          <p role="alert">
            {weatherQuery.error.message}
          </p>

          <button
            onClick={() =>
              weatherQuery.refetch()
            }
          >
            Retry
          </button>
        </section>
      )}

      {/* Weather data */}
      {weatherQuery.data &&
  locationQuery.data && (
    <section className="weather-card">
      <h2>
        {locationQuery.data.name},{" "}
        {locationQuery.data.country}
      </h2>

      <p>
        Temperature:{" "}
        {weatherQuery.data.current.temperature_2m}
        {weatherQuery.data.current_units.temperature_2m}
      </p>

      <p>
        Wind:{" "}
        {weatherQuery.data.current.wind_speed_10m}
        {weatherQuery.data.current_units.wind_speed_10m}
      </p>

      {weatherQuery.isFetching && (
        <p>Refreshing weather...</p>
      )}

      <button
        onClick={() =>
          weatherQuery.refetch()
        }
        disabled={weatherQuery.isFetching}
      >
        {weatherQuery.isFetching
          ? "Refreshing..."
          : "Refresh"}
      </button>
    </section>
  )}
    </main>
  );
}

export default Weather;