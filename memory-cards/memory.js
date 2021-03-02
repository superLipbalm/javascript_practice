const clearBtn = document.getElementById('clear');
const showAddBtn = document.getElementById('show');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const hideBtn = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const addContainer = document.getElementById('add-container');
const currentElement = document.getElementById('current');

let currentActiveCard = 0;
const cardElements = [];
const cards = JSON.parse(localStorage.getItem('cards')) ?? [];

function addCardToDOM(data, index) {
  const cardElement = document.createElement('div');

  cardElement.classList.add('card');
  cardElement.classList.add('active');
  cardElement.addEventListener('click', (e) => {
    cardElement.classList.toggle('show-answer');
  });

  if (index !== 0) {
    cardElements[index - 1].classList.remove('active');
    cardElements[index - 1].classList.add('left');
  }

  cardElement.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `;

  cardElements.push(cardElement);

  cardsContainer.appendChild(cardElement);

  currentActiveCard++;

  updateCurrent();

  saveToLocalstorage();
}

function updateCurrent() {
  currentElement.innerText = `${currentActiveCard} / ${cardElements.length}`;
}

function saveToLocalstorage() {
  localStorage.setItem('currentActiveCard', currentActiveCard);
  localStorage.setItem('cards', JSON.stringify(cards));
}

function init() {
  if (cards.length === 0) return;

  const temp = localStorage.getItem('currentActiveCard');
  cards.forEach((card) => {
    addCardToDOM(card, cardElements.length);
  });
  cardElements.forEach((cardElement) => cardElement.classList.remove('active'));

  currentActiveCard = temp;

  for (let i = 0; i < cardElements.length; i++) {
    if (i < currentActiveCard - 1) {
      cardElements[i].classList.add('left');
    } else if (i === currentActiveCard - 1) {
      cardElements[i].classList.add('active');
      cardElements[i].classList.remove('left');
    } else {
      cardElements[i].classList.remove('left');
    }
  }
  updateCurrent();
}

init();

addCardBtn.addEventListener('click', () => {
  const card = {
    question: questionElement.value,
    answer: answerElement.value,
  };

  cards.push(card);

  addCardToDOM(card, cardElements.length);

  addContainer.classList.remove('show');
  questionElement.value = '';
  answerElement.value = '';
});

showAddBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

prevBtn.addEventListener('click', () => {
  if (cardElements.length > 1 && currentActiveCard != 1) {
    cardElements[currentActiveCard - 2].classList.add('active');
    cardElements[currentActiveCard - 2].classList.remove('left');
    cardElements[currentActiveCard - 1].classList.remove('active');
    currentActiveCard--;
    updateCurrent();
    saveToLocalstorage();
  }
});

nextBtn.addEventListener('click', () => {
  if (cardElements.length > 1 && currentActiveCard != cardElements.length) {
    cardElements[currentActiveCard].classList.add('active');
    cardElements[currentActiveCard - 1].classList.add('left');
    cardElements[currentActiveCard - 1].classList.remove('active');
    currentActiveCard++;
    updateCurrent();
    saveToLocalstorage();
  }
});

clearBtn.addEventListener('click', () => {
  currentActiveCard = 0;
  cardElements.splice(0);
  cardsContainer.innerHTML = '';
  currentElement.innerText = '';
  saveToLocalstorage();
});
