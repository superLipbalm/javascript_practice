const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const showMillionairesBtn = document.getElementById('show-millionaires');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addUserData(newUser);
}

function addUserData(userData) {
    data.push(userData);

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;

        main.appendChild(element);
    })
}

function formatMoney(money) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //FROM => https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2};
    })

    updateDOM();
}

function sortData() {
    data.sort((a,b ) => b.money - a.money);

    updateDOM();
}

function showMillionaires() {
    data = data.filter(item => item.money > 1000000);

    updateDOM();
}

function calculateEntireWealth() {
    const totalWealth = data.reduce((sum, user) => (sum += user.money), 0);

    const summaryElement = document.createElement('div');
    summaryElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(totalWealth)}</strong></h3>`;
    main.appendChild(summaryElement);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortData);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateEntireWealth);