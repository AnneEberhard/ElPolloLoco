class World {
  character = new Character(); //verweist auf Klasse Character
  level = level1; //damit kann auf alle Variablen aus level1 zugegriffen werden
  ctx;
  canvas; //brauchen wir für das clearen, wird unten zugewiesen
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas; //brauchen wir für das clearen
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //canvas ist wieder leer
    this.ctx.translate(this.camera_x,0); 
    //verschiebt komplettes Bild um den Wert der variable camera_x nach links und um 0 auf der y-Achse
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);//beachte die Reihenfolge!
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x,0); 
    //verschiebt komplettes Bild um den Wert der variable camera_x wieder nach rechts

    //Draw() wird immer wieder aufgerufen, aber CAVE: canvas muss vorher gelöscht werden, sonst doppelt
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
    this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); 
    this.ctx.translate(mo.width, 0); 
    this.ctx.scale(-1, 1); 
    mo.x = mo.x * -1; 
  }

  flipImageBack(mo) {
    this.ctx.restore(); 
    mo.x = mo.x * -1;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach( (enemy) => {
        if(this.character.isColliding(enemy) ) {
          this.character.hit(this.character); 
        }
      })
    }, 200);
  }



}
