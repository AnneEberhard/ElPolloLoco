let canvas;
let world;
let keyboard = new Keyboard();
let introImage;
let introImageX = 0; // Startposition des Eingangsbildes (links)

function init() {
  intro();
}

function intro() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  introImage = new Image();
  introImage.src = "img/9_intro_outro_screens/start/startscreen_2.png";
  introImage.onload = function () {
    drawIntroImage();
    drawStartButton();
  };
}

function drawIntroImage() {
  const scaleX = canvas.width / introImage.width;
  const scaleY = canvas.height / introImage.height;
  const scale = Math.min(scaleX, scaleY);
  const x = (canvas.width - introImage.width * scale) / 2;
  const y = (canvas.height - introImage.height * scale) / 2;
  ctx.drawImage(
    introImage,
    x,
    y,
    introImage.width * scale,
    introImage.height * scale
  );
}

function drawStartButton() {
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.classList.add("startButton");
  startButton.onclick = start;
  document.body.appendChild(startButton);
}

function start() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector(".startButton");
  startButton.style.display = "none";
  animateOut();
}

function animateOut() {
  introImageX += 15;
  clearCanvas(canvas);

  const scaleX = canvas.width / introImage.width;
  const scaleY = canvas.height / introImage.height;
  const scale = Math.min(scaleX, scaleY);

  const x = introImageX;
  const y = (canvas.height - introImage.height * scale) / 2;

  if (x < canvas.width) {
    ctx.drawImage(
      introImage,
      x,
      y,
      introImage.width * scale,
      introImage.height * scale
    );
    requestAnimationFrame(animateOut);
  } else {
    world = new World(canvas, keyboard);
  }
}

function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

function start2() {
  const canvas = document.getElementById("canvas");
  clearCanvas(canvas);
  const startButton = document.querySelector(".startButton");
  startButton.style.display = "none";
  world = new World(canvas, keyboard);
}
