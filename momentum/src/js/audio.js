import playList from './playList.js';

const button = document.querySelector('.play');
const buttonNext = document.querySelector('.play-next');
const buttonPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const trackTitle = document.querySelector('.track-title');
const length = document.querySelector('.length');
const volumeBar = document.querySelector('.volume-bar');
const volumeBarPercentage = document.querySelector('.volume-bar-percentage');
const volumeButton = document.querySelector('.volume');
const timeline = document.querySelector('.timeline');
const progress = document.querySelector('.progress');
const current = document.querySelector('.current');

const audio = new Audio();
audio.src = playList[0].src
let isPlay = false;
let playNum = 0;

function getAudio() {
    audio.src = playList[playNum].src;
    length.textContent = playList[playNum].duration;
}

function playAudio() {
    getAudio()
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
            el.classList.remove('playing');
        }
        else {
            el.classList.add('item-active');
            if(el.classList.contains('playing')) el.classList.remove('playing');
            else el.classList.add('playing');
            trackTitle.textContent = playList[playNum].title;
            
        } 
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

    getAudio();
    playIfPaused();
}


function playPrev() {
    if(playNum < 5 && playNum > 0) {
        playNum -= 1;
    }
    else {
        playNum = 4;
    }

    getAudio();
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
            if(playNum === i) {
                if(!isPlay) playIfPaused();
                else {
                    toggleBtn();
                }
            }
            else {
                playNum = i;
                getAudio();
                playIfPaused();
            }
        }
    })
}

function muteVolume() {
    if(!audio.muted) {
        audio.muted = true;
        volumeButton.classList.add('muted');
        volumeBarPercentage.style.width = "0%";
    }
    else {
        audio.muted = false;
        volumeButton.classList.remove('muted');
        volumeBarPercentage.style.width = `${audio.volume * 100}%`;
    }
}

function updateVolume(event) {
    const sliderWidth = window.getComputedStyle(volumeBar).width;
    const newVolume = Math.abs(event.offsetX / parseInt(sliderWidth));
    audio.volume = newVolume;
    volumeBarPercentage.style.width = `${newVolume * 100}%`;

    if (newVolume === 0 || audio.muted && newVolume > 0) muteVolume();
}

function setTimeInterval() {
    progress.style.width = `${audio.currentTime / audio.duration * 100}%`;
    let seconds = parseInt(audio.currentTime);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    current.textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
}

function setTimeline(event) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = Math.abs(event.offsetX / parseInt(timelineWidth) * audio.duration);
    audio.currentTime = timeToSeek;
}

createPlayList();
button.addEventListener('click', toggleBtn);
buttonNext.addEventListener('click', playNext);
buttonPrev.addEventListener('click', playPrev);
playListContainer.addEventListener('click', playItem);
audio.addEventListener('ended', playNext);
audio.addEventListener('timeupdate', setTimeInterval);
timeline.addEventListener('click', setTimeline);
volumeButton.addEventListener('click', muteVolume);
volumeBar.addEventListener('click', updateVolume);