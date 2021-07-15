let DOM = {
    main: document.getElementById('main'),
    addUserBtn: document.getElementById('add-user'),
    showMillonaires: document.getElementById('show-millonaires'),
    sortBtn: document.getElementById('sort'),
    calculateWealthBtn: document.getElementById('calculate-wealth'),
    doubleBtn: document.getElementById('double'),
}

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money

async function getRandomUser () {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// Doubles everyones money
function doubleMoney () {
    data = data.map(user => {
        return { ...user, money: user.money * 2}
    });

    updateDOM();
}

// Sort users by Richiest
function sortByRichest () {
    data.sort( (a,b) => b.money - a.money);

    updateDOM();
}

// Filter only Millonaires 
function showMillonaires () {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculates the entire Wealth
function calculateWealth () {
    wealth = data.reduce((acc,user) => (acc += user.money), 0);  // REDUCE: Acumulator and current value//

    const wealthEl = document.createElement('DIV');
    wealthEl.innerHTML = `<h3>Total Wealth is <strong>${formatMoney(wealth)}</strong></h3>`;
    DOM.main.appendChild(wealthEl);
}

// Add new obj to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM (providedData = data) {
    // Clear the main DIV

    DOM.main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach( item => {
        const money = formatMoney(item.money)
        const element = document.createElement('DIV');
        element.classList.add('person');
        
        element.innerHTML = `<strong>${item.name}</strong>$${money}`;
        
        DOM.main.appendChild(element);
    });

}

// Format number as money

function formatMoney (number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners

DOM.addUserBtn.addEventListener('click', getRandomUser );

DOM.doubleBtn.addEventListener('click', doubleMoney );

DOM.sortBtn.addEventListener('click', sortByRichest );

DOM.showMillonaires.addEventListener('click', showMillonaires );

DOM.calculateWealthBtn.addEventListener('click', calculateWealth );