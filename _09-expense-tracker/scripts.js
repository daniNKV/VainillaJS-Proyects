let DOM = {
    balance : document.getElementById('balance'),
    moneyPlus : document.getElementById('money-plus'),
    moneyMinus : document.getElementById('money-minus'),
    list : document.getElementById('list'),
    form : document.getElementById('form'),
    text : document.getElementById('text'),
    amount : document.getElementById('amount')

}
/*
const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20},
    { id: 2, text: 'Salary', amount: 300},
    { id: 3, text: 'Book', amount: -10},
    { id: 4, text: 'Camera', amount: 150},
]
*/
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') 
        !== null ? localStorageTransactions : []
;


// Crear Transaccion
function addTransaction(e) {
    e.preventDefault();

    if(DOM.text.value.trim() === '' || DOM.amount.value.trim() === '') {
        alert('Falta el texto y el monto, pichón')
    }else {
        const transaction = {
            id: generateID(),
            text: DOM.text.value,
            amount: +DOM.amount.value
        };

        transactions.push(transaction);

        addTransactionsDOM(transaction)

        updateValues();

        updateLocalStorage();

        DOM.text.value = '';
        DOM.amount.value = '';
        
    }
}


// Generar random ID
function generateID() {
    return Math.floor(Math.random() * 1000000)
}



// Agregar transacciones al DOM 
function addTransactionsDOM (transaction) {
    // obtener signo
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('LI')

    // agregar clase basada en el signo
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} 
        <span>
            ${sign}${Math.abs(transaction.amount)}
        </span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            X
        </button>
        `;

    DOM.list.appendChild(item);
}


// Update the Balance, Income and Expense

function updateValues () {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = (amounts
        .reduce((acc, item) => (acc += item), 0))
        .toFixed(2)

    const income = (amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0))
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc,item) => (acc += item), 0))
        .toFixed(2)
    

    DOM.balance.innerText = `${total}`;
    DOM.moneyPlus.innerText = `${income}`;
    DOM.moneyMinus.innerText = `${expense}`
    }


// Borrar transaccion segun ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Actualizar las transacciones en Local Storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
// Iniciar APP

function init () {
    DOM.list.innerHTML = '';

    transactions.forEach(addTransactionsDOM);
    updateValues();
}
init()


// Event Listeners 

DOM.form.addEventListener('submit', addTransaction)