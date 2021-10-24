import state from './settings';

const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quoteBlock = document.querySelector('.quote-container');
const quoteButton = document.querySelector('.change-quote');
const weatherBlock = document.querySelector('.weather');
const audioBlock = document.querySelector('.player');
const blocksContainer = document.querySelector('.blocks-button-container');

function activeBlocks(event) {
    const closest = event.target.closest('button');
    if (closest) {
        if (document.getElementById(`${event.target.id}`).classList.contains('active')) {
            document.getElementById(`${event.target.id}`).classList.remove('active');
            hideBlocks(event.target.id);
            state.blocks.forEach((el, i) => {
                if (el === event.target.id) {
                    state.blocks.splice(i, 1);
                }
            })
        }
        else {
            document.getElementById(`${event.target.id}`).classList.add('active');
            state.blocks.push(event.target.id);
            showBlocks(event.target.id);
        }
    }
    setLocalStorage();
}

function hideBlocks(x) {
    switch(x) {
        case 'time':
            timeBlock.classList.add('block-hidden');
        break;
        case 'date':
            dateBlock.classList.add('block-hidden');
        break;
        case 'greeting':
            greetingBlock.classList.add('block-hidden');
        break;
        case 'quote':
            quoteBlock.classList.add('block-hidden');
            quoteButton.classList.add('block-hidden');
        break;
        case 'weather':
            weatherBlock.classList.add('block-hidden');
        break;
        case 'audio':
            audioBlock.classList.add('block-hidden');
        break;
    }
}

function showBlocks(x) {
    switch(x) {
        case 'time':
            timeBlock.classList.remove('block-hidden');
        break;
        case 'date':
            dateBlock.classList.remove('block-hidden');
        break;
        case 'greeting':
            greetingBlock.classList.remove('block-hidden');
        break;
        case 'quote':
            quoteBlock.classList.remove('block-hidden');
            quoteButton.classList.remove('block-hidden');
        break;
        case 'weather':
            weatherBlock.classList.remove('block-hidden');
        break;
        case 'audio':
            audioBlock.classList.remove('block-hidden');
        break;
    }
}

function setLocalStorage() {
    localStorage.setItem('blocks', JSON.stringify(state.blocks));
}

function getLocalStorage() {
    if(localStorage.getItem('blocks')) {
        state.blocks = JSON.parse(localStorage.getItem('blocks'));
    }
    else setLocalStorage();
}

function getActiveBlocks() {
    getLocalStorage();
    if(state.blocks.length > 0) {
        state.blocks.forEach(el => {
            showBlocks(el);
            document.getElementById(el).classList.add('active');
        })
    }
}

blocksContainer.addEventListener('click', activeBlocks);
window.addEventListener('load', getLocalStorage);

getActiveBlocks();