class MovableObject extends DrawableObject {
  //super class for all objects that move

  speed = 0.5;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 5;
  lastHit = 0;

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    this.getAnimation(images, i);
  } 

  playAnimationOnce(images) {
    let i = images.length - 1;
    this.getAnimation(images, i);
  }

  getAnimation(images, i) {
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playSound(sound) {
    if (soundIsOn) {
      console.log('sound');
      sound.play(sound);
    }
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
    if (this instanceof ThrowableObject) {
      //throwable objects don't end falling
      return true;
    } else {
      return this.y < 120;
    }
  }

  //character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
      mo.energy > 0
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
    let timepassed = new Date().getTime() - this.lastHit; //Diff in milliseconds
    timepassed = timepassed / 1000; //Diff in seconds
    return timepassed < 1; //if hit during the last 5s, return is true
  }

  isDead() {
    //returns true if energy = 0
    return this.energy == 0;
  }

  gameIsRunning() {
    return (isGameOver == false && pause == false && this.world);
  }


}
