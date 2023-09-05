class MovableObject extends DrawableObject {
  //super class for all objects that move   
  speed = 0.5;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 100;
  lastHit = 0;

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
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;//Diff in milliseconds
    timepassed = timepassed / 1000; //Diff in seconds
    return timepassed < 1; //if hit during the last 5s, return is true
  }

  isDead() {
    //gibt bei energy = 0 true zurück
    return this.energy == 0;
  }
}
