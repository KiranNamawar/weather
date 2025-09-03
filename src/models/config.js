class AppConfig {
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
        return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
        )}&count=${limit}&language=en&format=json`;
    }
    static reverseGeoCodingApiEndpoint(lat, lon, limit = 5) {
        return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${
            this.#WEATHER_API_KEY
        }`;
    }
}

export default AppConfig;
