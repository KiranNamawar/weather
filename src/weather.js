import AppConfig from "./models/config.js";

const CURRENT_WEATHER_CACHE = []; // 10min
const FORECAST_WEATHER_CACHE = []; // 3hr

async function getCurrentWeather(lat, lon) {
    const index = CURRENT_WEATHER_CACHE.findIndex(
        (item) =>
            item.coord.lon === Number(lon) && item.coord.lat === Number(lat)
    );

    if (
        index !== -1 &&
        CURRENT_WEATHER_CACHE[index].time + 1000 * 60 * 10 > Date.now()
    ) {
        return CURRENT_WEATHER_CACHE[index];
    }

    const res = await fetch(AppConfig.currentWeatherApiEndpoint(lat, lon));
    const data = { ...(await res.json()), time: Date.now() };

    if (index !== -1) {
        CURRENT_WEATHER_CACHE[index] = data;
    } else {
        CURRENT_WEATHER_CACHE.push(data);
    }

    return data;
}

async function getWeatherForecast(lat, lon) {
    const index = FORECAST_WEATHER_CACHE.findIndex(
        (item) =>
            item.coord.lon === Number(lon) && item.coord.lat === Number(lat)
    );

    if (
        index !== -1 &&
        FORECAST_WEATHER_CACHE[index].time + 1000 * 60 * 60 * 3 > Date.now()
    ) {
        return FORECAST_WEATHER_CACHE[index];
    }

    const res = await fetch(AppConfig.forecastWeatherApiEndpoint(lat, lon));
    const data = { ...(await res.json()), time: Date.now() };

    if (index !== -1) {
        FORECAST_WEATHER_CACHE[index] = data;
    } else {
        FORECAST_WEATHER_CACHE.push(data);
    }

    return data;
}

export { getCurrentWeather, getWeatherForecast };
