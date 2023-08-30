class World {
  character = new Character(); //verweist auf Klasse Character
  enemies = [
    new Chicken(), // verweist auf Klasse Chicken
    new Chicken(),
    new Chicken(),
  ];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObjects("img/5_background/layers/air.png", 0),
    new BackgroundObjects("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObjects("img/5_background/layers/1_first_layer/1.png", 0),
  ];
  ctx;
  canvas; //brauchen wir für das clearen, wird unten zugewiesen
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas; //brauchen wir für das clearen
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //canvas ist wieder leer
    this.addObjectsToMap(this.backgroundObjects);

    this.addToMap(this.character);

    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.clouds);

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
      this.ctx.save(); // speichern den context für später
      this.ctx.translate(mo.width,0); //Breite des Bildes wird von der x-Position abgezogen
      this.ctx.scale(-1, 1); //Bild wird an der y-Achse gedreht
      mo.x = mo.x * -1; // auch x-Koordinate wird umgedreht
    }
 
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); //Bild wird gemalt

    if (mo.otherDirection) {
      this.ctx.restore(); //einstellungen werden zurückgesetzt
      mo.x = mo.x * -1;
    }
  }
}
