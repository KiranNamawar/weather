// this file is for helping develop ui by mocking api responses

function mockCurrentWeather() {
    // Endpoint: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}
    return {
        // Geographic coordinates of the location
        coord: {
            // Longitude of the location (degrees)
            lon: 7.367,
            // Latitude of the location (degrees)
            lat: 45.133,
        },
        // Weather conditions array (can contain multiple conditions)
        weather: [
            {
                // Weather condition id (numeric code)
                id: 501,
                // Group of weather parameters (Rain, Snow, Clouds, etc.)
                main: "Rain",
                // Weather condition within the group (localized by lang)
                description: "moderate rain",
                // Weather icon id
                icon: "10d",
            },
        ],
        // Internal parameter (station network)
        base: "stations",
        // Main atmospheric data
        main: {
            // Temperature (Default: Kelvin; Metric: Celsius; Imperial: Fahrenheit)
            temp: 284.2,
            // Human-perceived temperature (same units as temp)
            feels_like: 282.93,
            // Minimum temperature at the moment (same units as temp)
            temp_min: 283.06,
            // Maximum temperature at the moment (same units as temp)
            temp_max: 286.82,
            // Atmospheric pressure at sea level (hPa)
            pressure: 1021,
            // Humidity (%)
            humidity: 60,
            // Sea level pressure, if available (hPa)
            sea_level: 1021,
            // Ground level pressure, if available (hPa)
            grnd_level: 910,
        },
        // Visibility in meters (max 10,000)
        visibility: 10000,
        // Wind information
        wind: {
            // Wind speed (Default/Metric: m/s; Imperial: miles/hour)
            speed: 4.09,
            // Wind direction (degrees, meteorological)
            deg: 121,
            // Wind gust (same units as speed)
            gust: 3.47,
        },
        // Precipitation volume
        rain: {
            // Rain volume for the last 1 hour (mm)
            "1h": 2.73,
        },
        // Cloudiness
        clouds: {
            // Cloudiness (% of sky covered)
            all: 83,
        },
        // Time of data calculation (Unix, UTC)
        dt: 1726660758,
        // Additional system data
        sys: {
            // Internal parameter
            type: 1,
            // Internal parameter
            id: 6736,
            // Country code (e.g., US, IN)
            country: "IT",
            // Sunrise time (Unix, UTC)
            sunrise: 1726636384,
            // Sunset time (Unix, UTC)
            sunset: 1726680975,
        },
        // Shift in seconds from UTC
        timezone: 7200,
        // City ID
        id: 3165523,
        // City name
        name: "Province of Turin",
        // Internal response code
        cod: 200,
    };
}

function mockForecastWeather() {
    // Endpoint: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}
    return {
        // Internal response code as string ("200" on success)
        cod: "200",
        // Internal message (can be used for debug; often 0)
        message: 0,
        // Number of forecast timestamps returned
        cnt: 40,
        // Forecast entries at 3-hour steps
        list: [
            {
                // Forecast time (Unix, UTC)
                dt: 1661871600,
                // Main forecasted atmospheric data
                main: {
                    // Temperature (Default: Kelvin; Metric: Celsius; Imperial: Fahrenheit)
                    temp: 296.76,
                    // Human-perceived temperature (same units as temp)
                    feels_like: 296.98,
                    // Minimum temperature for the time (same units as temp)
                    temp_min: 296.76,
                    // Maximum temperature for the time (same units as temp)
                    temp_max: 297.87,
                    // Atmospheric pressure at sea level (hPa)
                    pressure: 1015,
                    // Sea level pressure, if available (hPa)
                    sea_level: 1015,
                    // Ground level pressure, if available (hPa)
                    grnd_level: 933,
                    // Humidity (%)
                    humidity: 69,
                    // Internal temp adjustment parameter
                    temp_kf: -1.11,
                },
                // Weather condition(s)
                weather: [
                    {
                        // Weather condition id (numeric code)
                        id: 500,
                        // Group of weather parameters (Rain, Snow, Clouds, etc.)
                        main: "Rain",
                        // Weather condition within the group (localized by lang)
                        description: "light rain",
                        // Weather icon id
                        icon: "10d",
                    },
                ],
                // Cloudiness
                clouds: {
                    // Cloudiness (% of sky covered)
                    all: 100,
                },
                // Wind information
                wind: {
                    // Wind speed (Default/Metric: m/s; Imperial: miles/hour)
                    speed: 0.62,
                    // Wind direction (degrees, meteorological)
                    deg: 349,
                    // Wind gust (same units as speed)
                    gust: 1.18,
                },
                // Average visibility in meters (max 10,000)
                visibility: 10000,
                // Probability of precipitation (0..1)
                pop: 0.32,
                // Precipitation forecast
                rain: {
                    // Rain volume for the last 3 hours (mm)
                    "3h": 0.26,
                },
                // Part of day: d = day, n = night
                sys: {
                    pod: "d",
                },
                // Forecast time (ISO 8601, UTC)
                dt_txt: "2022-08-30 15:00:00",
            },
            {
                // Forecast time (Unix, UTC)
                dt: 1661882400,
                // Main forecasted atmospheric data
                main: {
                    // Temperature (Default: Kelvin; Metric: Celsius; Imperial: Fahrenheit)
                    temp: 295.45,
                    // Human-perceived temperature (same units as temp)
                    feels_like: 295.59,
                    // Minimum temperature for the time (same units as temp)
                    temp_min: 292.84,
                    // Maximum temperature for the time (same units as temp)
                    temp_max: 295.45,
                    // Atmospheric pressure at sea level (hPa)
                    pressure: 1015,
                    // Sea level pressure, if available (hPa)
                    sea_level: 1015,
                    // Ground level pressure, if available (hPa)
                    grnd_level: 931,
                    // Humidity (%)
                    humidity: 71,
                    // Internal temp adjustment parameter
                    temp_kf: 2.61,
                },
                // Weather condition(s)
                weather: [
                    {
                        // Weather condition id (numeric code)
                        id: 500,
                        // Group of weather parameters (Rain, Snow, Clouds, etc.)
                        main: "Rain",
                        // Weather condition within the group (localized by lang)
                        description: "light rain",
                        // Weather icon id
                        icon: "10n",
                    },
                ],
                // Cloudiness
                clouds: {
                    // Cloudiness (% of sky covered)
                    all: 96,
                },
                // Wind information
                wind: {
                    // Wind speed (Default/Metric: m/s; Imperial: miles/hour)
                    speed: 1.97,
                    // Wind direction (degrees, meteorological)
                    deg: 157,
                    // Wind gust (same units as speed)
                    gust: 3.39,
                },
                // Average visibility in meters (max 10,000)
                visibility: 10000,
                // Probability of precipitation (0..1)
                pop: 0.33,
                // Precipitation forecast
                rain: {
                    // Rain volume for the last 3 hours (mm)
                    "3h": 0.57,
                },
                // Part of day: d = day, n = night
                sys: {
                    pod: "n",
                },
                // Forecast time (ISO 8601, UTC)
                dt_txt: "2022-08-30 18:00:00",
            },
            {
                // Forecast time (Unix, UTC)
                dt: 1661893200,
                // Main forecasted atmospheric data
                main: {
                    // Temperature (Default: Kelvin; Metric: Celsius; Imperial: Fahrenheit)
                    temp: 292.46,
                    // Human-perceived temperature (same units as temp)
                    feels_like: 292.54,
                    // Minimum temperature for the time (same units as temp)
                    temp_min: 290.31,
                    // Maximum temperature for the time (same units as temp)
                    temp_max: 292.46,
                    // Atmospheric pressure at sea level (hPa)
                    pressure: 1015,
                    // Sea level pressure, if available (hPa)
                    sea_level: 1015,
                    // Ground level pressure, if available (hPa)
                    grnd_level: 931,
                    // Humidity (%)
                    humidity: 80,
                    // Internal temp adjustment parameter
                    temp_kf: 2.15,
                },
                // Weather condition(s)
                weather: [
                    {
                        // Weather condition id (numeric code)
                        id: 500,
                        // Group of weather parameters (Rain, Snow, Clouds, etc.)
                        main: "Rain",
                        // Weather condition within the group (localized by lang)
                        description: "light rain",
                        // Weather icon id
                        icon: "10n",
                    },
                ],
                // Cloudiness
                clouds: {
                    // Cloudiness (% of sky covered)
                    all: 68,
                },
                // Wind information
                wind: {
                    // Wind speed (Default/Metric: m/s; Imperial: miles/hour)
                    speed: 2.66,
                    // Wind direction (degrees, meteorological)
                    deg: 210,
                    // Wind gust (same units as speed)
                    gust: 3.58,
                },
                // Average visibility in meters (max 10,000)
                visibility: 10000,
                // Probability of precipitation (0..1)
                pop: 0.7,
                // Precipitation forecast
                rain: {
                    // Rain volume for the last 3 hours (mm)
                    "3h": 0.49,
                },
                // Part of day: d = day, n = night
                sys: {
                    pod: "n",
                },
                // Forecast time (ISO 8601, UTC)
                dt_txt: "2022-08-30 21:00:00",
            },
            // ....
            {
                // Forecast time (Unix, UTC)
                dt: 1662292800,
                // Main forecasted atmospheric data
                main: {
                    // Temperature (Default: Kelvin; Metric: Celsius; Imperial: Fahrenheit)
                    temp: 294.93,
                    // Human-perceived temperature (same units as temp)
                    feels_like: 294.83,
                    // Minimum temperature for the time (same units as temp)
                    temp_min: 294.93,
                    // Maximum temperature for the time (same units as temp)
                    temp_max: 294.93,
                    // Atmospheric pressure at sea level (hPa)
                    pressure: 1018,
                    // Sea level pressure, if available (hPa)
                    sea_level: 1018,
                    // Ground level pressure, if available (hPa)
                    grnd_level: 935,
                    // Humidity (%)
                    humidity: 64,
                    // Internal temp adjustment parameter
                    temp_kf: 0,
                },
                // Weather condition(s)
                weather: [
                    {
                        // Weather condition id (numeric code)
                        id: 804,
                        // Group of weather parameters (Rain, Snow, Clouds, etc.)
                        main: "Clouds",
                        // Weather condition within the group (localized by lang)
                        description: "overcast clouds",
                        // Weather icon id
                        icon: "04d",
                    },
                ],
                // Cloudiness
                clouds: {
                    // Cloudiness (% of sky covered)
                    all: 88,
                },
                // Wind information
                wind: {
                    // Wind speed (Default/Metric: m/s; Imperial: miles/hour)
                    speed: 1.14,
                    // Wind direction (degrees, meteorological)
                    deg: 17,
                    // Wind gust (same units as speed)
                    gust: 1.57,
                },
                // Average visibility in meters (max 10,000)
                visibility: 10000,
                // Probability of precipitation (0..1)
                pop: 0,
                // Part of day: d = day, n = night
                sys: {
                    pod: "d",
                },
                // Forecast time (ISO 8601, UTC)
                dt_txt: "2022-09-04 12:00:00",
            },
        ],
        // City metadata for the forecast
        city: {
            // City ID
            id: 3163858,
            // City name
            name: "Zocca",
            // Geographic coordinates of the city
            coord: {
                // Latitude of the location (degrees)
                lat: 44.34,
                // Longitude of the location (degrees)
                lon: 10.99,
            },
            // Country code (e.g., US, IN)
            country: "IT",
            // City population
            population: 4593,
            // Shift in seconds from UTC
            timezone: 7200,
            // Sunrise time (Unix, UTC)
            sunrise: 1661834187,
            // Sunset time (Unix, UTC)
            sunset: 1661882248,
        },
    };
}

function mockAirPollution() {
    // Endpoint: http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
    return {
        // Coordinates of the requested location as [latitude, longitude]
        coord: [50, 50],
        // List of air pollution measurements (current/forecast/history)
        list: [
            {
                // Time of the measurement (Unix, UTC)
                dt: 1605182400,
                // Air Quality Index (1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor)
                main: {
                    aqi: 1,
                },
                // Pollutant concentrations (micrograms per cubic meter, µg/m3)
                components: {
                    // Carbon monoxide (CO)
                    co: 201.94053649902344,
                    // Nitrogen monoxide (NO)
                    no: 0.01877197064459324,
                    // Nitrogen dioxide (NO2)
                    no2: 0.7711350917816162,
                    // Ozone (O3)
                    o3: 68.66455078125,
                    // Sulphur dioxide (SO2)
                    so2: 0.6407499313354492,
                    // Fine particulate matter (PM2.5)
                    pm2_5: 0.5,
                    // Coarse particulate matter (PM10)
                    pm10: 0.540438711643219,
                    // Ammonia (NH3)
                    nh3: 0.12369127571582794,
                },
            },
        ],
    };
}

function mockLocation() {
    // Endpoint: http://ip-api.com/json/
    return {
        status: "success",
        country: "India",
        countryCode: "IN",
        region: "MH",
        regionName: "Maharashtra",
        city: "Aurangabad",
        zip: "431001",
        lat: 19.8776,
        lon: 75.3423,
        timezone: "Asia/Kolkata",
        isp: "Reliance Jio Infocomm Limited",
        org: "Reliance Jio Infocomm Limited",
        as: "AS55836 Reliance Jio Infocomm Limited",
        query: "152.56.6.5",
    };
}
