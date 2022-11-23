//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchCountry = async (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`
    try {
    const res = await fetch(url);
    if (!res.ok) {
        renderError(`Something went wrong:${res.status}`)
        throw new Error()
    }
    const data = await res.json();
    // console.log(data[0]);
    renderCountry(data[0]);

    } catch (error) {
        console.log(error)
    }
}

const renderError = (err) => {
    const countriesDiv = document.querySelector('.countries');

    countriesDiv.innerHTML = `
    <h1 class="text-danger">${err}</h1>
    <img width="50%" src="./img/404.png" alt="404" />
    `;
}

const renderCountry = (country) => {
    // console.log(country)
    const countriesDiv = document.querySelector('.countries');

    //!destr
    const { 
        capital, 
        name : { common }, 
        region,
        flags : { svg },
        languages,
        currencies 
    } = country;

    countriesDiv.innerHTML += `
    <div class="card shadow-lg" style="width: 18rem;">
          <img src="${svg}" class="card-img-top" alt="${common}">
          <div class="card-body">
            <h5 class="card-title">${common}</h5>
            <p class="card-text">${region}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><i class="fas fa-lg fa-landmark"></i> ${capital}</li>
            <li class="list-group-item"><i class="fas fa-lg fa-comments"></i> ${Object.values(languages).join(", ")}</li>
            <li class="list-group-item"><i class="fas fa-lg fa-money-bill-wave"></i> ${Object.values(currencies)[0].name} ${Object.values(currencies)[0].symbol}</li>
          </ul>
        </div>`
    // console.log(capital, common, region, svg)
    // console.log(Object.values(languages))
    // console.log(Object.values(currencies)[0].name)
    // console.log(Object.values(currencies)[0].symbol)
}

fetchCountry('turkey');
fetchCountry("usa");
fetchCountry('france')
fetchCountry('belgium')