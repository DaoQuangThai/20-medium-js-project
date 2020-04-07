const addUser = document.getElementById('btn-user');
const doubleMoney = document.getElementById('btn-double');
const showMillionaries = document.getElementById('btn-millionaries');
const sortByRichest = document.getElementById('btn-richest');
const sumWeath = document.getElementById('btn-sum');

const personInfo = document.querySelector('.person__info');
const person = document.querySelector('.person');

let data = [];

// Get 3 random user at the begining
getRandomUser();
getRandomUser();
getRandomUser();

// Format money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Render UI to the DOM
function updateDOM(providedData = data) {
  //   console.log(data);

  personInfo.innerHTML = providedData
    .map((d) => {
      return `
        <li class="person__item">
        <span class="person__name">${d.name}</span>
        <span class="person__weath">${formatMoney(d.weath)}</span>
        </li>
        `;
    })
    .join('');
}

function addData(obj) {
  data.push(obj);
  //   console.log(data);
  updateDOM();
}

// Fetch user data
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    weath: Math.floor((Math.random() + 0.5) * 1000000),
  };

  addData(newUser);
}

// Double all money user
function handledoubleMoney() {
  data = data.map((d) => {
    return { ...d, weath: d.weath * 2 };
  });

  updateDOM();
}

// Sort for largers
function handlesortByRichest() {
  data = data.sort((a, b) => {
    return b.weath - a.weath;
  });

  updateDOM();
}

// Show Millionaries
function handleshowMillionaries() {
  data = data.filter((d) => {
    return d.weath > 1000000;
  });

  updateDOM();
}
// Sum all user weath
function handlesumWeath() {
  const weath = data.reduce((total, d) => total + d.weath, 0);

  const totalWeathEl = document.createElement('li');
  totalWeathEl.innerHTML = `<h3 class="total">Total Weath: <strong>${formatMoney(
    weath
  )}</strong></h3>`;
  personInfo.appendChild(totalWeathEl);
}

// Add event listener
addUser.addEventListener('click', getRandomUser);
doubleMoney.addEventListener('click', handledoubleMoney);
showMillionaries.addEventListener('click', handleshowMillionaries);
sortByRichest.addEventListener('click', handlesortByRichest);
sumWeath.addEventListener('click', handlesumWeath);
