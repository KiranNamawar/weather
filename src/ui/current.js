import AppConfig from "../models/config.js";
import { getThemeAndIcon } from "../theme.js";

const section = document.querySelector("#current-weather");

function renderCurrentWeather(data) {
    const weatherIcon = getThemeAndIcon(data.weather.weather[0]).icon;
    section.innerHTML = `
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
            <i class="fa-solid fa-location-dot md:block text-5xl opacity-50 text-blue-500"></i>
            <div>
                <h2 class="text-2xl font-bold">${data.location.city}</h2>
                <p>${new Date(data.weather.dt * 1000).toLocaleString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}</p>
            </div>
        </div>
        <span class="text-7xl">${weatherIcon}</span>
    </div>
    <div class="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
        <p class="text-8xl">${Math.round(data.weather.main.temp)}°</p>
        <div>
            <p class="text-xl capitalize">${
                data.weather.weather[0].description
            }</p>
            <p class="text-lg">Feels like: ${Math.round(
                data.weather.main.feels_like
            )}°</p>
            <p class="text-lg"><i class="fa-solid fa-up-long text-red-500"></i> ${Math.round(
                data.weather.main.temp_max
            )}° | <i class="fa-solid fa-down-long text-blue-500"></i> ${Math.round(
        data.weather.main.temp_min
    )}°</p>
        </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
        <div>
            <p class="text-4xl text-blue-500"><i class="fa-solid fa-droplet"></i></p>
            <p class="font-bold">${data.weather.main.humidity}%</p>
            <p class="text-sm">Humidity</p>
        </div>
        <div>
            <p class="text-4xl text-yellow-500"><i class="fa-solid fa-wind"></i></p>
            <p class="font-bold">${data.weather.wind.speed} ${
        AppConfig.units === "metric" ? "m/s" : "mph"
    }</p>
            <p class="text-sm">Wind Speed</p>
        </div>
        <div>
            <p class="text-4xl text-green-500"><i class="fa-solid fa-gauge-high"></i></p>
            <p class="font-bold">${data.weather.main.pressure} hPa</p>
            <p class="text-sm">Pressure</p>
        </div>
        <div>
            <p class="text-4xl text-purple-500"><i class="fa-solid fa-eye"></i></p>
            <p class="font-bold">${data.weather.visibility / 1000} km</p>
            <p class="text-sm">Visibility</p>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4 text-center">
        <div>
            <p class="text-4xl">🌅</p>
            <p class="text-lg">${new Date(data.weather.sys.sunrise * 1000).toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }
            )}</p>
            <p>Sunrise</p>
        </div>
        <div>
            <p class="text-4xl">🌇</p>
            <p class="text-lg">${new Date(data.weather.sys.sunset * 1000).toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }
            )}</p>
            <p>Sunset</p>
        </div>
    </div>
`;
}

export { renderCurrentWeather };
