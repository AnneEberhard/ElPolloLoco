  //  try {
  //faulty function
  //  } catch(e) {
  //console.warn('Error:', e);
  // console.log('Could not load ', this.variable)
  //  }

function drawFrame(ctx) {
  if (
    this instanceof Character ||
    this instanceof Chicken ||
    this instanceof Endboss
  ) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
  if (
    this instanceof Character ||
    this instanceof Chicken ||
    this instanceof Endboss ||
    this instanceof Bottle ||
    this instanceof ThrowableObject ||
    this instanceof Coin
  ) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red";
    let width = this.width - this.offset.right - this.offset.left;
    let height = this.height - this.offset.bottom - this.offset.top;
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      width,
      height
    );
    ctx.stroke();
  }
}


function checkCollectingAll() {
    let coins = this.level.coins;
    let coinsCollected = this.character.coinsCollected;
    let statusBarCoin = this.statusBarCoin;
    this.checkCollecting(coins, coinsCollected, statusBarCoin);
  }


  function checkCollisionCoin() {
    for (let i = 0; i < this.level.coins.length; i++) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.character.coinsCollected += 20;
        this.statusBarCoin.setPercentage(this.character.coinsCollected);
      }
    }
  }

  function  checkCollisionBottle() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(i, 1);
        this.character.bottlesCollected += 20;
        this.statusBarBottle.setPercentage(this.character.bottlesCollected);
      }
    }
  }

  function playAnimationOnce(images) {
    let i = images.length - 1;
    this.getAnimation(images, i);
  }

  function getAnimation(images, i) {
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  /**
 * This function adds icon and onlick for fullscreen
 * @param {*} = no param
 */
  function drawFullScreenIcon() {
    const fullscreenIcon = document.createElement("img");
    fullscreenIcon.src = "img/icon/icons8-vollbild-50.png";
    fullscreenIcon.classList.add("full");
    fullscreenIcon.onclick = goFullScreen;
    document.body.appendChild(fullscreenIcon);
  }

  function goFullScreen() {
    element = document.getElementById("fullscreen");
    enterFullScreen(element);
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

function playSound(sound) {
  if (this.world && world.isGameOver == false) {
    console.log('sound');
    sound.play();
  }
}

  
function playChicken(sound) {
  if (this.gameIsRunning()) {
    let distanceToCharacter = this.world.character.x - this.x;
    //let distancePepeCamera = Math.abs(this.world.character.x - this.world.camera_x);
    //console.log('Pepe:', this.world.character.x);
    //console.log('Distanz zu Pepe:', distanceToCharacter);
    //console.log('Huhn:', this.x);
    //console.log('Kamera:', this.world.camera_x);
    //console.log('Distanz zu Kamera:', distanceToCamera);
    //console.log('Kamerdistanz:', distancePepeCamera);
    if (distanceToCharacter < 200 && distanceToCharacter > -780  && soundIsOn) {
      sound.play();
    }
  }
}

function moveCharacterImagesSounds() {
  if (this.gameIsRunning()) {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.playSound(this.dying_sound);
      world.gameOver(0);
    }  else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.playSound(this.hurting_sound);
    }
    else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.playSound(this.jumping_sound);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.playSound(this.walking_sound);
      } else if (this.timeCharacterMoved() < 10) {
        this.playAnimation(this.IMAGES_IDLE);
      } else {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.playSound(this.snoring_sound);
      }
    }}
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
    //Back-up HTML Code:
    //<img id="enter" src="img/icon/enter_fullscreen.png" onclick="enterFullScreen()">
    //<img id="exit" src="img/icon/exit_fullscreen.png" onclick="exitFullscreen()"> //macht Probleme wegen Namen
   
    //<img id="enter" src="img/icon/enter_fullscreen.png" onclick="enterFullScreen()">
    //<img id="exit" class="d-none" src="img/icon/exit_fullscreen.png" onclick="endFullscreen()">

    
    //<div class="subtext">
    //<div class="hover" onclick="toggleSound()">
    //  <img id="soundOn" class="d-none" src="img/icon/sound_on.png" />
    //  <img id="soundOff" src="img/icon/sound_off.png" />
    //</div>
  //</div>

  function createBackground() {
    return  [
      new BackgroundObjects("img/5_background/layers/air.png", -1 * 719),
      new BackgroundObjects(
        "img/5_background/layers/3_third_layer/2.png",
        -1 * 719
      ),
      new BackgroundObjects(
        "img/5_background/layers/2_second_layer/2.png",
        -1 * 719
      ),
      new BackgroundObjects(
        "img/5_background/layers/1_first_layer/2.png",
        -1 * 719
      ),
  
      new BackgroundObjects("img/5_background/layers/air.png", 0 * 719),
      new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0 * 719),
      new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0 * 719),
      new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0 * 719),
  
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 1),
      new BackgroundObjects("img/5_background/layers/3_third_layer/2.png", 719 * 1),
      new BackgroundObjects(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 1
      ),
      new BackgroundObjects("img/5_background/layers/1_first_layer/2.png", 719 * 1),
  
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObjects(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObjects(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObjects(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
  
      new BackgroundObjects("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObjects(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObjects(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObjects(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      )]
  }
  