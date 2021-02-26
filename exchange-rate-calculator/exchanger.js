const API_KEY = '2470913e79404b9ea32ab636';

const currencyFrom = document.getElementById('currency-from');
const amountFrom = document.getElementById('amount-from');
const currencyTo = document.getElementById('currency-to');
const amountTo = document.getElementById('amount-to');

const swapButton = document.getElementById('swap');
const rateText = document.getElementById('rate');

function exchangeRateCalculate() {
    const currencyOne = currencyFrom.value;
    const currencyTwo = currencyTo.value;

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[currencyTwo]
            
            rateText.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
            amountTo.value = (amountFrom.value * rate).toFixed(2);
        });
}

function swapCurrency(){
    const temp = currencyFrom.value;

    currencyFrom.value = currencyTo.value;
    currencyTo.value = temp;

    exchangeRateCalculate();
}

currencyFrom.addEventListener('change', exchangeRateCalculate);
amountFrom.addEventListener('input', exchangeRateCalculate);
currencyTo.addEventListener('change', exchangeRateCalculate);
amountTo.addEventListener('input', exchangeRateCalculate);
swapButton.addEventListener('click', swapCurrency);

exchangeRateCalculate();
