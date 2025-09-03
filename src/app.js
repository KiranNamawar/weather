import { openSearch } from "./search.js";
import AppWeather from "./models/weather.js";

window.addEventListener("DOMContentLoaded", () => {
    //Test
    const button = document.querySelector("dialog + button");
    button.onclick = async () => {
        const result = await openSearch();
        if (result) {
            console.log("Selected location:", result);
            const weather = await AppWeather.getCurrentWeather(
                result.latitude,
                result.longitude
            );
            console.log("Current weather", weather);
            const forecast = await AppWeather.getWeatherForecast(
                result.latitude,
                result.longitude
            );
            console.log("Forecast", forecast);
        } else {
            console.log("Search canceled");
        }
    };
});
