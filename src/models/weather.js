import AppConfig from "./config.js";

class AppWeather {
    static #CURRENT_WEATHER_CACHE = []; // 10min
    static #FORECAST_WEATHER_CACHE = []; // 3hr

    static async #getWeather(lat, lon, type = "current") {
        const CACHE =
            type === "forecast"
                ? this.#FORECAST_WEATHER_CACHE
                : this.#CURRENT_WEATHER_CACHE;

        const DURATION =
            type === "forecast" ? 1000 * 60 * 60 * 3 : 1000 * 60 * 10;

        const ENDPOINT =
            type === "forecast"
                ? AppConfig.forecastWeatherApiEndpoint
                : AppConfig.currentWeatherApiEndpoint;

        const index = CACHE.findIndex(
            (item) =>
                item.coord.lon === Number(lon) && item.coord.lat === Number(lat)
        );

        if (index !== -1 && CACHE[index].time + DURATION > Date.now()) {
            return CACHE[index];
        }

        const res = await fetch(ENDPOINT(lat, lon));
        const data = { ...(await res.json()), time: Date.now() };

        if (index !== -1) {
            CACHE[index] = data;
        } else {
            CACHE.push(data);
        }

        return data;
    }

    static getCurrentWeather(lat, lon) {
        return this.#getWeather(lat, lon, "current");
    }

    static getWeatherForecast(lat, lon) {
        return this.#getWeather(lat, lon, "forecast");
    }
}

export default AppWeather;
