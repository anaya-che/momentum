import state from './settings';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
let randomQuote;

export async function getQuotes() {
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    if (state.language === 'en') {
        quote.textContent = data.en[randomQuote].text;
        author.textContent = data.en[randomQuote].author;
    }
    else {
        quote.textContent = data.ru[randomQuote].text;
        author.textContent = data.ru[randomQuote].author;
    }
}

function getRandomQuoteNum() {
    randomQuote = (Math.floor(Math.random() * 16));
    getQuotes();
}

document.addEventListener('DOMContentLoaded', getRandomQuoteNum);
quoteButton.addEventListener('click', getRandomQuoteNum);