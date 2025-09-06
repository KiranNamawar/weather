import AppWeather from "./models/weather.js";

async function getData(getLocation) {
    const location = await getLocation();
    if (!location) return null;
    const weather = await AppWeather.getCurrentWeather(
        location.latitude,
        location.longitude
    );
    const forecast = await AppWeather.getWeatherForecast(
        location.latitude,
        location.longitude
    );
    return { location, weather, forecast };
}
export { getData };