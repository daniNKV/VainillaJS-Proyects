let DOM = {
    main : document.querySelector('main'),
    voiceSelect : document.getElementById('voices'),
    textArea : document.getElementById('text'),
    readBtn : document.getElementById('read'),
    toggleBtn : document.getElementById('toggle'),
    closeBtn : document.getElementById('close'),
}


const data = [
    {
        image: './img/drink.jpg',
        text: "Tengo sed"
      },
      {
        image: './img/food.jpg',
        text: "Tengo hambre"
      },
      {
        image: './img/tired.jpg',
        text: "Estoy cansado"
      },
      {
        image: './img/hurt.jpg',
        text: "Estoy herido"
      },
      {
        image: './img/happy.jpg',
        text: "Estoy contento"
      },
      {
        image: './img/angry.jpg',
        text: "Tengo hambre"
      },
      {
        image: './img/sad.jpg',
        text: "Estoy triste"
      },
      {
        image: './img/scared.jpg',
        text: "Estoy asustado"
      },
      {
        image: './img/outside.jpg',
        text: 'Quiero ir afuera'
      },
      {
        image: './img/home.jpg',
        text: 'Quiero ir a casa'
      },
      {
        image: './img/school.jpg',
        text: 'Quiero ir a la escuela'
      },
      {
        image: './img/grandma.jpg',
        text: 'Quiero ir a lo de la abuela'
      }
];


data.forEach(createBox);

// Crear los elementos para leer

function createBox(item) {
    const $box = document.createElement('DIV');

    const { image , text } = item;

    $box.classList.add('box');
    $box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">
            ${text}
        </p>`;
           
    $box.addEventListener('click', (e) => {
        console.log()
        setTextMessage(text);
        speakText();

        // Añadir un efecto de elemento activo
        $box.classList.add('active');
        setTimeout(() => $box.classList.remove('active'), 800)
    })
    DOM.main.appendChild($box)
}

// Iniciar speech synth
const message = new SpeechSynthesisUtterance();

// Almacenar voces
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('OPTION');
        
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`

        DOM.voiceSelect.appendChild(option)
    })
}


// Establece texto a leer
function setTextMessage(text) {
    message.text = text;
}


// Elegir Voz
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

// Leer el texto
function speakText() {
    speechSynthesis.speak(message)
}

// Toggle text box

DOM.toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'))

// Cerrar text box

DOM.closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'))


// Cambiar voces

speechSynthesis.addEventListener('voiceschanged', getVoices);

DOM.voiceSelect.addEventListener('change', setVoice)


getVoices();


// Boton de leer texto

DOM.readBtn.addEventListener('click',() => {
    setTextMessage(DOM.textArea.value);
    speakText()
} )


// BOQUITA


function reproducirAudio () {
   const x = document.getElementById('cancion');
   x.play()
   setTimeout(() => x.pause(), 25000)
    
}