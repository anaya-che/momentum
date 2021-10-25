import {getTimeOfDay} from './greeting';
import greetingTranslation from './greetingTranslation';
import state from './settings';

const body = document.querySelector('body');
const prevButton = document.querySelector('.slide-prev');
const nextButton = document.querySelector('.slide-next');
let randomNum;

function getRandomNum() {
    if(state.photoSource === 'github') {
        randomNum = (Math.floor(Math.random() * 19) + 1);
        
        getLinkToImageGithub();
    }
}

function setBg(link) {
    const img = new Image();
    img.src = link;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(${img.src})`
    })
}

function getSlideNext() {
    if(state.photoSource === 'github') {
        if (randomNum < 20) randomNum += 1;
        else randomNum = 1;
        getLinkToImageGithub();
    }
    if (state.photoSource === 'unsplash') {
        getLinkToImageUnsplash();
    }
}

function getSlidePrev() {
    if(state.photoSource === 'github') {
        if (randomNum > 1) randomNum -= 1;
        else randomNum = 20;
        getLinkToImageGithub();
    }
    if (state.photoSource === 'unsplash') {
        getLinkToImageUnsplash();
    }
}

function getLinkToImageGithub() {
    getTimeOfDay();
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const link = `https://raw.githubusercontent.com/anaya-che/stage1-tasks/assets/images/${greetingTranslation[timeOfDay].img}/${bgNum}.jpg`
    setBg(link);
}

async function getLinkToImageUnsplash() {
    getTimeOfDay();
    const timeOfDay = getTimeOfDay();
    const url =  `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&query=${greetingTranslation[timeOfDay].img}&client_id=ag5GzFeoRx2BsEcL2mUX-XHbxlaWagjNHWsI1W4BTW4`;
    const res = await fetch(url);
    const data = await res.json();
    const link = data.urls.regular;
    setBg(link);
}

export function generateLink() {
    if(state.photoSource === 'github') {
        getLinkToImageGithub();
    }
    if(state.photoSource === 'unsplash') {
        getLinkToImageUnsplash();
    }
}

window.addEventListener('load', getRandomNum);
prevButton.addEventListener('click', getSlidePrev);
nextButton.addEventListener('click', getSlideNext);