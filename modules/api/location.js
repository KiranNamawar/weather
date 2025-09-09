import { reverseGeoCodingApiEndpoint } from "./weather.js";
import { toast } from "../ui/toast.js";

const IP_API_KEY = "1e3e99b30f59e4";

function IP_API_ENDPOINT() {
    return `https://ipinfo.io/json?token=${IP_API_KEY}`;
}

function geocodingApiEndpoint(city, limit = 5) {
    return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
    )}&count=${limit}&language=en&format=json`;
}

async function getCountryName(countryCode) {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data[0].name.common;
    } catch (error) {
        toast.error("Error fetching country name.");
        return null;
    }
}

async function getLocationByIP() {
    try {
        const response = await fetch(IP_API_ENDPOINT());
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const [lat, lon] = data.loc.split(",").map(Number);

        return {
            latitude: lat,
            longitude: lon,
            city: data.city,
            state: data.region,
            country: await getCountryName(data.country),
            country_code: data.country,
        };
    } catch (error) {
        toast.error("Error fetching location by IP.");
        return null;
    }
}

async function getCurrentLocation() {
    try {
        const location = await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    resolve(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        });

        if (location) {
            const response = await fetch(
                reverseGeoCodingApiEndpoint(
                    location.latitude,
                    location.longitude,
                    1
                )
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = (await response.json())[0];
            return {
                latitude: location.latitude,
                longitude: location.longitude,
                city: data.name,
                state: data.state,
                country: await getCountryName(data.country),
                country_code: data.country,
            };
        } else {
            toast.error("Error fetching current location. Using IP location instead.");
            return await getLocationByIP();
        }
    } catch (error) {
        toast.error("Error fetching current location, try searching for a city.");
        return null;
    }
}

const GEOCODING_API_CACHE = {};
async function searchForCity(city) {
    const searchTerm = city.toLowerCase().trim();

    // Check if result is already cached
    if (GEOCODING_API_CACHE[searchTerm]) {
        return GEOCODING_API_CACHE[searchTerm];
    }

    try {
        const response = await fetch(geocodingApiEndpoint(city, 5));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.results) {
            return [];
        }
        const results = data.results.map((item) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            city: item.name,
            state: item.admin1,
            country: item.country,
            country_code: item.country_code,
        }));

        // Cache the results
        GEOCODING_API_CACHE[searchTerm] = results;
        return results;
    } catch (error) {
        toast.error("Error searching for city.");
        return [];
    }
}

export { getCurrentLocation, getLocationByIP, searchForCity };
