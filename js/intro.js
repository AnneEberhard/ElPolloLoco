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
      drawFullScreen();
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
   * This function draws the Re-start Button on the extro picture
   * @param {*} = no param
   */
  function drawReStartButton() {
    const startButton = document.createElement("button");
    startButton.textContent = "Re-Start";
    startButton.classList.add("reStartButton");
    startButton.onclick = restart;
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
   * This function restarts without animation
   * @param {*} = no param
   */
  function restart() {
    const canvas = document.getElementById("canvas");
    clearCanvas(canvas);
    const startButton = document.querySelector(".reStartButton");
    startButton.style.display = "none";
    world = new World(canvas, keyboard);
  }

  
  /**
 * This function adds icon and onlick for fullscreen
 * @param {*} = no param
 */
function drawFullScreen() {
  const fullscreenIcon = document.createElement("img");
  fullscreenIcon.src = "img/icon/icons8-vollbild-50.png";
  fullscreenIcon.classList.add("full");
  fullscreenIcon.onclick = goFullScreen;
  document.body.appendChild(fullscreenIcon);
}

/**
 * This function goes fullscreen
 * @param {*} = no param
 */
function goFullScreen() {
  element = document.getElementById("fullscreen");
  enterFullScreen(element);
}

function enterFullScreen(element) {
  if(element.requestFullScreen)
  element.requestFullScreen();
  else if(element.webkitRequestFullScreen)
  element.webkitRequestFullScreen();
  else if(element.mozRequestFullScreen)
  element.mozRequestFullScreen();
}

function exitFullscreen(element) {
  if(element.exitFullscreen)
  element.exitFullscreen();
  else if(element.webkitExitFullscreen)
  element.webkitExitFullscreen();
  else if(element.mozExitFullscreen)
  element.mozExitFullscreen();
}
