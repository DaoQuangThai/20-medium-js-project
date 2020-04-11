const formSubmit = document.querySelector('#submit');

const totalIncome = document.querySelector('#money-plus');
const totalExpense = document.querySelector('#money-minus');
const balance = document.querySelector('#balance');

const textInput = document.querySelector('#text-input');
const amountInput = document.querySelector('#amount');

const history = document.querySelector('.history');
const itemDelete = document.querySelector('.delete-btn');

// let total = 0;
// let totalIncome = 0;
// let totalExpense = 0;
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
/* Function part */
function uppercaseFirstLetter() {}
function formatNumberCurrency() {}
function formatNegativeNumber() {}
function formatPositiveNumber() {}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: textInput.value,
      amount: +amountInput.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    textInput.value = '';
    amountInput.value = '';
  }
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add('history-item');
  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeItem(${
    transaction.id
  })">x</button>
  `;

  history.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  totalIncome.innerText = `$${income}`;
  totalExpense.innerText = `$${expense}`;
}

function removeItem(id) {
  transactions = transactions.filter(history => history.id !== id);

  updateLocalStorage();

  init();
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//Update local storage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  history.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Eventlistener
formSubmit.addEventListener('submit', addTransaction);

// function handleSubmit(e) {
//   e.preventDefault();
//   const name = textInput.value;
//   const amount = +amountInput.value;

//   if (amount > 0) {
//     totalIncome += amount;
//     income.innerHTML = `$${totalIncome}`;
//     total += amount;
//     balance.innerHTML = `$${total}`;

//     // historyContainer.push({ id: generateID(), name: name, amount });
//   } else {
//     totalExpense += amount;
//     expense.innerHTML = `$${Math.abs(totalExpense)}`;
//     total += amount;
//     balance.innerHTML = `$${total}`;

//     // historyContainer.push({  });
//   }

//   const transaction = {
//     id: generateID(),
//     name: name,
//     amount,
//   };

//   historyContainer.push(transaction);

//   history.innerHTML = `${historyContainer
//     .map(item => {
//       return `
//     <li class="history-item ${item.amount > 0 ? 'plus' : 'minus'}">
//         <span>${item.name}</span>
//         <span>${item.amount > 0 ? '+' : '-'}${Math.abs(item.amount)}</span>
//         <div class="delete-btn" onclick="removeItem(${transaction.id})">x</div>
//     </li>
//     `;
//     })
//     .join('')}`;

//   textInput.value = '';
//   amountInput.value = '';
// }
