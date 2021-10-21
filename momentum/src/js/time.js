import {showGreeting} from './greeting';

const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
    const newDate = new Date();
    const currentTime = newDate.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const newDate = new Date();
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currentDate = newDate.toLocaleDateString('en-US', options);
    date.textContent = currentDate;
}

showTime();