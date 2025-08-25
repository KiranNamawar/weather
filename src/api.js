const API_KEY = "d3d175e8b848468220e5e437ef7601c3";
const API_ENDPOINT = "https://api.openweathermap.org";


// NOTES FOR WORKING WITH API (RESEARCH)

// 1. Make only one api call for a location per 10 minutes

// 2. API uses UNIX timestamps

// 3. Kelvin is the default unit for temperature in the API
//    for Fahrenheit, use the "units" query parameter with the value "imperial"
//    for Celsius, use the "units" query parameter with the value "metric"

// 4. use Geographical coordinates (latitude and longitude) to specify the location
//    convert city names to coordinates using a geocoding API

// 5. API Errors
//      401: API key is invalid
//      404: location not found or url is invalid
//      429: Too many requests, rate limit exceeded
//      500: Internal server error for 500+ errors

// 6. API Calls
//      Current Weather Data: 
//          Endpoint: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//          Refer: https://openweathermap.org/current
//      Geocoding API: 
//          Endpoint: https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//          Endpoint: https://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
//          Endpoint: https://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
//          Refer: https://openweathermap.org/api/geocoding-api
//      5 Day Weather Forecast(3 hour step): 
//          Endpoint: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//          Refer: https://openweathermap.org/forecast5
//      Air Pollution API:
//          Endpoint: https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
//          Refer: https://openweathermap.org/api/air-pollution