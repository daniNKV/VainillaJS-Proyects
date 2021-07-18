let DOM = {
    wordEl: document.getElementById('word'),
    wrongLettersEl: document.getElementById('wrong-letters'),
    popup: document.getElementById('popup-container'),
    notification: document.getElementById('notification'),
    playAgainBtn: document.getElementById('play-button'),
    finalMessage: document.getElementById('final-message'),

    figureParts: document.querySelectorAll('.figure-part')
}
console.log(DOM.wordElwordEl)

const words = ['aplicación', 'programacion', 'interfaz', 'objetos', 'hechicero'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    DOM.wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                   <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
          `).join('')}
    `;
    
    const innerWord = DOM.wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        DOM.finalMessage.innerText = 'Congrats, you won! 🤙 ';
        DOM.popup.style.display = 'flex';
    }
}
function updateWrongLettersEl () {
    // Display Wrong Letters
    DOM.wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Display Parts
    DOM.figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    })
    //Check if lost
    if (wrongLetters.length === DOM.figureParts.length) {
        DOM.finalMessage.innerText = 'You lost dude 😭👶';
        DOM.popup.style.display = 'flex'
    }
}

function showNotification () {
    DOM.notification.classList.add('show');

    setTimeout( () => {
        DOM.notification.classList.remove('show');
    }, 3000)
}

// Keydowm letter press

window.addEventListener('keydown', e => {

    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            }else {
                showNotification();
            }
        }else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)

                updateWrongLettersEl();
            }else {
                showNotification();
            }
        }
    }
});

// Restart game and play again

DOM.playAgainBtn.addEventListener('click', e => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    DOM.popup.style.display = 'none';
})
displayWord();
