// Initial data
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

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
let dx = 2;
let dy = -2;

// Bricks
const brickRows = 5;
const brickColumns = 3;
const brickWidth = 50;
const brickHeight = 10;
const brickPadding = 5;
const brickOffsetTop = 10;
const brickOffsetLeft = 67;
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
    bricks[i][row] = { x: 0, y: 0, state: 1 };
  }
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
        context.fillStyle = "blue";
        context.fill();
        context.closePath();
      }
    }
  }
}

drawPlatform();
drawBall();
drawBricks();
