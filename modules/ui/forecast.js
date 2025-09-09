import { getWeatherIcon } from "../icon.js";

const section = document.getElementById("forecast-weather");

function renderHourlyForecast(list) {
    const ul = document.createElement("ul");
    ul.className = "flex space-x-4 overflow-x-auto pb-4";
    list.forEach((item) => {
        const li = document.createElement("li");
        const date = new Date(item.dt * 1000);
        const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const temp = Math.round(item.main.temp);
        const icon = getWeatherIcon(item.weather[0]);
        const description = item.weather[0].description;

        li.innerHTML = `
            <div class="flex flex-col items-center justify-between text-center rounded-lg p-4 bg-primary/50 min-w-[120px]">
                <p class="text-sm whitespace-nowrap font-medium">${time}</p>
                <span class="text-3xl my-2">${icon}</span>
                <p class="text-lg font-bold">${temp}°</p>
                <p class="text-xs text-gray-700 capitalize">${description}</p>
            </div>
        `;
        ul.appendChild(li);
    });
    return ul.outerHTML;
}

function renderDailyForecast(list) {
    const dailyData = {};

    list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
        if (!dailyData[day]) {
            dailyData[day] = {
                temp: Math.round(item.main.temp),
                icon: getWeatherIcon(item.weather[0]),
                description: item.weather[0].description,
                tempMin: Math.round(item.main.temp_min),
                tempMax: Math.round(item.main.temp_max),
            };
        }
    });

    const ul = document.createElement("ul");
    ul.className =
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4";
    for (const [day, data] of Object.entries(dailyData)) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="bg-primary/50 p-4 grid grid-cols-2 gap-4 rounded-lg text-center">
                <p class="text-lg font-medium col-span-2">${day}</p>
                <div class="flex-flex-col">
                    <span class="text-5xl">${data.icon}</span>
                    <p class="text-sm text-gray-700 mb-3 capitalize">${data.description}</p>
                </div>
                <div class="flex flex-col justify-center items-center gap-2">
                    <p class="text-2xl font-bold">${data.temp}&deg;</p>
                    <div>
                        <span class="text-red-500"><i class="fi fi-rc-arrow-trend-up"></i></span>
                        <span>${data.tempMax}°</span>
                        <span class="text-blue-500 ml-2"><i class="fi fi-rc-arrow-trend-down"></i></span>
                        <span>${data.tempMin}°</span>
                    </div>
                </div>
            </div>
        `;
        ul.appendChild(li);
    }
    return ul.outerHTML;
}

function renderForecastWeather(data) {
    section.innerHTML = `
        <h2 class="text-2xl mt-4 font-bold">
            <span class=" text-yellow-500 align-middle"><i class="fi fi-rc-clock-five"></i></span>
            Hourly Forecast
        </h2>
        <div class="">
            ${renderHourlyForecast(data.forecast.list)}
        </div>
        <h2 class="text-2xl mt-4 font-bold">
            <span class=" text-blue-500 align-middle"><i class="fi fi-rc-calendar"></i></span>
            Daily Forecast
        </h2>
        <div>
            ${renderDailyForecast(data.forecast.list)}
        </div>
    `;
}

export { renderForecastWeather };
