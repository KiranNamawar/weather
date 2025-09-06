const htmlDataset = document.documentElement.dataset;

// Weather condition mappings based on OpenWeatherMap API
const WEATHER_CONDITIONS = {
    // Thunderstorm group: 2xx
    THUNDERSTORM: {
        min: 200,
        max: 299,
        theme: "Thunderstorm",
        icon: "🌩️",
    },
    // Drizzle group: 3xx
    DRIZZLE: { min: 300, max: 399, theme: "Drizzle", icon: "🌦️" },
    // Rain group: 5xx
    RAIN: { min: 500, max: 599, theme: "Rain", icon: "🌧️" },
    // Snow group: 6xx
    SNOW: { min: 600, max: 699, theme: "Snow", icon: "❄️" },
    // Atmosphere group: 7xx
    ATMOSPHERE: { min: 700, max: 799, theme: "Atmosphere", icon: "🌫️" },
    // Clear sky: 800
    CLEAR: { min: 800, max: 800, theme: "Clear", icon: "☀️" },
    // Clouds group: 80x
    CLOUDS: { min: 801, max: 804, theme: "Clouds", icon: "☁️" },
};

function getTheme() {
    return htmlDataset.theme;
}

function getWeatherThemeAndIcon(weatherId) {
    for (const condition of Object.values(WEATHER_CONDITIONS)) {
        if (weatherId >= condition.min && weatherId <= condition.max) {
            return {
                theme: condition.theme,
                icon: condition.icon,
            };
        }
    }

    // Default fallback
    return { theme: "Clear", icon: "fa-sun" };
}

function isNightTime(weatherIcon) {
    return weatherIcon && weatherIcon.endsWith("n");
}

function setTheme(weather) {
    const { theme } = getWeatherThemeAndIcon(weather.id);

    htmlDataset.theme = theme;

    const isNight = isNightTime(weather.icon);
    htmlDataset.time = isNight ? "night" : "day";
}

function getThemeAndIcon(weather) {
    const { theme, icon } = getWeatherThemeAndIcon(weather.id);
    let finalIcon = icon;

    // Handle night variation for clear weather
    if (isNightTime(weather.icon) && theme === "Clear") {
        finalIcon = "🌙";
    }

    return {
        theme,
        icon: finalIcon,
    };
}

export { getTheme, setTheme, getThemeAndIcon };
