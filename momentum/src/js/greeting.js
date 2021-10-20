const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

export default function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent =  greetingText;
}

function getTimeOfDay(hours) {
    if (hours > 5 && hours < 12) return 'morning';
    else if (hours > 11 && hours < 18) return 'afternoon';
    else if (hours > 17 && hours < 0) return 'evening';
    else if (hours > 23 && hours < 6) return 'night';
}

export function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

export function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
}

