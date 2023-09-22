let canvas;
let world;
let keyboard = new Keyboard();
let introImage;
let introImageX = 0;
let background_music = new Audio("audio/background_music.mp3");

/**
 * This function starts the initialisation
 * @param {*} = no param
 */
function init() {
  intro();
  playBackgroundMusic();
  addTouch();
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

/**
 * This function toggles between enter fullscreen and exit fullscreen
 * @param {*} = no param
 */
function toggleFullscreen() {
  let element = document.getElementById("fullscreen");
  let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () {
      return false;
    };
  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
      return false;
    };
  updateFullscreenIcons();
  isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}

/**
 * This function replaces the respective icons for enter and exit fullscreen
 * @param {*} = no param
 */
function updateFullscreenIcons() {
  let isFull = document.webkitIsFullScreen || document.mozFullScreen || false;
  if (!isFull) {
    document.getElementById("exit").classList.remove("d-none");
    document.getElementById("enter").classList.add("d-none");
  } else {
    document.getElementById("exit").classList.add("d-none");
    document.getElementById("enter").classList.remove("d-none");
  }
}

/**
 * This function displays the the sound icon in desk modus
 * @param {*} = no param
 */
function toggleSound() {
  if (soundIsOn) {
    soundOff();
  } else {
    soundOn();
  }
}

/**
 * This function displays the sound off icon in desk modus
 * @param {*} = no param
 */
function soundOff() {
  soundIsOn = false;
  document.getElementById("soundOn").classList.add("d-none");
  document.getElementById("soundOff").classList.remove("d-none");
}

/**
 * This function displays the sound on icon in desk modus
 * @param {*} = no param
 */
function soundOn() {
  soundIsOn = true;
  document.getElementById("soundOff").classList.add("d-none");
  document.getElementById("soundOn").classList.remove("d-none");
}

/**
 * This function displays the the sound icon in mobile modus
 * @param {*} = no param
 */
function toggleSoundMobile() {
  if (soundIsOn) {
    soundOffMobile();
  } else {
    soundOnMobile();
  }
}

/**
 * This function displays the sound off icon in mobile modus
 * @param {*} = no param
 */
function soundOffMobile() {
  soundIsOn = false;
  document.getElementById("soundOnMobile").classList.add("d-none");
  document.getElementById("soundOffMobile").classList.remove("d-none");
}

/**
 * This function displays the sound on icon in mobile modus
 * @param {*} = no param
 */
function soundOnMobile() {
  soundIsOn = true;
  document.getElementById("soundOffMobile").classList.add("d-none");
  document.getElementById("soundOnMobile").classList.remove("d-none");
}

/**
 * This function plays background music if sound is on and pauses if not
 * @param {*} = no param
 */
function playBackgroundMusic() {
  setInterval(() => {
    if (soundIsOn) {
      background_music.play();
    } else {
      background_music.pause();
    }
  }, 500);
}

/**
 * This function displays the Restart Button
 * @param {*} = no param
 */
function showReStartButton() {
  document.getElementById("reStartButton").classList.remove("d-none");
}

/**
 * This function restarts without animation
 * @param {*} = no param
 */
function restart() {
  const canvas = document.getElementById("canvas");
  clearCanvas(canvas);
  document.getElementById("reStartButton").classList.add("d-none");
  world = new World(canvas, keyboard);
}
