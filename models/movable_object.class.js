class MovableObject {
  //Superklasse für alle bewegten Objekte; n Klassen braucht man weder let noch function
  x;
  y;
  img;
  height;
  width;
  imageCache = {};
  currentImage = 0;
  speed = 0.5;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 100;

  loadImage(path) {
    this.img = new Image(); //JS für: this.img = document.getElementById('image') <image id='image'> kommt erst später in HTML
    this.img.src = path;
  }

  /**
   * Diese Funktion lädt die Pfade für verschiedene Bilder in ein JSON namens ImageCache
   * @param {*} pathArray = array mit den verschiedenen Pfaden
   */
  loadImages(pathArray) {
    pathArray.forEach((path) => {
      let img = new Image(); //diese Variable ist nur in dieser Funktion gültig und kreiiert ein Bild
      img.src = path; //hier wird dem neuen Bild der Pfad zugewiesen
      this.imageCache[path] = img; //diese Variable ist überall im Object gültig und fügt dem JSON das neue Bild zu
    });
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
    this.jumping_sound.play();
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // modulo (%) gibt den Rest raus, also z.B. 7 % 6 = 1
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 120;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); //Bild wird gemalt
  }

  drawFrame(ctx) {
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
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit(mo) {
      mo.energy -= 5;   
    if (mo.energy < 0) {
      mo.energy = 0;
    }
  }

  isDead() { //gibt bei energy = 0 true zurück
    return this.energy == 0;
  }

}
