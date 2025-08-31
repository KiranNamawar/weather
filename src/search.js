import { AppConfig } from "./config";

const dialog = document.querySelector("dialog#search");
const form = dialog.querySelector("form");
const input = dialog.querySelector('input[type="search"]');
const result = dialog.querySelector("ul#search-results");

let prevSearches = [];
const STORAGE_KEY = "previousSearches";

function loadPrevSearches() {
    // load history from local storage
    prevSearches = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

function savePrevSearches(data) {
    // save history to local storage
    let exists = false;
    const temp = prevSearches.map((item) => {
        if (
            item.city === data.city &&
            item.region === data.region &&
            item.country === data.country
        ) {
            exists = true;
            return { ...item, time: data.time };
        }
        return item;
    });
    if (!exists) {
        temp.push(data);
    }
    prevSearches = temp.sort((a, b) => b.time - a.time);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prevSearches));
}

function renderResult(data) {
    result.innerHTML = "";
    data.forEach((item) => {
        const info = encodeURIComponent(JSON.stringify(item));
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <button type="submit" data-info="${info}" class="w-full">
                <span class="font-bold">${item.city}</span>
                <span>${item.region ?? ""}, ${item.country ?? ""}</span>
            </button>
        `;
        result.appendChild(listItem);
    });
}

function renderPrevSearches() {
    const prevList = dialog.querySelector("ul#previous-searches");
    prevList.innerHTML = "";
    if (prevSearches.length) {
        prevSearches.forEach((item) => {
            const info = encodeURIComponent(JSON.stringify(item));
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <button type="submit" data-info="${info}" class="">
                    <span>${item.city}</span>
                    <span>${item.region ?? ""}, ${item.country ?? ""}</span>
                </button>
            `;
            prevList.appendChild(listItem);
        });
    }
}

function openSearch() {
    return new Promise((resolve) => {
        result.innerHTML = "";
        const spinner = form.querySelector('span.absolute');
        let timer;
        function handleInput() {
            clearTimeout(timer);
            const value = input.value.trim();
            if (value.length < 2) {
                result.innerHTML = "";
                spinner.hidden = true;
                return;
            }
            timer = setTimeout(async () => {
                spinner.hidden = false;
                try {
                const res = await fetch(AppConfig.geocodingApiEndpoint(value));
                if (!res.ok) {
                    throw new Error("API error: " + res.statusText);
                }
                const list = (await res.json()).results;
                if (!list || !list.length) {
                    result.innerHTML = "<li>No results found</li>";
                    spinner.hidden = true;
                    return;
                }
                const data = list.map((item) => {
                    const {
                        name: city,
                        latitude,
                        longitude,
                        admin1: region,
                        country,
                    } = item;
                    return { city, latitude, longitude, region, country };
                });
                renderResult(data);
            } catch (error) {
                console.error("Error loading search results:", error);
                result.innerHTML = "<li>Error loading search results, please try again later.</li>";
            } finally {
                spinner.hidden = true;
            }
        }, 300);
    }
    input.addEventListener("input", handleInput);

        loadPrevSearches();
        renderPrevSearches();

        form.addEventListener(
            "submit",
            (evt) => {
                const button = evt.submitter;
                const data = JSON.parse(
                    decodeURIComponent(button.dataset.info)
                );
                savePrevSearches({ ...data, time: Date.now() });
                resolve({ longitude: data.longitude, latitude: data.latitude });
            },
            { once: true }
        );

        function closeDialog() {
            form.removeEventListener("input", handleInput);
            form.reset();
            resolve(null);
            dialog.close();
        }

        dialog.addEventListener("close", closeDialog, { once: true });
        form.querySelector("button#close-search").addEventListener(
            "click",
            closeDialog,
            { once: true }
        );

        dialog.showModal();
        input.focus();
    });
}

export { openSearch };

//Test
const button = document.querySelector("dialog + button");
button.onclick = async () => {
    const result = await openSearch();
    if (result) {
        console.log("Selected location:", result);
    } else {
        console.log("Search canceled");
    }
};
