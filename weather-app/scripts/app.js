const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const detailsForecast = document.querySelector('.details-forecast');
const forecast12 = document.querySelector('.forecast12');
//const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const locationName = document.querySelector('.location-text');

const updateUI = data => {
    // Destructuring data
    const { cityDetails, weather, forecast, forecastHrs } = data;
    console.log('forecastHrs', forecastHrs);

    // Update location
    locationName.innerHTML = `${cityDetails.EnglishName}`;

    // Update 12 hr forecast
    let forecastHrsHtml = '';
    forecastHrs.forEach(day => {
        const today = new Date(day.DateTime);


        forecastHrsHtml += `<div class="row">
            <div class="col">
                <p>${today.getHours()}</p>
                <img src="images/icons/${day.WeatherIcon}.svg" />
                <span>${day.Temperature.Value}${day.Temperature.Unit}</span>
                <span>${day.IconPhrase}</span>
            </div>
        </div>`;
        forecast12.innerHTML = forecastHrsHtml;
    });


    // Update current weather
    details.innerHTML = `
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    // Update forecast details
    detailsForecast.innerHTML = `
        <div class="my-3">${forecast['Headline'].Text}</div>
        <div class="display-4 my-4">
            <span>Daytime High: ${forecast.DailyForecasts[0]['Temperature']['Maximum'].Value}&deg;F</span>
            <span>Daytime Low: ${forecast.DailyForecasts[0]['Temperature']['Minimum'].Value}&deg;F</span>
        </div>
    `;

    // Update night and day icon imgs
    const iconSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    /* let timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg';

    time.setAttribute('src', timeSrc); */

    // Remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async city => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    const forecast = await get1DayForecast(cityDetails.Key);
    const forecastHrs = await get12hrsForcast(cityDetails.Key);

    return { cityDetails, weather, forecast, forecastHrs };
};

cityForm.addEventListener('submit', e => {
    // Prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});