class Config {
    static #IP_API_KEY = "1e3e99b30f59e4";
    static #WEATHER_API_KEY = "d3d175e8b848468220e5e437ef7601c3";

    static IP_API_ENDPOINT = `https://ipinfo.io/json?token=${this.#IP_API_KEY}`;

    static currentWeatherApiEndpoint(lat, lon, units = "metric") {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${
            this.#WEATHER_API_KEY
        }`;
    }
    static forecastWeatherApiEndpoint(lat, lon, units = "metric") {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${
            this.#WEATHER_API_KEY
        }`;
    }
    static geocodingApiEndpoint(city, limit = 5) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
        )}&limit=${limit}&appid=${this.#WEATHER_API_KEY}`;
    }
}

export { Config };