import AppConfig from "./config.js";

class AppWeather {
    static #CURRENT_WEATHER_CACHE = []; // 10min
    static #FORECAST_WEATHER_CACHE = []; // 3hr

    static async #getWeather(lat, lon, type = "current") {
        try {
            const CACHE =
                type === "forecast"
                    ? this.#FORECAST_WEATHER_CACHE
                    : this.#CURRENT_WEATHER_CACHE;

            const DURATION =
                type === "forecast" ? 1000 * 60 * 60 * 3 : 1000 * 60 * 10;

            const ENDPOINT =
                type === "forecast"
                    ? AppConfig.forecastWeatherApiEndpoint(lat, lon)
                    : AppConfig.currentWeatherApiEndpoint(lat, lon);

            const index = CACHE.findIndex(
                (item) =>
                    item.coord &&
                    Math.round(item.coord.lon * 10000) ===
                        Math.round(Number(lon) * 10000) &&
                    Math.round(item.coord.lat * 10000) ===
                        Math.round(Number(lat) * 10000)
            );

            if (index !== -1 && CACHE[index].time + DURATION > Date.now()) {
                return CACHE[index];
            }

            const res = await fetch(ENDPOINT);
            if (!res.ok) {
                throw new Error("API error: " + res.statusText);
            }
            const apiData = await res.json();
            const data = {
                ...apiData,
                coord: apiData.coord || apiData.city?.coord,
                time: Date.now(),
            };

            if (index !== -1) {
                CACHE[index] = data;
            } else {
                CACHE.push(data);
            }

            return data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // TODO: show toast
        }
    }

    static getCurrentWeather(lat, lon) {
        return this.#getWeather(lat, lon, "current");
    }

    static getWeatherForecast(lat, lon) {
        return this.#getWeather(lat, lon, "forecast");
    }

    static clearCache() {
        this.#CURRENT_WEATHER_CACHE.length = 0;
        this.#FORECAST_WEATHER_CACHE.length = 0;
    }
}

export default AppWeather;
