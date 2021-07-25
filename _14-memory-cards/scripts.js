let DOM = {
    cardsContainer : document.getElementById('cards-container'),
    prevBtn : document.getElementById('prev'),
    nextBtn : document.getElementById('next'),
    currentEl : document.getElementById('current'),
    showBtn : document.getElementById('show'),
    hideBtn : document.getElementById('hide'),
    questionEl : document.getElementById('question'),
    answerEl : document.getElementById('answer'),
    addCardBtn : document.getElementById('add-card'),
    clearBtn : document.getElementById('clear'),
    addContainer : document.getElementById('add-container'),
}


// Averiguar que card está activa
let currentActiveCard = 0;

// Guardar DOM cards
const cardsEl = [];

// Guardar cards data

const cardsData = [
    {
        question: 'What is a Variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'What must a variable begin with?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'Example of Case Sensisitve Variable',
        answer: 'thisIsAVariable'
    }
]

// Crear todas las cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));

}

// Crear una sola card en el DOM
function createCard (data, index) {
    const card = document.createElement('DIV');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
        </div>
    </div>
    `;
    
    card.addEventListener('click', () => card.classList.toggle('show-answer'))

    // Agregar cards al DOM
    cardsEl.push(card);

    DOM.cardsContainer.appendChild(card)

    updateCurrentText();

}

function updateCurrentText() {
    DOM.currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
};

createCards()


// Event Listeners 

DOM.nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    
    currentActiveCard++

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1 ;
    } 

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText();
})

DOM.prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    
    currentActiveCard--

    if (currentActiveCard < 0) {
        currentActiveCard = 0 ;
    } 

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText();
})
