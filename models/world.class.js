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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //canvas is cleared
    this.ctx.translate(this.camera_x, 0);
    //picture is moved for the value of the variable camera_x on x-axis (to the left) and 0 on y-axis
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds); //order is important!
    if (isGameOver) {
      this.ctx.translate(-this.camera_x, 0);
      if (this.playerWon) {
        this.addToMap(this.endScreenWon);
        showReStartButton();
      } else {
        this.addToMap(this.endScreenLost);
        showReStartButton();
      }
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
      //picture is moved for the negative value of the variable camera_x on x-axis (to the right) and 0 on y-axis

      //draw() will be executed continously according to
      let self = this; //needed since this doesn't work in the function below
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  /**
   * This function adds objects to draw from an array
   * @param {*}  objects = JSON with the objects to draw
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * This function adds one object to draw
   * @param {*}  mo = movable object to draw
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
   * @param {*}  mo = movable object to draw
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * This function reflips the image to draw on the y-axis
   * @param {*}  mo = movable object to draw
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
}

  checkPause() {
    if (this.keyboard.P) {
      pause = true;
    } else {
      pause = false;
    }
  }

  checkActionTime() {
    if (keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.D) {
      this.character.actionTime = new Date().getTime();
    }
  }

  checkCollision() {
    this.checkCollecting(
      this.level.coins,
      "coinsCollected",
      this.statusBarCoin
    );
    this.checkCollecting(
      this.level.bottles,
      "bottlesCollected",
      this.statusBarBottle
    );
    this.checkEnemySquashed();
    this.checkCollisionBottleEnemy();
    this.checkCollisionEnemy();
  }

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

  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.enemySquashed) {
        this.character.hit(this.character);
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkThrow() {
    //this.throwableObjects.splice(0,1); only after a certain intervall if needed
    if (this.keyboard.D && this.character.bottlesCollected > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 75,
        this.character.y + 150,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle); //this is needed for drawing
      this.character.bottlesCollected -= 20;
      this.statusBarBottle.setPercentage(this.character.bottlesCollected);
      setTimeout(() => {
        this.throwableObjects.splice(0, 1);
      }, 2000);
    }
  }

  splash(x, y) {
    let bottle = new SplashableObject(x + 80, y + 80);
    this.splashableObjects.push(bottle); //this is needed for drawing
    setTimeout(() => {
      this.splashableObjects.splice(0, 1);
    }, 1000);
  }

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

  resetGame() {
    //clear Level?
    this.character = new Character();
    //this.character.energy = 100;
    //this.character.x = 100;
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

  //  try {
  //faulty function
  //  } catch(e) {
  //console.warn('Error:', e);
  // console.log('Could not load ', this.variable)
  //  }
}
