import { AppConfig } from "./config.js";

class AppLocation {
    static async getLocationFromIP() {
        const response = await fetch(AppConfig.IP_API_ENDPOINT);
        if (!response.ok) {
            throw new Error("Failed to fetch location from IP.");
        }
        const data = await response.json();
        const [latitude, longitude] = data.loc.split(",").map(Number);
        return { latitude, longitude };
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
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
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
}

export { AppLocation };
