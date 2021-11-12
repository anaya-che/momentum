import {showGreeting} from './greeting';
import state from './settings';

const time = document.querySelector('.time');
const date = document.querySelector('.date');

export function showTime() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const newDate = new Date();
    const options = {weekday:'long', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const currentDate = newDate.toLocaleDateString('en-US', options);
    if (state.language === 'ru') date.textContent = newDate.toLocaleDateString('ru-RU', options);
    else date.textContent = newDate.toLocaleDateString('en-US', options);
}

showTime();