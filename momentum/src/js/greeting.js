const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

export function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent =  greetingText;
}

export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 5 && hours < 12) return 'morning';
    else if (hours > 11 && hours < 18) return 'afternoon';
    else if (hours > 17 && hours <= 23) return 'evening';
    else if (hours >= 0 && hours < 6) return 'night';
}

export function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

export function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);