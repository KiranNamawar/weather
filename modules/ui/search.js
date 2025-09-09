import { searchForCity } from "../api/location.js";

const dialog = document.getElementById("search-dialog");
const form = dialog.querySelector("form");
const input = form.querySelector("input[name='city']");
const loading = form.querySelector("#loading");
const resultsContainer = form.querySelector("#search-results");

function renderResult(data) {
    if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
    }
    resultsContainer.innerHTML = "";
    const list = document.createElement("ul");
    data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <button class="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left border border-transparent hover:border-gray-200" data-info="${encodeURIComponent(
                JSON.stringify(item)
            )}">
                <img class="w-8 h-6 object-cover rounded shadow-sm" src="https://flagsapi.com/${
                    item.country_code
                }/flat/32.png" alt="${item.country} flag">
                <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">${item.city}</p>
                    <p class="text-sm truncate">${item.state ?? ""}, ${
            item.country ?? ""
        }</p>
                </div>
            </button>
        `;
        list.appendChild(listItem);
    });
    resultsContainer.appendChild(list);
}

let timer;
function handleInput() {
    clearTimeout(timer);
    resultsContainer.innerHTML = "";

    const value = input.value.trim();
    if (value.length < 2) {
        resultsContainer.innerHTML =
            "<p>Please enter at least 2 characters</p>";
        loading.classList.add("hidden");
        return;
    }

    loading.classList.remove("hidden");
    timer = setTimeout(async () => {
        const results = await searchForCity(value);
        renderResult(results);
        loading.classList.add("hidden");
    }, 300);
}

function getLocationFromCity() {
    return new Promise((resolve) => {
        form.addEventListener("input", handleInput);
        form.addEventListener(
            "submit",
            (evt) => {
                const button = evt.submitter;
                const info = JSON.parse(
                    decodeURIComponent(button.dataset.info)
                );
                resolve(info);
            },
            { once: true }
        );

        form.querySelector("#close-search").addEventListener(
            "click",
            () => dialog.close(),
            { once: true }
        );

        function preventEnter(evt) {
            if (evt.key === "Enter") {
                evt.preventDefault();
                return;
            }
        }

        input.addEventListener("keydown", preventEnter);

        dialog.addEventListener(
            "close",
            () => {
                form.removeEventListener("input", handleInput);
                input.removeEventListener("keydown", preventEnter);
                form.reset();
                resultsContainer.innerHTML = "";
                loading.classList.add("hidden");
                clearTimeout(timer);
                resolve(null);
            },
            { once: true }
        );

        dialog.showModal();
        input.focus();
    });
}

export { getLocationFromCity };
