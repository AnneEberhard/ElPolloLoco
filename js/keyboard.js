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
    //keyboard.W = false;
  }
  if (event.keyCode == 87) {
    //keyboard.W = true;
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

function addTouch() {
  document.getElementById("right").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (evt) => {
    evt.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById("left").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (evt) => {
    evt.preventDefault();
    keyboard.LEFT = false;
  });  
  document.getElementById("jump").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("jump").addEventListener("touchend", (evt) => {
    evt.preventDefault();
    keyboard.SPACE = false;
  });  
  document.getElementById("throw").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("throw").addEventListener("touchend", (evt) => {
    evt.preventDefault();
    keyboard.D = false;
  });
  document.getElementById("pause").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.P = true;
  });
  document.getElementById("resume").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    keyboard.P = false;
  });
  document.getElementById("sound").addEventListener("touchstart", (evt) => {
    evt.preventDefault();
    toggleSoundMobile();
  });
}
