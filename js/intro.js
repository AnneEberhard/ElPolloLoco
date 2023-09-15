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
 * This function begins start procedure
 * @param {*} = no param
 */
function start() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  document.getElementById("startButton").classList.add("d-none");
  createLevel();
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

/**
 * This function clears the canvas for the new world
 * @param {*} = no param
 */
function clearCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

