import state from './settings';
import greetingTranslation from './greetingTranslation';

const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

export function showGreeting() {
    const timeOfDay = getTimeOfDay();
    if (state.language === 'ru') {
        greeting.textContent = greetingTranslation[timeOfDay].ru;
    }
    else greeting.textContent = greetingTranslation[timeOfDay].en;
}

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) return 0;
    else if (hours > 11 && hours < 18) return 1;
    else if (hours > 17 && hours <= 23) return 2;
    else if (hours >= 0 && hours < 6) return 3;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);