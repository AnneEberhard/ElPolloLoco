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

  playAnimationOnLoop(images) {
    let i = this.currentImage % images.length;
    this.playAnimation(images, i);
  }

  playAnimationOnce(images) {
    let i = images.length - 1;
    this.playAnimation(images, i);
  }

  playAnimation(images, i) {
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
    if ((this instanceof ThrowableObject)) { //throwable objects don't end falling
      return true;
    } else {
      return this.y < 120;
    }
    
  }



  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
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
    //returns true if energy = 0
    return this.energy == 0;
  }

  isCollecting(mo) {
    return (
      this.x + this.width > mo.x+60 &&
      this.y + this.height-120 > mo.y+60 &&
      this.x < mo.x+60 + mo.width-120 &&
      this.y < mo.y+60 + mo.height-120
    );
    //(this.x+60, this.y+60, this.width-120, this.height-120);
  }
}
