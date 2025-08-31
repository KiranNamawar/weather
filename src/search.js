import {AppConfig} from "./config";

const dialog = document.querySelector('dialog#search');
const form = dialog.querySelector('form');
const input = dialog.querySelector('input[type="search"]')
const result = dialog.querySelector('#search-results');
const prev = dialog.querySelector('#previous-searches');

let history = [];
const STORAGE_KEY = 'previousSearches';

function load() {
    // load history from local storage
    history = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
}

function save() {
    // save history to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function openSearch() {
    return new Promise(resolve => {
        let timer;
        input.addEventListener('input', () => {
            clearTimeout(timer);
            result.innerHTML = "";
            const value = input.value.trim();
            if (value.length < 2) return;
            let data = null;
            timer = setTimeout(async () => {
                const res = await fetch(AppConfig.geocodingApiEndpoint(value));
                data = await res.json();
            }, 300)
            if (!data || !data.length) return;
            // TODO: Render search results
        })

        // Previous Searches
        load();
        // TODO: render previous searches

        dialog.showModal()
    })
}


export {openSearch};

//Test
const button = document.querySelector('button');
button.onclick = openSearch;