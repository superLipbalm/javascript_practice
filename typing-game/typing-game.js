const word = document.getElementById('word');
const text = document.getElementById('text');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const difficultySelect = document.getElementById('difficulty');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const summary = document.getElementById('summary-container');

let time = 10;
let score = 0;
let randomWord;
const words = [];
let difficulty =
  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

const timeInterval = setInterval(updateTime, 1000);

// Fetch words from API
async function getWords() {
  const temp = await fetch('https://random-word-api.herokuapp.com/word?number=100').then((res) =>
    res.json()
  );

  temp.forEach((word) => {
    words.push(word);
  });

  addWordToDOM();
  text.focus();
  difficultySelect.value = difficulty;
}

// Generate random word from words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

function updateTime() {
  timeElement.innerText = --time + 's';

  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function gameOver() {
  summary.innerHTML = `
    <h1>Time Over</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;

  summary.style.display = 'flex';
}

getWords();

//Check input is collect
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    e.target.value = '';

    switch (difficulty) {
      case 'easy':
        time += 5;
        break;
      case 'medium':
        time += 3;
        break;
      case 'hard':
        time += 2;
        break;
      default:
    }
    scoreElement.innerText = `${++score}`;
  }
});

difficultySelect.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
