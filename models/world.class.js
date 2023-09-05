class World {
  character = new Character(); //verweist auf Klasse Character
  level = level1; //damit kann auf alle Variablen aus level1 zugegriffen werden
  ctx;
  canvas; //brauchen wir für das clearen, wird unten zugewiesen
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas; //brauchen wir für das clearen
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  /**
   * This function connects the character via a variable called world to this world
   * @param {*}  = no param
   */
  setWorld() {
    this.character.world = this;
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

    // -----------Space for fixed objects ---------------
    this.ctx.translate(-this.camera_x, 0); //Back
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0); // Forward
    // -----------End of Space for fixed objects ---------------

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    //picture is moved for the negative value of the variable camera_x on x-axis (to the right) and 0 on y-axis

    //draw() will be executed continously according to
    let self = this; //needed since this doesn't work in the function below
    requestAnimationFrame(function () {
      self.draw();
    });
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
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit(this.character);
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 200);
  }
}
