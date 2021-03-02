const main = document.querySelector('main');
const voiceSelect = document.getElementById('voice-select');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read-btn');
const toggleBtn = document.getElementById('toggleTextBox-btn');
const closeBtn = document.getElementById('close-btn');
const textBox = document.getElementById('textbox');

const message = new SpeechSynthesisUtterance();

let voices = [];

async function createBox() {
  const box = document.createElement('div');
  const seed = Math.floor(Math.random() * 100);
  const data = {
    image: await fetch('https://dog.ceo/api/breeds/image/random').then((res) => res.json()),
    text: await fetch(`https://api.adviceslip.com/advice/${seed}`).then((res) => res.text()),
  };
  box.classList.add('box');
  box.innerHTML = `
    <img src="${data.image['message']}" alt="" />
    <p class="info">${parser(data.text)}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(parser(data.text));
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

function parser(string) {
  return string.split('"advice": "')[1].slice(0, -2);
}

function addBoxes(number) {
  for (let i = 0; i < number; i++) {
    createBox();
  }
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.cancel();
  speechSynthesis.speak(message);
}

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name}`;

    voiceSelect.appendChild(option);
  });
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

addBoxes(16);

toggleBtn.addEventListener('click', () => {
  textBox.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  textBox.classList.remove('show');
});

voiceSelect.addEventListener('change', (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});
