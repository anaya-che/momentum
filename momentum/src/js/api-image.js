import state from './settings';
import {generateLink} from './slider';

const githubButton = document.getElementById('github');
const unsplashButton = document.getElementById('unsplash');
const flickrButton = document.getElementById('flickr');
const sourceButtons =  document.querySelectorAll('.source-button');

function setImgSource(event) {
    if (event.target.id === 'github') {
        state.photoSource = 'github';
    }
    else if (event.target.id === 'unsplash') {
        state.photoSource = 'unsplash';
    }
    else if (event.target.id === 'flickr'){
        state.photoSource = 'flickr';
    }

    setLocalStorage();
    geImgSource();
}

function setLocalStorage() {
    localStorage.setItem('photoSource', state.photoSource);
}

function getLocalStorage() {
    if(localStorage.getItem('photoSource')) {
        state.photoSource = localStorage.getItem('photoSource');
    }
    else setLocalStorage();
}

function geImgSource() {
    getLocalStorage();
    sourceButtons.forEach(el => {
        if (el.id === state.photoSource) {
            el.classList.add('active');
        }
        else el.classList.remove('active');
    });
    generateLink();
}

githubButton.addEventListener('click', setImgSource);
unsplashButton.addEventListener('click', setImgSource);
flickrButton.addEventListener('click', setImgSource);
window.addEventListener('load', getLocalStorage);

geImgSource();