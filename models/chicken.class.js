class Chicken extends MovableObject {
  //Super class for all chicken medium and small
  height = 80;
  width = 80;
  world;
  energy = 5;

  /**
   * This function starts moving left animation when neither dead and game is running
   * @param {*}  = no param
   */
  chickenMoving() {
    if (!this.isDead() && this.gameIsRunning()) {
      this.moveLeft();
    }
  }

  /**
   * This function assigns either walking or dying animation
   * @param {*}  = no param
   */
  chickenImages() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.chicken_sound.pause();
    } else {
      if (this.gameIsRunning()) {
        this.playAnimation(this.IMAGES_WALKING);
        this.playChicken();
      }
    }
  }

  /**
   * This function plays sounds when close to character and game is running
   * @param {*}  = no param
   */
  playChicken() {
    if (this.gameIsRunning()) {
      let distanceToCharacter = this.world.character.x - this.x;
      if (
        distanceToCharacter < 200 &&
        distanceToCharacter > -780 &&
        soundIsOn
      ) {
        this.chicken_sound.play();
      }
    }
  }
}
