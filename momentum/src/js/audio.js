import playList from './playList.js';

const button = document.querySelector('.play');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();
let isPlay = false;
let playNum = 0;

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (isPlay) {
        audio.play();
    }
    else {
        audio.pause();
    }
}

function toggleBtn() {
    button.classList.toggle('pause');
    if (!isPlay) {
        isPlay = true;
    }
    else {
        isPlay = false;
    }
    playAudio();
    activeAudio();
}

function activeAudio() {
    document.querySelectorAll('.play-item').forEach((el, i) => {
        if(i !== playNum) {
            el.classList.remove('item-active');
        }
        else el.classList.add('item-active');
    })
}

function playIfPaused() {
    if (!isPlay) {
        toggleBtn();
    }
    else {
        playAudio();
        activeAudio();
    }
}

function playNext() {
    if(playNum < 4) {
        playNum += 1;
    }
    else {
        playNum = 0;
    }

    playIfPaused();
}


function playPrev() {
    if(playNum < 5 && playNum > 0) {
        playNum -= 1;
    }
    else {
        playNum = 4;
    }

    playIfPaused();
}

function createPlayList() {
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        playListContainer.append(li);
    })
}

function playItem(element) {
    document.querySelectorAll('.play-item').forEach((el, i) => {
        if(el === element.target) {
            playNum = i;
            playIfPaused();
        }
    })
}

createPlayList();

button.addEventListener('click', toggleBtn);
buttonNext.addEventListener('click', playNext);
buttonPrev.addEventListener('click', playPrev);
playListContainer.addEventListener('click', playItem);