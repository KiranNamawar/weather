import AppConfig from "./models/config.js";

const dialog = document.querySelector("dialog#search");
const form = dialog.querySelector("form");
const input = dialog.querySelector('input[type="search"]');
const result = dialog.querySelector("ul#search-results");

const recentSelect = document.querySelector("select#recent");

let prevSearches = [];
const STORAGE_KEY = "previousSearches";

function loadPrevSearches() {
    // load history from local storage
    prevSearches = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    renderRecentSelect();
}

function renderRecentSelect() {
    // Clear existing options except the first one (disabled placeholder)
    while (recentSelect.children.length > 1) {
        recentSelect.removeChild(recentSelect.lastChild);
    }

    if (prevSearches.length === 0) {
        // Hide the select when there are no recent searches
        recentSelect.style.display = "none";
    } else {
        // Show the select and populate with recent searches
        recentSelect.style.display = "block";
        prevSearches.forEach((item) => {
            const option = document.createElement("option");
            option.value = encodeURIComponent(JSON.stringify(item));
            option.textContent = `${item.city}, ${item.country}`;
            recentSelect.appendChild(option);
        });
    }
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
        if (temp.length >= 5) temp.pop();
        temp.push(data);
    }
    prevSearches = temp.sort((a, b) => b.time - a.time);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prevSearches));
    renderRecentSelect();
}

function renderResult(data) {
    result.innerHTML = "";
    data.forEach((item) => {
        const info = encodeURIComponent(JSON.stringify(item));
        const listItem = document.createElement("li");
        listItem.classList.add("w-full");
        listItem.innerHTML = `
            <button type="submit" data-info="${info}" class="w-full grid grid-cols-[32px_1fr] gap-x-4 rounded-2xl px-10 py-1 items-center">
                <img src="https://flagsapi.com/${
                    item.country_code
                }/flat/32.png" class="row-span-2">
                <span class="font-bold text-left">${item.city}</span>
                <span class="text-left">${item.region ?? ""}, ${
            item.country ?? ""
        }</span>
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
                <button type="submit" data-info="${info}" class="flex border rounded-2xl w-full gap-2 px-4 py-1 items-center">
                    <img src="https://flagsapi.com/${item.country_code}/flat/32.png">
                    <span>${item.city}</span>
                </button>
            `;
            prevList.appendChild(listItem);
        });
    }
}

function openSearch() {
    return new Promise((resolve) => {
        result.innerHTML = "";
        const spinner = form.querySelector("span.absolute");
        let timer;
        function handleInput() {
            clearTimeout(timer);
            const value = input.value.trim();
            if (value.length < 2) {
                result.innerHTML = "<p>Minimum 2 characters required</p>";
                spinner.hidden = true;
                return;
            }
            timer = setTimeout(async () => {
                spinner.hidden = false;
                try {
                    const res = await fetch(
                        AppConfig.geocodingApiEndpoint(value)
                    );
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
                            country_code,
                            id,
                        } = item;
                        return {
                            city,
                            region,
                            country,
                            country_code,
                            latitude,
                            longitude,
                        };
                    });
                    renderResult(data);
                } catch (error) {
                    console.error("Error loading search results:", error);
                    result.innerHTML =
                        // TODO: Show toast
                        "<li>Error loading search results, please try again later.</li>";
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
                const parsed = JSON.parse(
                    decodeURIComponent(button.dataset.info)
                );
                const data = { ...parsed, time: Date.now() };
                savePrevSearches(data);
                resolve(data);
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

function setupRecentSelectHandler(onLocationSelect) {
    recentSelect.addEventListener("change", (evt) => {
        const selectedValue = evt.target.value;
        if (selectedValue) {
            const locationData = JSON.parse(decodeURIComponent(selectedValue));
            const data = { ...locationData, time: Date.now() };
            savePrevSearches(data);

            // Reset the select to the placeholder
            evt.target.value = "";

            // Call the callback with the selected location
            onLocationSelect(data);
        }
    });
}

function initializeRecentSelect() {
    loadPrevSearches();
}

export { openSearch, setupRecentSelectHandler, initializeRecentSelect };
