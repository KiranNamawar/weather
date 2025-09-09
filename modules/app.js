import { addRecentCity, initRecentCities } from "./ui/recent-cities.js";
import {
    getCurrentWeather,
    getForecastWeather,
    toggleUnits,
} from "./api/weather.js";
import { renderCurrentWeather } from "./ui/current.js";
import { renderForecastWeather } from "./ui/forecast.js";
import { getCurrentLocation, getLocationByIP } from "./api/location.js";
import { getLocationFromCity } from "./ui/search.js";
import { toast } from "./ui/toast.js";
import { showLoading } from "./ui/loading.js";

let currentLocation = null;

window.addEventListener("DOMContentLoaded", async () => {
    // Initialize recent cities on page load
    initRecentCities();

    // Show loading indicators when app starts
    showLoading("current-weather");
    showLoading("forecast-weather");

    // Initial data fetch based on geolocation permission
    const permission = await navigator.permissions.query({
        name: "geolocation",
    });
    if (permission.state === "granted") {
        const location = await getCurrentLocation();
        await updateWeather(location);
    } else {
        const location = await getLocationByIP();
        await updateWeather(location);
    }

    // Set up Current Location Button
    document
        .getElementById("my-location")
        .addEventListener("click", async (event) => {
            const button = event.target.closest("button");
            const originalHTML = button.innerHTML;

            // Show loading state
            button.innerHTML = `
                <span class="align-middle">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></div>
                </span>
                <span class="hidden md:inline"> Getting Location... </span>
            `;
            button.disabled = true;
            button.classList.add("opacity-75", "cursor-not-allowed");

            try {
                const location = await getCurrentLocation();
                await updateWeather(location);
            } catch (error) {
                console.error("Location error:", error);
            } finally {
                // Restore button
                button.innerHTML = originalHTML;
                button.disabled = false;
                button.classList.remove("opacity-75", "cursor-not-allowed");
            }
        });

    // Set up Search City Button
    document
        .getElementById("search-city")
        .addEventListener("click", async () => {
            const location = await getLocationFromCity();
            await updateWeather(location);
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

    // Handle recent cities selection using custom event
    document.addEventListener("citySelected", async (event) => {
        const selectedCity = event.detail;
        await updateWeather(selectedCity);
    });
});

async function getData(location) {
    // Show loading indicators
    showLoading("current-weather");
    showLoading("forecast-weather");

    const current = await getCurrentWeather(
        location.latitude,
        location.longitude
    );
    const forecast = await getForecastWeather(
        location.latitude,
        location.longitude
    );
    return { location, current, forecast };
}

function render(data) {
    renderCurrentWeather(data);
    renderForecastWeather(data);
}

async function updateWeather(location) {
    if (!location) {
        toast.error("No location provided.");
        return;
    }

    currentLocation = location;
    addRecentCity(location);
    const data = await getData(location);
    if (data) {
        render(data);
    }
}
