const container = document.getElementById('container');
const text = document.getElementById('text');

const cycleTime = 7500;
const breatheTime = (cycleTime / 5) * 2;
const holdTime = cycleTime / 5;

function breatheAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breatheAnimation, cycleTime);
