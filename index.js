// Initial data
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Entities -----------------------------------------------------

// Platform
const platformHeight = 10;
const platformWidth = 75;
let platformX = (canvas.width - platformWidth) / 2;

// Platform Controls
let moveRight = false;
let moveLeft = false;

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

// Draw functions
function drawPaddle() {
  context.beginPath();
  context.rect(
    platformX,
    canvas.height - platformHeight,
    platformWidth,
    platformHeight
  );
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

drawPaddle();
