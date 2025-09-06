import { openSearch } from "./search.js";
import AppWeather from "./models/weather.js";
import AppLocation from "./models/location.js";
import { setTheme } from "./theme.js";
import { getData } from "./data.js";
import { renderCurrentWeather } from "./ui/current.js";
import { renderForecast } from "./ui/forecast.js";

function render(data) {
    setTheme(data.weather.weather[0]);
    renderCurrentWeather(data);
    renderForecast(data);
    console.log(data);
}

window.addEventListener("DOMContentLoaded", async () => {
    //Test
    const data = await getData(AppLocation.getLocationFromIP);
    if (!data) return;
    render(data);
    const searchButton = document.querySelector("#open-search");
    searchButton.addEventListener("click", async () => {
        const data = await getData(openSearch);
        if (!data) return;
        render(data);
    });
    const locationButton = document.querySelector("#my-location");
    locationButton.addEventListener("click", async () => {
        const data = await getData(AppLocation.getCurrentLocation);
        if (!data) return;
        render(data);
    });
});
