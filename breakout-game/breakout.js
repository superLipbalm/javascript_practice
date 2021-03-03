const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRow = 9;
const brickColumn = 5;
const bricks = [];

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
};

const brick = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

function createBricks() {
  for (let i = 0; i < brickRow; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumn; j++) {
      const x = i * (brick.width + brick.padding) + brick.offsetX;
      const y = j * (brick.height + brick.padding) + brick.offsetY;
      bricks[i][j] = { x, y, ...brick };
    }
  }
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.width, brick.height);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y &&
    ball.y - ball.size < paddle.y + paddle.height
  ) {
    ball.dy = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.width &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.height
        ) {
          ball.dy *= -1;
          brick.visible = false;
          scoring();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    score = 0;
    createBricks();
  }
}

function scoring() {
  score++;

  if (score === brickRow * brickColumn) {
    createBricks();
  }
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function updateCanvas() {
  movePaddle();
  moveBall();

  drawAll();

  requestAnimationFrame(updateCanvas);
}

function keyDownHandle(e) {
  if (e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUpHandle(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

createBricks();
updateCanvas();

document.addEventListener('keydown', keyDownHandle);
document.addEventListener('keyup', keyUpHandle);

rulesBtn.addEventListener('click', () => rules.classList.add('show'));

closeBtn.addEventListener('click', () => rules.classList.remove('show'));
