let canvas;
let world;
let keyboard = new Keyboard();
let introImage;
let introImageX = 0; 

/**
 * This function starts the initialisation
 * @param {*} = no param
 */
function init() {
  intro();
}

/**
 * This function starts the intropage
 * @param {*} = no param
 */
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

/**
 * This function draws the intro picture and scales it to the canvas
 * @param {*} = no param
 */
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

/**
 * This function draws the start Button on the intro picture
 * @param {*} = no param
 */
function drawStartButton() {
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.classList.add("startButton");
  startButton.onclick = start;
  document.body.appendChild(startButton);
}

/**
 * This function begins start procedure
 * @param {*} = no param
 */
function start() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.querySelector(".startButton");
  startButton.style.display = "none";
  animateOut();
}

/**
 * This function slides the intro picture out to the right and at the ends creates the new World
 * @param {*} = no param
 */
function animateOut() {
  introImageX += 15;
  clearCanvas(canvas);
  const scaleX = canvas.width / introImage.width;
  const scaleY = canvas.height / introImage.height;
  const scale = Math.min(scaleX, scaleY);
  const x = introImageX;
  const y = (canvas.height - introImage.height * scale) / 2;
  if (x < canvas.width) {
    ctx.drawImage(introImage,x,y,introImage.width * scale,introImage.height * scale);
    requestAnimationFrame(animateOut);
  } else {
    world = new World(canvas, keyboard);
  }
}

/**
 * This function clears the canvas for the new world
 * @param {*} = no param
 */
function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * This function adds the logic when key pressed down
 * @param {*} = no param
 */
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
  if (event.keyCode == 80) {
    keyboard.P = true;
    keyboard.W = false;
  }
  if (event.keyCode == 87) {
    keyboard.W = true;
    keyboard.P = false;
  }
});

/**
 * This function stops the logic when key no longer pressed down
 * @param {*} = no param
 */
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


/**
 * This function is a back-up without animation
 * @param {*} = no param
 */
function start2() {
  const canvas = document.getElementById("canvas");
  clearCanvas(canvas);
  const startButton = document.querySelector(".startButton");
  startButton.style.display = "none";
  world = new World(canvas, keyboard);
}
