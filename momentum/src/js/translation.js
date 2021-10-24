import state from './settings';
import {getQuotes} from './quote';
import {showTime} from './time';
import {getWeather} from './weather';

const ruButton = document.querySelector('.button-ru');
const engButton = document.querySelector('.button-en');
const langTitle = document.querySelector('.lang-title');
const name = document.querySelector('.name');

function setLanguage(event) {
    if (event.target.id === 'ru') {
        state.language = 'ru';
    }
    else {
        state.language = 'en';
    }
    setLocalStorage();
    translatePage();
}

function translatePage() {
    getLocalStorage();
    if (state.language === 'ru') {
        ruButton.classList.add('active-lang');
        engButton.classList.remove('active-lang');
        state.language = 'ru';
        langTitle.textContent = 'Язык:'
        name.placeholder = `[Введите имя]`
    }
    else {
        engButton.classList.add('active-lang');
        ruButton.classList.remove('active-lang');
        state.language = 'en';
        langTitle.textContent = 'Language:'
        name.placeholder = `[Enter name]`
    }
    getQuotes();
    showTime();
    getWeather();
}

function setLocalStorage() {
    localStorage.setItem('language', state.language);
}

function getLocalStorage() {
    if(localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
    }
    else setLocalStorage();
}

function getLang() {
    getLocalStorage();
    if (state.language === 'ru') {
        ruButton.classList.add('active-lang');
    }
    else {
        engButton.classList.add('active-lang');
    }
}

ruButton.addEventListener('click', setLanguage);
engButton.addEventListener('click', setLanguage);
window.addEventListener('load', translatePage);

getLang();