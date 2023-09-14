let canvas;
let world;
let keyboard = new Keyboard();
let introImage;
let introImageX = 0;
let soundIsOn = true; 


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
  let element = document.getElementById("fullscreen");

  let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

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

function toggleSound() {

  if(soundIsOn) {
    soundOff();
  } else {
    soundOn();
  }
}

function soundOff() {
  soundIsOn = false;
  document.getElementById("soundOn").classList.add("d-none");
  document.getElementById("soundOff").classList.remove("d-none");
  console.log('sound off');
  console.log(soundIsOn);
 
}

function soundOn() {
  soundIsOn = true;
  document.getElementById("soundOff").classList.add("d-none");
  document.getElementById("soundOn").classList.remove("d-none");
  console.log('sound on');
  console.log(soundIsOn);
}


