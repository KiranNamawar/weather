# OpenWeatherMap API – Research Notes

## Rate limiting and call policy

-   Make at most one API call per location every 10 minutes.
-   Cache responses where possible to avoid hitting rate limits and to keep the UI responsive.

## Time format

-   Timestamps returned by the API are UNIX epoch seconds.

## Units

-   Default temperature unit is Kelvin.
-   Use the `units` query parameter to change units:
    -   `units=metric` → Celsius
    -   `units=imperial` → Fahrenheit

## Locations

-   Prefer geographical coordinates (latitude, longitude) when calling weather endpoints.
-   Convert human-readable place names to coordinates via the Geocoding API (see below).

## Common API errors

-   401: Invalid API key.
-   404: Location not found or URL is invalid.
-   429: Too many requests (rate limit exceeded).
-   500+: Server-side error.

## Base endpoint

-   `https://api.openweathermap.org`
-   Always include your API key via `appid={API_KEY}`.

## Key endpoints and references

### Current Weather Data

-   Endpoint:
    -   `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}`
    -   Optional: `&units=metric` or `&units=imperial`
-   Docs: https://openweathermap.org/current

### 5-Day / 3-Hour Forecast

-   Endpoint:
    -   `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}`
    -   Optional: `&units=metric` or `&units=imperial`
-   Docs: https://openweathermap.org/forecast5

### Geocoding API

-   Direct geocoding (city to coordinates):
    -   `https://geocoding-api.open-meteo.com/v1/search?name={city}&count={limit}&language={en}&format={json}`
-   Docs: https://open-meteo.com/en/docs/geocoding-api

### Air Pollution API

-   Endpoint:
    -   `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}`
-   Docs: https://openweathermap.org/api/air-pollution

## Usage tips

-   Validate inputs and handle error codes gracefully (401/404/429/5xx).
-   Prefer lat/lon when available; fall back to geocoding when users type city names.
-   Consider debouncing search input and caching per-location results for 10 minutes.
