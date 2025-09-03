import { AppConfig } from "./config.js";

class AppLocation {
    static async getLocationFromIP() {
        const response = await fetch(AppConfig.IP_API_ENDPOINT);
        if (!response.ok) {
            throw new Error("Failed to fetch location from IP.");
        }
        const data = await response.json();
        const [latitude, longitude] = data.loc.split(",").map(Number);
        return this.getCityDetail(latitude, longitude);
    }

    static async getCurrentLocation() {
        const fallback = async (error) => {
            // TODO: Notify user about updating permission in browser
            console.warn(
                "Geolocation permission denied. Falling back to IP-based location."
            );
            if (error) console.error(error);
            return this.getLocationFromIP();
        };

        try {
            const permission = await navigator.permissions.query({
                name: "geolocation",
            });
            if (permission.state === "denied") {
                return fallback();
            }
            return new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        resolve(
                            await this.getCityDetail(
                                position.coords.latitude,
                                position.coords.longitude
                            )
                        );
                    },
                    async (error) => {
                        resolve(await fallback(error));
                    }
                );
            });
        } catch (error) {
            return fallback(error);
        }
    }
    static async getCityDetail(lat, lon) {
        const response = await fetch(
            AppConfig.reverseGeoCodingApiEndpoint(lat, lon)
        );
        const {
            name: city,
            state: region = "",
            country: country_code,
            lat: latitude,
            lon: longitude,
        } = (await response.json())[0];
        const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${country_code}`
        );
        const country = (await res.json())[0].name.common;
        return {
            city,
            region,
            country,
            country_code,
            latitude,
            longitude,
            time: Date.now(),
        };
    }
}

export { AppLocation };
