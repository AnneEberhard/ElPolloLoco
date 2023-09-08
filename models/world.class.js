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
  isGameOver = false;
  endScreen = new Endscreen();
  pause = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
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
    if (this.isGameOver) {
      this.ctx.translate(-this.camera_x, 0); //Back
      this.addToMap(this.endScreen);
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
        //if (!this.pause) {
        self.draw();
      //}
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
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
    if(this instanceof Bottle ) {
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
   * This function checks for collision
   * @param {*}  mo = movable object to draw
   */
  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrow();
      this.checkPause();
    }, 200);
  }

  checkPause() {
    if (this.keyboard.P) {
      this.pause = true;
      console.log(this.pause);
    } else {
      this.pause = false;
    }
  }

  checkCollision() {
    this.checkCollisionEnemy();
    this.checkCollisionCoin();
    this.checkCollisionBottle();
    this.checkCollisionBottleEnemy();
  }

  checkCollisionEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log('Kollision mit Endboss');
        this.character.hit(this.character);
        this.statusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionCoin() {
    for (let i = 0; i < this.level.coins.length; i++) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.character.coinsCollected += 20;
        this.statusBarCoin.setPercentage(this.character.coinsCollected);
      }
    }
  }

  checkCollisionBottle() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(i, 1);
        this.character.bottlesCollected += 20;
        this.statusBarBottle.setPercentage(this.character.bottlesCollected);
      }
    }
  }

  checkCollisionBottleEnemy() {
    if (this.throwableObjects.length > 0) { 
      let thrownBottle = this.throwableObjects[0];
      for (let i = 0; i < this.level.enemies.length; i++) {
        let enemy = this.level.enemies[i];
        if (enemy.isColliding(thrownBottle)) {
          this.level.enemies.splice(i,1);//umändern in is hurt
          this.splash(thrownBottle.x,thrownBottle.y);
          this.throwableObjects.splice(0,1);
        } 
      }
    }
  }
  

  checkThrow() {
    //this.throwableObjects.splice(0,1); only after a certain intervall if needed
    if (this.keyboard.D && this.character.bottlesCollected > 0) {
      let bottle = new ThrowableObject (
        this.character.x + 75,
        this.character.y + 150
      );
      this.throwableObjects.push(bottle); //this is needed for drawing
      this.character.bottlesCollected -= 20;
      this.statusBarBottle.setPercentage(this.character.bottlesCollected);
    }
  }

  splash(x,y) {
      let bottle = new SplashableObject (x,y);
      this.splashableObjects.push(bottle); //this is needed for drawing
      console.log('splash');
      console.log(this.splashableObjects);
  }

  //gameOver() {
  // this.isGameOver = true;
  //}

//  try {
    //faulty function
//  } catch(e) {
 //console.warn('Error:', e);
// console.log('Could not load ', this.variable)
//  }
}
