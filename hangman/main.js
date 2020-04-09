/* Grab element from the DOM */
const correctWord = document.getElementById('word');
const showWrongLetters = document.getElementById('wrong-letters');
const wrongTitle = document.querySelector('.wrong-letters-container');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const playAgainBtn = document.getElementById('play-button');
const figure = document.querySelectorAll('.figure-part');

/* Set var */
// This part can fetch from an api but for now its ok
const words = ['application', 'hangman', 'sexy', 'blackbeard'];
const correctLetters = [];
const wrongLetters = [];
let result = words[Math.floor(Math.random() * words.length)];

/* Function part */
// Show hidden word
function displayWord() {
  const handleDOM = result
    .split('')
    .map(
      (l) =>
        `<span class="letter">${correctLetters.includes(l) ? l : ''}</span>`
    )
    .join('');
  correctWord.innerHTML = handleDOM;

  // handle breakline each char
  const innerWord = correctWord.innerText.replace(/[ \n]/g, '');
  //   console.log(result, innerWord);

  if (result === innerWord) {
    finalMessage.innerHTML = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

// Update wrong letter
function updateWrongLettersEL() {
  // Display wrong letter

  showWrongLetters.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  
  `;

  // if (wrongLetters.length > 0) {
  //   showWrongLetters.innerHTML = `<p>Wrong</p> ${wrongLetters.map((letter) => {
  //     return `<span>${letter}</span>`;
  //   })}`;
  // }

  // Display part
  figure.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figure.length) {
    finalMessage.innerHTML = 'Unfortunately You lost';
    popup.style.display = 'flex';
  }
}

// Show Notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

/* Add eventlisteners */
window.addEventListener('keydown', (e) => {
  // check if user press a letter or not
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (result.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEL();
      } else {
        showNotification();
      }
    }
  }
});

// Reset the game
playAgainBtn.addEventListener('click', () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  console.log(wrongLetters);

  result = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEL();

  popup.style.display = 'none';
});

displayWord();
