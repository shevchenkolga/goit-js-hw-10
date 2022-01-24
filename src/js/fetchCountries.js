
function fetchCountries(name) { 
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`)
        .then(response => response.json());
}

export default { fetchCountries };