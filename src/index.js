import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  searchEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.searchEl.addEventListener('input', debounce(onSearchEl, DEBOUNCE_DELAY));

function onSearchEl(e) {
  const countryName = e.target.value.trim();
  if (countryName) {
    fetchCountries(countryName).then(country => {
      if (country.length === 1) {
        countryInfoMarkup(country);
      } else if (country.length >= 2 && country.length <= 10) {
        countriesListMarkup(country);
      } else if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            timeout: 1200,
            width: '480px',
            fontSize: '26px',
            position: 'center-top',
            distance: '20px',
          }
        );
      }
    });
  }
  refs.countryInfoEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';
}

function countriesListMarkup(countries) {
  const sortedCountries = [...countries].sort(
    ({ name: { common: countryNameA } }, { name: { common: countryNameB } }) =>
      countryNameA.localeCompare(countryNameB)
  );

  const markup = sortedCountries
    .map(
      ({ flags: { svg: flag }, name: { common: countryName } }) =>
        `<li class="country-list_item"><img class="flagImg" src="${flag}" alt="country flag"><img/> ${countryName}</li>`
    )
    .join('');

  refs.countryListEl.innerHTML = markup;
}

function countryInfoMarkup(country) {
  const {
    capital,
    population,
    languages,
    flags: { svg: flag },
    name: { common: countryName },
  } = country[0];

  refs.countryInfoEl.innerHTML = `<ul>
    <li class="country-list_item"><img class="flagImg" src="${flag}" alt="country flag"><img/> <span class="country-name">${countryName}</li>
    <li class="country-list_item">Capital: <span class="country-info">${capital}</span></li>
    <li class="country-list_item">Papulation: <span class="country-info">${population}</span></li>
    <li class="country-list_item">Languages: <span class="country-info">${Object.values(
      languages
    ).join(', ')}</span></li>
    </ul>`;
}
