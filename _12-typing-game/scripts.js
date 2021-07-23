let DOM = {
    word : document.getElementById('word'),
    text : document.getElementById('text'),
    scoreEl : document.getElementById('score'),
    timeEl : document.getElementById('time'),
    endGameEl : document.getElementById('end-game-container'),
    settingsBtn : document.getElementById('settings-btn'),
    settings : document.getElementById('settings'),
    settingsForm : document.getElementById('settings-form'),
    difficultySelect : document.getElementById('difficulty'),
    container : document.getElementById('game')
}

// Iniciar APP
getWord()


// Iniciar marcador
let score = 0


//Iniciar Tiempo
let time = 10


// Dificultad
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Elegir dificultad
DOM.difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


// Focusear texto
DOM.text.focus();

// Empezar cuenta regresiva;
const timeInterval = setInterval(updateTime, 1000);

async function getWord() {
    response = await fetch("https://spanish-random-words.p.rapidapi.com/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3b72200b7amsh6f1a7df4429cfa4p11ea74jsn1d8813a1d429",
            "x-rapidapi-host": "spanish-random-words.p.rapidapi.com"
        }
    })
    data = await response.json();
    randomWord = JSON.stringify(data.body.Word).replace(/['"]+/g, '');
    
    addWordToDOM(randomWord)     
}


// Agregar palabra al DOM 
function addWordToDOM (word) {
    if (word === undefined) {
        DOM.word.innerHTML = '...'
    }else {
        DOM.word.innerHTML = word;
    }
}


// Actualizar marcador
function updateScore() {
    score++;
    DOM.scoreEl.innerHTML = score;
}


// Actualizar el tiempo 
function updateTime() {
    time--;
    DOM.timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval)

        gameOver();
    }
}


// Game over, muestra la pantalla de finalización

function gameOver() {
    DOM.endGameEl.innerHTML = `
        <h1>Te quedaste sin tiempo</h1>
        <p>Tu puntaje es: ${score}</p>
        <button onclick="location.reload()">Play again</button>
    `;

    DOM.endGameEl.style.display = 'flex'
}

// Event Listeners

DOM.text.addEventListener('input', e => {
    const insertedText = e.target.value;
    currentWord = document.getElementById('word').innerText;

    if(insertedText === currentWord) {
        getWord();
        updateScore();
        // Clear
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        }else if (difficulty === 'medium'){
            time += 3;
        }else {
        time += 5;
        }
    } 

})

// Configuracion boton

DOM.settingsBtn.addEventListener('click', e => DOM.settings.classList.toggle('hide'));

// Selector de configuracion

DOM.settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty)
});

