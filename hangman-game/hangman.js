const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['document', 'blizzard', 'hangman', 'apple'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// play again
function playAgain() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters.splice(0);
  wrongLetters.splice(0);
  popup.style.display = 'none';

  displayWord();
  updateWrongLettersElement();
  window.addEventListener('keydown', keydownHandler);
}
//game end
function gameEnd(text) {
  finalMessage.innerText = `${text}`;
  popup.style.display = 'flex';
  window.removeEventListener('keydown', keydownHandler);
}
// update the wrong letters
function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  //lose check
  if (wrongLetters.length === 5) {
    gameEnd('Sorry! You lose!');
  }
}
// show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}
// display correct letters
function displayWord() {
  wordElement.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
    `
    )
    .join('')}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    gameEnd('Congratulations! You won!');
  }
}

function keydownHandler(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
}

// Keydown letter
window.addEventListener('keydown', keydownHandler);

playAgainBtn.addEventListener('click', playAgain);

displayWord();
