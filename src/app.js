import {
    openSearch,
    setupRecentSelectHandler,
    initializeRecentSelect,
} from "./search.js";
import AppLocation from "./models/location.js";
import AppConfig from "./models/config.js";
import AppWeather from "./models/weather.js";
import { setTheme } from "./theme.js";
import { getData } from "./data.js";
import { renderCurrentWeather } from "./ui/current.js";
import { renderForecast } from "./ui/forecast.js";

export function render(data) {
    setTheme(data.weather.weather[0]);
    renderCurrentWeather(data);
    renderForecast(data);
    // Store current location for unit changes
    AppConfig.setCurrentLocation(data.location);
    console.log(data);
}

window.addEventListener("DOMContentLoaded", async () => {
    // Initialize recent cities select
    initializeRecentSelect();

    // Initialize units select
    const unitsSelect = document.querySelector("#units");
    unitsSelect.value = AppConfig.units;

    const data = await getData(AppLocation.getLocationFromIP);
    if (!data) return;
    render(data);

    // Setup recent cities select handler
    setupRecentSelectHandler(async (locationData) => {
        const data = await getData(() => Promise.resolve(locationData));
        if (!data) return;
        render(data);
    });

    // Setup units select handler
    unitsSelect.addEventListener("change", async (e) => {
        AppConfig.setUnits(e.target.value);
        // Clear weather cache to force fresh data with new units
        AppWeather.clearCache();
        // Re-fetch data with new units using stored location
        const currentLocation = AppConfig.getCurrentLocation();
        if (currentLocation) {
            const data = await getData(() => Promise.resolve(currentLocation));
            if (!data) return;
            render(data);
        }
    });

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
