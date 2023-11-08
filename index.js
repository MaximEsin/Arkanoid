// Initial data
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const looseTab = document.getElementsByClassName("looseTab");
let score = 0;

// Entities -----------------------------------------------------

// Platform
const platformHeight = 10;
const platformWidth = 50;
let platformX = (canvas.width - platformWidth) / 2;

// Platform Controls
let moveRight = false;
let moveLeft = false;

// Ball
let ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 20;
let dx = -2;
let dy = -2;

// Bricks
const brickRows = 5;
const brickColumns = 8;
const brickWidth = 30;
const brickHeight = 10;
const brickPadding = 5;
const brickOffsetTop = 10;
const brickOffsetLeft = 10;
const bricks = [];

// Systems -----------------------------------------------------

// Event listeners
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    moveRight = true;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    moveLeft = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "Right" || event.key === "ArrowRight") {
    moveRight = false;
  } else if (event.key === "Left" || event.key === "ArrowLeft") {
    moveLeft = false;
  }
}

// Bricks logic
for (let i = 0; i < brickColumns; i++) {
  bricks[i] = [];

  for (let row = 0; row < brickRows; row++) {
    bricks[i][row] = { x: 0, y: 0, state: 1, color: getRandomColor() };
  }
}

function getRandomColor() {
  const colors = ["blue", "red", "green"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Draw functions
function drawPlatform() {
  context.beginPath();
  context.rect(
    platformX,
    canvas.height - platformHeight,
    platformWidth,
    platformHeight
  );
  context.fillStyle = "purple";
  context.fill();
  context.closePath();
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "purple";
  context.fill();
  context.closePath();
}

function drawBricks() {
  for (let i = 0; i < brickColumns; i++) {
    for (let row = 0; row < brickRows; row++) {
      if (bricks[i][row].state === 1) {
        const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[i][row].x = brickX;
        bricks[i][row].y = brickY;
        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = bricks[i][row].color;
        context.fill();
        context.closePath();
      }
    }
  }
}

// Brick touched logic
function brickTouched() {
  for (let i = 0; i < brickColumns; i++) {
    for (let row = 0; row < brickRows; row++) {
      const b = bricks[i][row];
      if (
        b.state === 1 &&
        x > b.x &&
        x < b.x + brickWidth &&
        y > b.y &&
        y < b.y + brickHeight
      ) {
        dy = -dy;
        b.state = 0;
        increaseScore(b.color);
      }
    }
  }
}

function increaseScore(color) {
  switch (color) {
    case "blue": {
      score += 1;
      break;
    }
    case "red": {
      score += 2;
      break;
    }
    case "green": {
      score += 3;
      break;
    }
  }
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById(
    "looser__score"
  ).innerText = `You earned: ${score} points`;
}

// Restart
function restart() {
  x = canvas.width / 2;
  y = canvas.height - 20;
  platformX = (canvas.width - platformWidth) / 2;

  dx = -2;
  dy = -2;

  for (let i = 0; i < brickColumns; i++) {
    for (let row = 0; row < brickRows; row++) {
      bricks[i][row].state = 1;
    }
  }
  looseTab[0].classList.add("looseTab__closed");

  game();
}

// Game
function game() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPlatform();
  brickTouched();

  // Bounce off walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Bounce off top
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  // Platform interaction
  if (
    y + dy > canvas.height - ballRadius - platformHeight &&
    x > platformX &&
    x < platformX + platformWidth
  ) {
    dy = -dy;
  }

  // Move platform
  if (moveRight && platformX < canvas.width - platformWidth) {
    platformX += 5;
  } else if (moveLeft && platformX > 0) {
    platformX -= 5;
  }

  // Loose condition
  if (y + dy > canvas.height - ballRadius) {
    looseTab[0].classList.remove("looseTab__closed");
    return;
  } else {
    x += dx;
  }

  y += dy;

  requestAnimationFrame(game);
}

game();
