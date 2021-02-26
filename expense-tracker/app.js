const totalIncome = document.getElementById('total-income'),
  totalExpense = document.getElementById('total-expense'),
  balance = document.getElementById('balance'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  formText = document.getElementById('text'),
  formAmount = document.getElementById('amount');

let transactions = [];

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}
    </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  init();
}

function addTransaction(event) {
  event.preventDefault();
  if (text.value !== '' && amount !== '') {
    const transaction = { id: transactions.length, text: `${text.value}`, amount: amount.value };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateSummary();

    text.value = '';
    amount.value = '';
  } else {
    alert('내용과 금액을 입력하십쇼!');
  }
}

function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateSummary();
}

function updateSummary() {
  const amounts = transactions.map((item) => item.amount);
  const total = amounts.reduce((acc, item) => (acc += +item), 0);
  const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += +item), 0);
  const expense = amounts.filter((item) => item < 0).reduce((acc, item) => (acc += +item), 0);

  totalIncome.innerHTML = `+₩${income}`;
  totalExpense.innerHTML = `-₩${Math.abs(expense)}`;
  balance.innerHTML = `₩${total}`;
}

form.addEventListener('submit', addTransaction);

init();
