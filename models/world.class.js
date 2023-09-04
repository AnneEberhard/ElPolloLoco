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
      this.ctx.save(); // speichern den context für später
      this.ctx.translate(mo.width, 0); //Breite des Bildes wird von der x-Position abgezogen
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
