const $currency_one = document.getElementById('currency-one');
const $amount_one = document.getElementById('amount-one');
const $currency_two = document.getElementById('currency-two');
const $amount_two = document.getElementById('amount-two');

const $rate = document.getElementById('rate');
const $swap = document.getElementById('swap');


// Fetch exchange rates and updates the DOM
function calculate () {
    const currency_one = $currency_one.value;
    const currency_two = $currency_two.value;

    fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            const rate = data.rates[currency_two]

            $rate.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

            $amount_two.value = ($amount_one.value * rate).toFixed(2)
        })
}
// Event Listeners
$currency_one.addEventListener('change',calculate);
$currency_two.addEventListener('change',calculate);

$amount_one.addEventListener('input',calculate);
$amount_two.addEventListener('input',calculate);

$swap.addEventListener('click', () => {
    const temp = $currency_one.value;
    $currency_one.value = $currency_two.value;
    $currency_two.value = temp;
    calculate();
} )


calculate();