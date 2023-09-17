class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBarHealth = new StatusbarHealth();
  statusBarBottle = new StatusbarBottle();
  statusBarCoin = new StatusbarCoin();
  throwableObjects = [];
  splashableObjects = [];
  endScreenLost = new Endscreen(0);
  endScreenWon = new Endscreen(1);
  enemySquashed = false;
  playerWon = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    setStoppableInterval(this.run.bind(this), 200);
  }

  /**
   * This function connects the character via a variable called world to this world
   * @param {*}  = no param
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * This function is the main draw method
   * @param {*}  = no param
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds); 
    if (isGameOver) {
      this.drawGameOver();
    } else {
      // -----------Space for fixed objects ---------------
      this.ctx.translate(-this.camera_x, 0); //Back
      this.addToMap(this.statusBarHealth);
      this.addToMap(this.statusBarBottle);
      this.addToMap(this.statusBarCoin);
      this.ctx.translate(this.camera_x, 0); // Forward
      // -----------End of Space for fixed objects ---------------
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.bottles);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.splashableObjects);
      this.ctx.translate(-this.camera_x, 0);

      let self = this; 
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * This function draws the endscreen
   * @param {*} = no param
   */
  drawGameOver() {
    this.ctx.translate(-this.camera_x, 0);
    if (this.playerWon) {
      this.addToMap(this.endScreenWon);
      showReStartButton();
    } else {
      this.addToMap(this.endScreenLost);
      showReStartButton();
    }
  }

  /**
   * This function adds objects to draw from an array
   * @param {object} object = JSON with the objects to draw
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * This function adds one object to draw
   * @param {object} mo = movable object to draw
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
    if (this instanceof Bottle) {
      this.flipImageBack(mo);
    }
  }

  /**
   * This function flips the image to draw on the y-axis
   * @param {object} mo = movable object to draw
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * This function reflips the image to draw on the y-axis
   * @param {object} mo = movable object to draw
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  /**
   * This function checks for collision, throwing, pause
   * @param {*}  = no param
   */
  run() {
    this.checkCollision();
    this.checkThrow();
    this.checkPause();
    this.checkActionTime();
    playBackgroundMusic();
  }

  /**
   * This function checks for pause induced by user
   * @param {*}  = no param
   */
  checkPause() {
    if (this.keyboard.P) {
      pause = true;
    } else {
      pause = false;
    }
  }

  /**
   * This function notes the time whenever the character is operated by the user
   * @param {*}  = no param
   */
  checkActionTime() {
    if (keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.D) {
      this.character.actionTime = new Date().getTime();
    }
  }

  /**
   * This function checks for collision
   * @param {*}  = no param
   */
  checkCollision() {
    this.checkCollecting(this.level.coins,"coinsCollected",this.statusBarCoin);
    this.checkCollecting(this.level.bottles,"bottlesCollected",this.statusBarBottle);
    this.checkEnemySquashed();
    this.checkCollisionBottleEnemy();
    this.checkCollisionEnemy();
  }

  /**
   * This function is collecting items
   * @param {*}  = no param
   */
  checkCollecting(array, collectedProperty, bar) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (this.character.isColliding(item)) {
        array.splice(i, 1);
        this.character[collectedProperty] += 20;
        bar.setPercentage(this.character[collectedProperty]);
      }
    }
  }

  /**
   * This function checks for bottle hitting enemy
   * @param {*}  = no param
   */
  checkCollisionBottleEnemy() {
    if (this.throwableObjects.length > 0) {
      let thrownBottle = this.throwableObjects[0];
      for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (enemy.isColliding(thrownBottle)) {
          enemy.hit(enemy);
          this.splash(thrownBottle.x, thrownBottle.y);
          this.throwableObjects.splice(0, 1);
        }
      }
    }
  }

  /**
   * This function checks for chickens being hit or jumped on
   * @param {*}  = no param
   */
  checkEnemySquashed() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        if (enemy instanceof Chicken) {
          enemy.hit(enemy);
          this.enemySquashed = true;
          setTimeout(() => {
            this.enemySquashed = false;
          }, 1000);
        }
      }
    }
  }

  /**
   * This function checks for collision of the character with an enemy
   * @param {*}  = no param
   */
  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.enemySquashed) {
        this.character.hit(this.character);
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * This function induces throwing bottles on the enemy
   * @param {*}  = no param
   */
  checkThrow() {
    if (this.keyboard.D && this.character.bottlesCollected > 0) {
      let bottle = new ThrowableObject(this.character.x + 75, this.character.y + 150, this.character.otherDirection);
      this.throwableObjects.push(bottle); 
      this.character.bottlesCollected -= 20;
      this.statusBarBottle.setPercentage(this.character.bottlesCollected);
      setTimeout(() => {this.throwableObjects.splice(0, 1);}, 2000);
    }
  }

  /**
   * This function induces bottles splashing on the enemy
   * @param {number} x = coordinate on x-axis for start of splash
   * @param {number} y = coordinate on y-axis for start of splash
   */
  splash(x, y) {
    let bottle = new SplashableObject(x + 80, y + 80);
    this.splashableObjects.push(bottle); 
    setTimeout(() => {
      this.splashableObjects.splice(0, 1);
    }, 1000);
  }

  /**
   * This function begins end of game logic
   * @param {number} x = indicator if won or lost
   */
  gameOver(x) {
    if (x == 1) {
      this.playerWon = true;
    } else {
      this.playerWon = false;
    }
    setTimeout(() => {
      isGameOver = true;
      intervallIDs.forEach(clearInterval);
    }, 1000);
    setTimeout(() => {
      this.resetGame();
    }, 2000);
  }

  /**
   * This function resets the game for new start
   * @param {*}  = no param
   */
  resetGame() {
    this.character = new Character();
    this.statusBarHealth = new StatusbarHealth();
    this.statusBarBottle = new StatusbarBottle();
    this.statusBarCoin = new StatusbarCoin();
    this.level = createLevel();
    this.camera_x = 0;
    isGameOver = false;
    this.enemySquashed = false;
    this.playerWon = false;
    pause = false;
  }
}
