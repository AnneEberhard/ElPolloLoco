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
 * This function toggles between enter fullscreen and exit fullscreen
 * @param {*} = no param
 */
function toggleFullscreen() {
  var element = document.getElementById("fullscreen");

  var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

  element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
    return false;
  };
  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
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
 * This function enters fullscreen modus
 * @param {*} = no param
 */
function enterFullScreen() {
  console.log('enterfullscreen');
  debugger;
  document.getElementById("enter").classList.add("d-none");
  document.getElementById("exit").classList.remove("d-none");
  element = document.getElementById("fullscreen");
  if(element.requestFullScreen)
  element.requestFullScreen();
  else if(element.webkitRequestFullScreen)
  element.webkitRequestFullScreen();
  else if(element.mozRequestFullScreen)
  element.mozRequestFullScreen();
}

/**
 * This function exists fullscreen modus
 * @param {*} = no param
 */
function endFullscreen() {
  console.log('exitfullscreen');
  debugger;
  if (isFullScreen()) {
    document.getElementById("exit").classList.add("d-none");
    document.getElementById("enter").classList.remove("d-none");
    element = document.getElementById("fullscreen");
    if(element.exitFullscreen)
      element.exitFullscreen();
    else if(element.webkitExitFullscreen)
      element.webkitExitFullscreen();
    else if(element.mozExitFullscreen)
      element.mozExitFullscreen();
  }
}

function isFullScreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement
  );
}


