import { getThemeAndIcon } from "../theme.js";

const section = document.getElementById("forecast");

function renderHourlyForcast(dataList) {
    const list = document.createElement("ul");
    list.className = "flex gap-4";
    dataList.forEach((dataPoint) => {
        const item = document.createElement("li");
        item.className = "inline-block text-center p-2";
        const time = new Date(dataPoint.dt * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const icon = getThemeAndIcon(dataPoint.weather[0]).icon;
        item.innerHTML = `
            <li class="inline-block text-center p-2 whitespace-nowrap">
                <span class="w-max">${time}</span>
                <span class="block text-3xl">${icon}</span>
                <span class="block text-xl">${Math.round(
                    dataPoint.main.temp
                )}°</span>
            </li>
        `;
        list.appendChild(item);
    });
    return list;
}

function renderDailyForcast(dataList) {
    const container = document.createElement("div");
    container.className =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4";

    const dailyData = [];
    for (let i = 0; i < dataList.length && dailyData.length < 5; i += 8) {
        const dayData = dataList[i];
        if (dayData) {
            // Calculate min/max temperatures for the day
            const dayItems = dataList.slice(i, i + 8);
            const min_temps = dayItems.map((item) => item.main.temp_min);
            const max_temps = dayItems.map((item) => item.main.temp_max);
            const minTemp = Math.min(...min_temps);
            const maxTemp = Math.max(...max_temps);

            dailyData.push({
                ...dayData,
                minTemp,
                maxTemp,
            });
        }
    }

    dailyData.forEach((dataPoint) => {
        const card = document.createElement("div");
        card.className = " rounded-lg p-4 text-center backdrop-blur-md border-yellow-500/50 flex flex-col justify-between gap-4";

        const date = new Date(dataPoint.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const monthDay = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        const icon = getThemeAndIcon(dataPoint.weather[0]).icon;
        const weatherDescription = dataPoint.weather[0].description;

        card.innerHTML = `
            <div class="">${monthDay}, ${dayName}</div>
            
            <div class="mb-4">
                <div class="text-4xl mb-2">${icon}</div>
                <div class="text-xs capitalize opacity-75">${weatherDescription}</div>
            </div>
            
            <div class="mb-4">
                <div class="flex justify-center items-center gap-3 mb-2">
                    <div class="flex items-center gap-1">
                        <i class="fa-solid fa-arrow-up text-red-500"></i>
                        <span class="font-semibold">${Math.round(
                            dataPoint.maxTemp
                        )}°</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="fa-solid fa-arrow-down text-blue-500"></i>
                        <span class="font-semibold">${Math.round(
                            dataPoint.minTemp
                        )}°</span>
                    </div>
                </div>
                <div class="text-sm opacity-75">Feels ${Math.round(
                    dataPoint.main.feels_like
                )}°</div>
            </div>
            
            <div class="flex justify-center gap-4">
                <div class="flex justify-center items-center gap-1">
                    <span><i class="fa-solid fa-droplet text-blue-500"></i></span>
                    <span>${dataPoint.main.humidity}%</span>
                </div>
                <div class="flex justify-center items-center gap-1 whitespace-nowrap">
                    <span><i class="fa-solid fa-wind text-yellow-500"></i></span>
                    <span>${Math.round(dataPoint.wind.speed)} m/s</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    return container;
}

function renderForecast(data) {
    section.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold mb-4">🕛Hourly Forecast</h2>
            <div class="overflow-x-auto">
                ${renderHourlyForcast(data.forecast.list).outerHTML}
            </div>
        </div>
        <div>
            <h2 class="text-2xl font-bold mb-4">📅Daily Forecast</h2>
            <div class="">
                ${renderDailyForcast(data.forecast.list).outerHTML}
            </div>
        </div>
    `;
}

export { renderForecast };
