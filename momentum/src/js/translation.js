import state from './settings';
import {getQuotes} from './quote';
import {showTime} from './time';
import {getWeather} from './weather';

const ruButton = document.querySelector('.button-ru');
const engButton = document.querySelector('.button-en');
const langTitle = document.querySelector('.lang-title');
const name = document.querySelector('.name');
const sourceTitle = document.querySelector('.source-title');
const blocksTitle = document.querySelector('.blocks-title');

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
        ruButton.classList.add('active');
        engButton.classList.remove('active');
        state.language = 'ru';
        langTitle.textContent = 'Язык:'
        sourceTitle.textContent = 'Фото ресурс:'
        blocksTitle.textContent = 'Блоки:'
        name.placeholder = `[Введите имя]`
    }
    else {
        engButton.classList.add('active');
        ruButton.classList.remove('active');
        state.language = 'en';
        langTitle.textContent = 'Language:'
        sourceTitle.textContent = 'Photo Source:'
        blocksTitle.textContent = 'Blocks:'
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
        ruButton.classList.add('active');
    }
    else {
        engButton.classList.add('active');
    }
}

ruButton.addEventListener('click', setLanguage);
engButton.addEventListener('click', setLanguage);
window.addEventListener('load', translatePage);

getLang();