import { initRecentCities } from "./ui/recent-cities.js";
import {
    getCurrentWeather,
    getForecastWeather,
    toggleUnits,
} from "./api/weather.js";
import { renderCurrentWeather } from "./ui/current.js";
import { renderForecastWeather } from "./ui/forecast.js";
import { getCurrentLocation, getLocationByIP } from "./api/location.js";
import { getLocationFromCity } from "./ui/search.js";

let currentLocation = null;

window.addEventListener("DOMContentLoaded", async () => {
    // Initialize recent cities on page load
    initRecentCities();

    // Initial data fetch based on geolocation permission
    const permission = await navigator.permissions.query({
        name: "geolocation",
    });
    if (permission.state === "granted") {
        const location = await getCurrentLocation();
        currentLocation = location;
        const data = await getData(location);
        render(data);
    } else {
        const location = await getLocationByIP();
        currentLocation = location;
        const data = await getData(location);
        render(data);
    }

    // Set up Current Location Button
    document
        .getElementById("my-location")
        .addEventListener("click", async () => {
            const location = await getCurrentLocation();
            currentLocation = location;
            const data = await getData(location);
            render(data);
        });

    // Set up Search City Button
    document
        .getElementById("search-city")
        .addEventListener("click", async () => {
            const location = await getLocationFromCity();
            currentLocation = location;
            const data = await getData(location);
            render(data);
        });

    document
        .getElementById("toggle-units")
        .addEventListener("click", async () => {
            if (!currentLocation) return;
            toggleUnits();
            document.querySelectorAll("#toggle-units span").forEach((span) => {
                span.classList.toggle("active");
            });
            const data = await getData(currentLocation);
            render(data);
        });
});

async function getData(location) {
    console.log("location:", location, "currentLocation:", currentLocation);
    if (!location) {
        console.error("No location provided.");
        return null;
    }
    const current = await getCurrentWeather(
        location.latitude,
        location.longitude
    );
    if (!current) {
        console.error("Failed to fetch current weather data.");
        return null;
    }
    const forecast = await getForecastWeather(
        location.latitude,
        location.longitude
    );
    if (!forecast) {
        console.error("Failed to fetch forecast weather data.");
        return null;
    }
    return { location, current, forecast };
}

function render(data) {
    renderCurrentWeather(data);
    renderForecastWeather(data);
}

// Handle recent cities selection using custom event
document.addEventListener("citySelected", (event) => {
    const selectedCity = event.detail;
    console.log("Selected from recent cities:", selectedCity);
    getData(selectedCity).then(render);
});
