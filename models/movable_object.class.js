class MovableObject extends DrawableObject {
  //super class for all objects that move

  speed = 0.5;
  otherDirection = false;
  speedY = 0;
  accelaration = 2.5;
  energy = 5;
  lastHit = 0;

  /**
   * This function induces moving right of any movable object
   * @param {*}  = no param
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * This function induces moving left of any movable object
   * @param {*}  = no param
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * This function plays images on animation for any movable object on loop if not on pause
   * @param {*}  = no param
   */
  playAnimation(images) {
    if (!pause) {
      let i = this.currentImage % images.length;
      this.getAnimation(images, i);
    }
  }

  /**
   * This function plays images on animation for any movable object only once
   * @param {*}  = no param
   */
  playAnimationOnce(images) {
    let i = images.length - 1;
    this.getAnimation(images, i);
  }

  /**
   * This function fetches the images for any animation
   * @param {*}  = no param
   */
  getAnimation(images, i) {
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * This function plays the sound for any movable object
   * @param {*}  = no param
   */
  playSound(sound) {
    if (soundIsOn) {
      sound.play();
    } else {
      sound.pause();
    }
  }

  /**
   * This function lets any movable object fall after jumping or throwing (being above ground)
   * @param {*}  = no param
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
        console.log(this.speedY);
      }
    }, 1000 / 25);
  }

  /**
   * This function returns needed info for a movable object above its respective ground
   * @param {*}  = no param
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  /**
   * This function checks whether something is colliding with a movable object
   * @param {object} mo = any movable object
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
      mo.energy > 0
    );
  }

  /**
   * This function deduces energy from a movable object after being hit and notes the time of the hit
   * @param {object} mo = any movable object
   */
  hit(mo) {
    if (!pause) {
      mo.energy -= 5;
      if (mo.energy < 0) {
        mo.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  /**
   * This function returns true when the time passed after being hit and now is less than 1 second
   * @param {*}  = no param
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * This function sets energy of any movable object to 0
   * @param {*}  = no param
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function checks if the game is neither over nor on pause and if the world is loaded
   * @param {*}  = no param
   */
  gameIsRunning() {
    return isGameOver == false && pause == false && this.world;
  }
}
