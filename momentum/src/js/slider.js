import {getTimeOfDay} from './greeting';
import greetingTranslation from './greetingTranslation';
import state from './settings';

const body = document.querySelector('body');
const prevButton = document.querySelector('.slide-prev');
const nextButton = document.querySelector('.slide-next');
let randomNum = 1;
let flickrArr = [];

function getRandomNum() {
    randomNum = (Math.floor(Math.random() * 19) + 1);
    if(state.photoSource === 'github') {
        getLinkToImageGithub();
    }
    if(state.photoSource === 'flickr') {
        getArrOfImagesFlickr();
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
    if(state.photoSource === 'flickr') {
        if (randomNum < (flickrArr.length - 1)) randomNum += 1;
        else randomNum = 0;
        getLinkToImageFlickr();
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
    if(state.photoSource === 'flickr') {
        if (randomNum > 0) randomNum -= 1;
        else randomNum = flickrArr.length - 1;
        getLinkToImageFlickr();
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

async function getArrOfImagesFlickr() {
    getTimeOfDay();
    const timeOfDay = getTimeOfDay();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f7de9be494c0e9a26b401e653f1bdec&tags=${greetingTranslation[timeOfDay].img},nature&extras=url_l&format=json&nojsoncallback=1?`;
    const res = await fetch(url);
    const data = await res.json();

    data.photos.photo.forEach(el => {
        if (el.url_l) flickrArr.push(el.url_l);
    })
    getLinkToImageFlickr();
}

function getLinkToImageFlickr() {
    const link = flickrArr[randomNum];
    setBg(link);
}

//getLinkToImageFlickr()
export function generateLink() {
    if(state.photoSource === 'github') {
        getLinkToImageGithub();
    }
    if(state.photoSource === 'unsplash') {
        getLinkToImageUnsplash();
    }
    if(state.photoSource === 'flickr') {
        getArrOfImagesFlickr();
    }
}

window.addEventListener('load', getRandomNum);
prevButton.addEventListener('click', getSlidePrev);
nextButton.addEventListener('click', getSlideNext);