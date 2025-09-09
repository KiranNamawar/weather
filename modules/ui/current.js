import { getWeatherIcon } from "../util.js";
import { units } from "../api/weather.js";

const section = document.getElementById("current-weather");

function renderCurrentWeather(data) {
    const { location, current } = data;
    console.log("Rendering current weather for:", location, current);
    section.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-2xl md:text-4xl font-bold">${location.city}</h2>
                <p>${new Date(current.time).toDateString()}</p>
            </div>
            <span class="text-7xl md:text-9xl">${getWeatherIcon(current.weather[0])}</span>
        </div>
        <div class=" flex items-center justify-center gap-8">
            <p class="text-7xl md:text-9xl font-bold">${Math.round(current.main.temp)}°</p>
            <div class="text-xl md:text-2xl">
                <p>${current.weather[0].description}</p>
                <p>Feels like ${Math.round(current.main.feels_like)}°</p>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-16 text-center">
            <div class="bg-primary/50 p-4 rounded-lg">
                <span class="text-blue-500 text-3xl"><i class="fi fi-rc-humidity"></i></span>
                <p class="text-xl">${current.main.humidity}%</p>
                <p class="text-gray-700">Humidity</p>
            </div>
            <div class="bg-primary/50 p-4 rounded-lg">
                <span class="text-green-500 text-3xl"><i class="fi fi-rc-wind"></i></span>
                <p class="text-xl">${Math.round(current.wind.speed)} ${units === "metric" ? "m/s" : "mph"}</p>
                <p class="text-gray-700">Wind Speed</p>
            </div>
            <div class="bg-primary/50 p-4 rounded-lg">
                <span class="text-blue-500 text-3xl"><i class="fi fi-rc-water-lower"></i></span>
                <p class="text-xl">${current.main.pressure} hPa</p>
                <p class="text-gray-700">Pressure</p>
            </div>
            <div class="bg-primary/50 p-4 rounded-lg">
                <span class="text-gray-500 text-3xl"><i class="fi fi-rc-eyes"></i></span>
                <p class="text-xl">${Math.round(current.visibility / 1000)} km</p>
                <p class="text-gray-700">Visibility</p>
            </div>
        </div>
        <div class="flex items-center justify-around p-4 md:w-1/2 md:mx-auto text-center rounded-lg bg-primary/50">
            <div class=" ">
                <span class="text-4xl text-orange-500"><i class="fi fi-rc-sunrise-alt"></i></span>
                <p class="">${new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p class="text-gray-700">Sunrise</p>
            </div>
            <div class="">
                <span class="text-4xl text-amber-500"><i class="fi fi-rc-sunset"></i></span>
                <p class="">${new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p class="text-gray-700">Sunset</p>
            </div>
        </div>
    `;
}

export { renderCurrentWeather };
