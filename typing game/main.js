const input = document.getElementById('input');
const wordGiven = document.getElementById('word-given');
const renderScore = document.getElementById('score');
const renderTime = document.getElementById('time');
const renderGameover = document.getElementById('time-ranout');
const finalScore = document.getElementById('final-score');
const reloadBtn = document.getElementById('reload');
const whilePlaying = document.querySelector('.while-playing');
const settingBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');

const words = ['computer', 'sex', 'money'];

let randomWord;
let score = 0;
let time = 10;
let difficulty = 'easy';

// Focus on text input from start
input.focus();

// Function part

function createRandomWord(wordsArr) {
  const randomWord = words[Math.floor(Math.random() * wordsArr.length)];

  return randomWord;
}

function addWordToDom() {
  randomWord = createRandomWord(words);

  wordGiven.innerHTML = randomWord;
  renderTime.innerHTML = `Time left: ${time}`;
}

function increaseScore() {
  score++;
  renderScore.innerHTML = `Score: ${score}`;
}

const handleTime = setInterval(updateTime, 1000);

function updateTime() {
  time--;

  renderTime.innerHTML = `Time left: ${time}`;

  if (time === 0) {
    clearInterval(handleTime);
    gameOver();
  }
}

function gameOver() {
  whilePlaying.style.display = 'none';
  renderGameover.style.display = 'block';
  finalScore.innerHTML = `Your final score is: ${score}`;
}

function checkWord() {
  const wordInput = this.value;

  if (wordInput === randomWord) {
    addWordToDom();
    increaseScore();

    // Clear word
    this.value = '';

    // just need plus 5 why 6 here? cause updateTime --1 rightaway~
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 4;
    } else {
      time += 6;
    }

    updateTime();
  }
}

addWordToDom();

// Event listener

input.addEventListener('input', checkWord);
// reloadBtn.addEventListener('click', () => {
//   //   whilePlaying.style.display = 'block';
//   //   renderGameover.style.display = 'none';
//   time = 10;
//   score = 0;
//   addWordToDom();
// });

settingBtn.addEventListener('click', function () {
  settings.classList.toggle('hide');
});

settings.addEventListener('change', e => {
  difficulty = e.target.value;
});
