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
           
    // Evento de hablar
    DOM.main.appendChild($box)
}




