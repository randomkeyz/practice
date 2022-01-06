const key = 'wbFUoVLd7HKYgbHrioWXsg5nhET2Y2ay';

//get weather info
const getWeather = async id => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city info
const getCity = async city => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get 1 day forecast
const get1DayForecast = async city => {
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
    const q = `${city}?apikey=${key}`;

    const response = await fetch(base + q);
    const data = await response.json();

    return data;
};

// get 12 hrs forecast
const get12hrsForcast = async city => {

    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
    const q = `${city}?apikey=${key}`;

    const response = await fetch(base + q);
    const data = await response.json();

    return data;

};

/* getCity('Chicago').then(data => {
    return getWeather(data.Key);    
}).then(data => {
    console.log(data);
}).catch(err => console.log(err));

getWeather(348308); */