import Notiflix from 'notiflix';

export const fetchCountries = function (name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name', {
          timeout: 1500,
          width: '480px',
          fontSize: '26px',
          position: 'center-top',
          distance: '20px',
        });
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};
