const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio']
}

const settingsButton = document.querySelector('.settings-button');
const settingsContainer = document.querySelector('.settings-container');


export default state;

function showSettings() {
    if (settingsContainer.classList.contains('settings-hidden')) settingsContainer.classList.remove('settings-hidden')
    else settingsContainer.classList.add('settings-hidden')
}

settingsButton.addEventListener('click', showSettings);