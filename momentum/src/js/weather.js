const apiKey = `ced6a511c26cbbcbf6901ebfa65d488e`;
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
    getLocalStorage();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=ced6a511c26cbbcbf6901ebfa65d488e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    try {
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
    }
    
    catch(err) {
        weatherError.textContent = `Error! ${data.message} for '${city.value}'`;
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }
}

function setCity(event) {
    if (event.code === 'Enter' || event.type === 'blur') {
        setLocalStorage();
        getWeather();
        city.blur();
    }
}

function setLocalStorage() {
    localStorage.setItem('city', city.value);
}

function getLocalStorage() {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
document.addEventListener('load', getWeather);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);