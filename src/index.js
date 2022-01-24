import './css/styles.css';
import API from "./js/fetchCountries.js"
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const listEl = document.querySelector(".country-list");
const divEl = document.querySelector(".country-info");

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
    listEl.innerHTML = '';
    divEl.innerHTML = '';
    API.fetchCountries(searchQuery).then(
        data => {
                if (data.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    return;
                };
                if (data.length === 1) { renderCountryInfo(data) }
                else { renderCountryList(data) }
            })
    .catch(onFetchError);
}
function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function renderCountryInfo(data) {
       const countryInfo = `
    <p class="info"><img width="45px" src='${data[0].flags.svg}'/><span class="name">${data[0].name.official}</span></p>
    <p class="info">Capital:<span>${data[0].capital}</span></p>
    <p class="info">Population:<span>${data[0].population}</span></p>
    <p class="info">Languages:<span>${Object.values(data[0].languages)}</span></p>
    `;
    divEl.innerHTML = countryInfo;
}
function renderCountryList(data) {
    const countriesList = data.map(item => `<li><img width="25px" src='${item.flags.svg}'><span>${item.name.common}</span></li>`).join('');
    listEl.innerHTML = countriesList;
}