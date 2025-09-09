const images = {
    clouds: "./images/clouds.jpg",
    clearDay: "./images/clear-day.jpg",
    clearNight: "./images/clear-night.jpg",
    rain: "./images/rain.jpg",
    snow: "./images/snow.jpg",
    thunderstorm: "./images/thunderstorm.jpg",
    drizzle: "./images/rain.jpg",
}

function setBackground(condition, isDay) {
    const body = document.body;
    if (condition.toLowerCase() === "clear") {
        body.style.backgroundImage = isDay
            ? `url(${images.clearDay})`
            : `url(${images.clearNight})`;
    } else {
        body.style.backgroundImage = `url(${images[condition.toLowerCase()]})`;
    }
    body.classList.add("bg-fixed");
}

export { setBackground };