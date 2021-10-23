const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');
let randomQuote;

async function getQuotes() {
    getRandomQuoteNum();
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    quote.textContent = data[randomQuote].text;
    author.textContent = data[randomQuote].author;
}

function getRandomQuoteNum() {
    randomQuote = (Math.floor(Math.random() * 16));
}

document.addEventListener('DOMContentLoaded', getQuotes);
quoteButton.addEventListener('click', getQuotes);