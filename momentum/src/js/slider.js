import {getTimeOfDay} from './greeting';

const body = document.querySelector('body');
const prevButton = document.querySelector('.slide-prev');
const nextButton = document.querySelector('.slide-next');
let randomNum;

function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 19) + 1);
}

function setBg() {
    getTimeOfDay();
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/anaya-che/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`
    })
}

function getSlideNext() {
    if (randomNum < 20) randomNum += 1;
    else randomNum = 1;
    setBg();
}

function getSlidePrev() {
    if (randomNum > 1) randomNum -= 1;
    else randomNum = 20;
    setBg();
}

window.addEventListener('load', getRandomNum);
window.addEventListener('load', setBg);
prevButton.addEventListener('click', getSlidePrev);
nextButton.addEventListener('click', getSlideNext);