const htmlDataset = document.documentElement.dataset;

function getTheme() {
    return htmlDataset.theme;
}

function setTheme(weather) {
    let theme;
    const id = weather.id;
    if (id >= 200 && id < 300) {
        theme = "Thunderstorm";
    } else if (id >= 300 && id < 400) {
        theme = "Drizzle";
    } else if (id >= 500 && id < 600) {
        theme = "Rain";
    } else if (id >= 600 && id < 700) {
        theme = "Snow";
    } else if (id === 800) {
        theme = "Clear";
    } else if (id > 800 && id < 900) {
        theme = "Clouds";
    } else if (id >= 700 && id < 800) {
        theme = "Atmosphere";
    } else {
        theme = "Clear";
    }
    htmlDataset.theme = theme;
}

export { getTheme, setTheme };